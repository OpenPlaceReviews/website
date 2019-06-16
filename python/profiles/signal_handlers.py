import json

from allauth.account.signals import user_logged_in, user_logged_out, user_signed_up
from django.conf import settings
from django.contrib import messages
from django.dispatch import receiver
from django.contrib.auth import logout

from opendb.utils import opendb_login, set_login_session, opendb_signup,\
    get_object_by_name
from .models import User


@receiver(user_logged_in, sender=User)
def send_login(request, user, **kwargs):
    opendb_user = get_object_by_name(user.username)
    if not opendb_user and user.get_oauth_uid and user.get_oauth_provider:
        signup_data = {
            'nickname': user.username,
            'pwd': '',
            'oauth_provider': user.get_oauth_provider,
            'oauth_uid': user.get_oauth_uid
        }
        user.privatekey = None
        opendb_signup(**signup_data)
    if not user.privatekey:
        login_data = {
            'nickname': user.username,
            'pwd': request.POST.get('password') or request.POST.get('password1'),
            'oauth_provider': user.get_oauth_provider,
            'oauth_uid': user.get_oauth_uid,
        }
        response = opendb_login(**login_data)
        if response.status_code == 200:
            pubkey = json.loads(response.content.decode('utf-8')).get('create')[0].get('pubkey')
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
