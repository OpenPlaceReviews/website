from django.conf import settings
import json
import logging
import requests
from django.core.cache import cache


logger = logging.getLogger(__name__)


def login_server():
    api_path = '/api/auth/admin-login'
    api_url = '{}{}'.format(settings.SERVER_API_ADDRESS, api_path)
    data = {
        'name': settings.OPENDB_SIGN_LOGIN,
        'pwd': settings.OPENDB_SIGN_PK,
    }
    response = requests.post(api_url, data=data)
    cache.set('JSESSIONID', response.cookies.get('JSESSIONID'))
    logger.info('get JSESSIONID from OPENDB')
    return response.cookies.get('JSESSIONID')


def get_jsessionid():
    if cache.get('JSESSIONID'):
        return cache.get('JSESSIONID')
    else:
        return login_server()


def opendb_signup(nickname, pwd=None, oauth_provider=None,
                  oauth_uid=None, details={}):
    api_path = '/api/auth/signup'
    api_url = '{}{}'.format(settings.SERVER_API_ADDRESS, api_path)
    data = {
        'name': nickname,
        'pwd': pwd,
        'oauthProvider': oauth_provider,
        'oauthId': oauth_uid,
        'algo': 'EC',
        'privateKey': settings.OPENDB_SIGN_PK,
        'publicKey': None,
        'userDetails': json.dumps(details)
    }
    cookies = {'JSESSIONID': get_jsessionid()}
    response = requests.post(api_url, data=data, cookies=cookies)
    if response.status_code == 401:
        login_server()
        cookies = {'JSESSIONID': get_jsessionid()}
        response = requests.post(api_url, data=data, cookies=cookies)
    if response.status_code == 200:
        logger.info('Signed user {}'.format(json.loads(response.content.decode('utf-8')).get('name')))
    else:
        logger.error('Error signed on OpenDB: {}'.format(response.content.decode('utf-8')))
    return response


def opendb_login(nickname, pwd=None, oauth_provider=None,
                  oauth_uid=None):
    api_path = '/api/auth/login'
    api_url = '{}{}'.format(settings.SERVER_API_ADDRESS, api_path)
    data = {
        "name": 'openplacereviews:{}'.format(nickname),
        "pwd": pwd,
        "signupPrivateKey": settings.OPENDB_SIGN_PK,
        "oauthProvider": oauth_provider,
        "oauthId": oauth_uid,
        "loginPubKey": None,
        "loginAlgo": "EC",
    }
    cookies = {'JSESSIONID': get_jsessionid()}
    response = requests.post(api_url, data=data, cookies=cookies)
    if response.status_code == 401:
        login_server()
        cookies = {'JSESSIONID': get_jsessionid()}
        response = requests.post(api_url, data=data, cookies=cookies)
    if response.status_code == 200:
        logger.info('Signed user {}'.format(json.loads(response.content.decode('utf-8')).get('name')))
    else:
        logger.error('Error signed on OpenDB: {}'.format(response.content.decode('utf-8')))
    return response
