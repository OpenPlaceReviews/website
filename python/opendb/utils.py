from django.conf import settings
import json
import logging
import requests


logger = logging.getLogger(__name__)


def opendb_signup(nickname, pwd=None, oauth_provider=None,
                  oauth_uid=None, details={}):
    api_path = '/op/signup'
    api_url = '{}{}'.format(settings.SERVER_API_ADDRESS, api_path)
    data = {
        'name': nickname,
        'pwd': pwd,
        'oauthProvider': oauth_provider,
        'oauthId': oauth_uid,
        'algo': 'EC',
        'privateKey': None,
        'publicKey': None,
        'userDetails': json.dumps(details)
    }
    response = requests.post(api_url, data=data)
    if response.status_code == 200:
        logger.info('Signed user {}'.format(json.loads(response.content).get('name')))
    else:
        logger.error('Error signed on OpenDB: {}'.format(response.content))
    return response


def opendb_login(nickname, pwd=None, oauth_provider=None,
                  oauth_uid=None):
    api_path = '/op/login'
    api_url = '{}{}'.format(settings.SERVER_API_ADDRESS, api_path)
    data = {
        "name": '{}:{}'.format(nickname, 'web_backend'),
        "pwd": pwd,
        "signupPrivateKey": None,
        "oauthProvider":oauth_provider,
        "oauthId":oauth_uid,
        "loginPubKey": None,
        "loginAlgo": "EC",
    }
    response = requests.post(api_url, data=data)
    if response.status_code == 200:
        logger.info('Signed user {}'.format(json.loads(response.content.decode('utf-8')).get('name')))
    else:
        logger.error('Error signed on OpenDB: {}'.format(response.content))
    return response
