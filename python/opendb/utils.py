from django.conf import settings
import json
import logging
import requests
from django.core.cache import cache
from django.contrib import messages


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
        "name": '{}:openplacereviews'.format(nickname),
        "pwd": pwd or '',
        "edit": 'true',
        "signupPrivateKey": '',
        "oauthProvider": oauth_provider or '',
        "oauthId": oauth_uid or '',
        "loginPubKey": '',
        "loginAlgo": "EC",
        "userDetails": ''
    }
    cookies = {'JSESSIONID': get_jsessionid()}
    response = requests.post(api_url, data=data, cookies=cookies)
    if response.status_code == 401:
        login_server()
        cookies = {'JSESSIONID': get_jsessionid()}
        response = requests.post(api_url, data=data, cookies=cookies)
    if response.status_code == 200:
        logger.info('Login user {}'.format(json.loads(response.content.decode('utf-8')).get('name')))
    else:
        logger.error('Error login on OpenDB: {}'.format(response.content.decode('utf-8')))
    return response


def set_login_session(user, pubkey, privatekey, request):
    # request.session['opendb_pubkey'] = pubkey[settings.SLICE_KEY:]
    request.session['opendb_privatekey'] = privatekey[settings.SLICE_KEY:]
    user.pubkey = pubkey
    user.privatekey = privatekey
    user.save()
    messages.success(request, 'Successfully login in OpenDB')


def get_opendb_status():
    queue_path = '/api/queue'
    blocks_path = '/api/blocks'
    objects_path = '/api/objects?type=sys.operation'
    url = '{}{}'.format(settings.SERVER_API_ADDRESS, queue_path)
    queue_data = requests.get(url)
    if queue_data.status_code == 200:
        queue_count = len(queue_data.json().get('ops', []))
    else:
        queue_count = 0
    url = '{}{}'.format(settings.SERVER_API_ADDRESS, blocks_path)
    blocks_data = requests.get(url)
    if blocks_data.status_code == 200:
        blocks_data = blocks_data.json()
    else:
        blocks_data = {}
    blocks_count = len(blocks_data)
    url = '{}{}'.format(settings.SERVER_API_ADDRESS, objects_path)
    objects_data = requests.get(url)
    if objects_data.status_code == 200:
        objects_data = objects_data.json()
    else:
        objects_data = {}
    objects_count = len(objects_data.get('objects', []))
    statuses = {
        'queue': queue_count,
        'blocks': blocks_count,
        'objects': objects_count
    }
    return statuses

def get_object_by_name(name):
    url = '/api/object-by-id?type=sys.signup&key={}'.format(name)
    url = '{}{}'.format(settings.SERVER_API_ADDRESS, url)
    try:
        objects_data = requests.get(url)
        if objects_data.status_code == 200:
            objects_data = objects_data.json()
        else:
            objects_data = {
                'errors': True,
                'messages': objects_data.content
            }
        return objects_data
    except requests.ConnectionError:
        objects_data = {
            'errors': True,
            'messages': 'Connection Error'
        }
        return objects_data