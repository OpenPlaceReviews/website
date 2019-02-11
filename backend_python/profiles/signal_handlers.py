from django.dispatch import receiver
from django.db.models.signals import post_save
from allauth.account.signals import user_logged_in, user_signed_up, \
    user_logged_out
from .models import User
import requests
from django.conf import settings
import json
from django.contrib import messages


@receiver(post_save, sender=User)
def send_post_save(sender, instance, **kwargs):
    print('send POST_SAVE REQUEST API')

@receiver(user_logged_in, sender=User)
def send_login(request, user, **kwargs):
    print('send LOGIN REQUEST API')

@receiver(user_logged_out, sender=User)
def send_logout(request, user, **kwargs):
    print('send LOGOUT REQUEST API')

@receiver(user_signed_up, sender=User)
def send_singup(request, user, **kwargs):
    api_path = '/op/signup'
    api_url = '{}{}'.format(settings.SERVER_API_ADDRESS, api_path)
    data = {
        'name': user.username,
        'pwd': request.POST.get('password1'),
        'oauthProvider': None,
        'oauthId': None,
        'privateKey': None,
        'serverName': None,
        'email': user.email,
        'details': json.dumps({
            'languages': request.POST.getlist('languages'),
            'country': request.POST.get('country'),
        })
    }
    response = requests.post(api_url, data=data)
    if response.status_code == 200:
        messages.success(request, 'Successfully signed in OpenDB')
    else:
        messages.error(request, 'Error signed in OpenDB: {}'.format(json.loads(response.content).get('message')))
    return