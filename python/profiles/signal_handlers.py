import json

from allauth.account.signals import user_logged_in, user_signed_up, \
    user_logged_out
from django.conf import settings
from django.contrib import messages
from django.dispatch import receiver
from django.contrib.auth import logout

from opendb.utils import opendb_signup, opendb_login, set_login_session
from .models import User


@receiver(user_logged_in, sender=User)
def send_login(request, user, **kwargs):

    if not user.privatekey:
        login_data = {
            'nickname': user.username,
            'pwd': request.POST.get('password'),
            'oauth_provider': user.get_oauth_provider,
            'oauth_uid': user.get_oauth_uid,
        }
        response = opendb_login(**login_data)
        if response.status_code == 200:
            pubkey = json.loads(response.content.decode('utf-8')).get('new')[0].get('pubkey')
            privatekey = json.loads(response.content.decode('utf-8')).get('eval').get('privatekey')
            set_login_session(user, pubkey, privatekey, request)
        else:
            logout(request)
            error_msg = 'Error login in OpenDB: {}'.format(json.loads(response.content.decode('utf-8')).get('message'))
            messages.error(request, error_msg)
    else:
        request.session['opendb_privatekey'] = request.user.privatekey[settings.SLICE_KEY:]


@receiver(user_logged_out, sender=User)
def send_logout(request, user, **kwargs):
    request.session['opendb_pubkey'] = ''
    user.pubkey = ''
    user.save()


# @receiver(user_signed_up, sender=User)
# def send_signup(request, user, **kwargs):
#     signup_data = {
#         'nickname': user.username,
#         'pwd': request.POST.get('password1'),
#         'oauth_provider': user.get_oauth_provider,
#         'oauth_uid': user.get_oauth_uid,
#         'details': {
#             'languages': request.POST.getlist('languages'),
#             'country': request.POST.get('country'),
#         }
#     }
#     response = opendb_signup(**signup_data)
#     if response.status_code == 200:
#         messages.success(request, 'Successfully signed in OpenDB')
#     else:
#         error_msg = 'Error signed in OpenDB: {}'.format(json.loads(response.content.decode('utf-8')).get('message'))
#         messages.error(request, error_msg)
#     return
