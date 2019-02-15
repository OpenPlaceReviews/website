import json

from allauth.account.signals import user_logged_in, user_signed_up, \
    user_logged_out
from django.conf import settings
from django.contrib import messages
from django.dispatch import receiver

from opendb.utils import opendb_signup, opendb_login
from .models import User


@receiver(user_logged_in, sender=User)
def send_login(request, user, **kwargs):
    login_data = {
        'nickname': user.username,
        'pwd': request.POST.get('password'),
        'oauth_provider': user.get_oauth_provider,
        'oauth_uid': user.get_oauth_uid,
    }
    response = opendb_login(**login_data)
    if response.status_code == 200:
        pubkey = json.loads(response.content).get('pubkey')
        request.session['opendb_pubkey'] = pubkey[settings.SLICE_KEY:]
        user.pubkey = pubkey[:settings.SLICE_KEY]
        user.save()
        messages.success(request, 'Successfully signed in OpenDB')
    else:
        error_msg = 'Error signed in OpenDB: {}'.format(json.loads(response.content).get('message'))
        messages.error(request, error_msg)
    return


@receiver(user_logged_out, sender=User)
def send_logout(request, user, **kwargs):
    request.session['opendb_pubkey'] = ''
    user.pubkey = ''
    user.save()


@receiver(user_signed_up, sender=User)
def send_signup(request, user, **kwargs):
    signup_data = {
        'nickname': user.username,
        'pwd': request.POST.get('password1'),
        'oauth_provider': user.get_oauth_provider,
        'oauth_uid': user.get_oauth_uid,
        'details': {
            'languages': request.POST.getlist('languages'),
            'country': request.POST.get('country'),
        }
    }
    response = opendb_signup(**signup_data)
    if response.status_code == 200:
        messages.success(request, 'Successfully signed in OpenDB')
    else:
        error_msg = 'Error signed in OpenDB: {}'.format(json.loads(response.content).get('message'))
        messages.error(request, error_msg)
    return
