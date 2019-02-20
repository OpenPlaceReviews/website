# -*- coding: utf-8 -*-
import requests
from django.conf import settings
from allauth.socialaccount.providers.oauth.client import OAuth
from allauth.socialaccount.providers.oauth.views import (
    OAuthAdapter,
    OAuthCallbackView,
    OAuthLoginView,
)
from .provider import OSMProvider
from django.utils.http import urlencode, urlquote
import json
from xml.dom import minidom

USER_FIELDS = ['username', 'email']

class OSMAPI(OAuth):
   users_url = 'https://api.openstreetmap.org/api/0.6/user/details'

   def get_user_info(self):
       response = self.query(self.users_url)
       try:
           dom = minidom.parseString(response)
       except ValueError:
           return None
       user = dom.getElementsByTagName('user')[0]
       try:
           avatar = dom.getElementsByTagName('img')[0].getAttribute('href')
       except IndexError:
           avatar = None
       return {
           'id': user.getAttribute('id'),
           'username': user.getAttribute('display_name'),
           'account_created': user.getAttribute('account_created'),
           'avatar': avatar
       }



class OSMOAuthAdapter(OAuthAdapter):
    provider_id = OSMProvider.id
    request_token_url = 'https://www.openstreetmap.org/oauth/request_token'
    access_token_url = 'https://www.openstreetmap.org/oauth/access_token'
    authorize_url = 'https://www.openstreetmap.org/oauth/authorize'

    def complete_login(self, request, app, token, response, **kwargs):
        client = OSMAPI(request, app.client_id, app.secret,
                              self.request_token_url)
        extra_data = client.get_user_info()
        result = self.get_provider().sociallogin_from_response(request,
                                                               extra_data)

        return result

oauth_login = OAuthLoginView.adapter_view(OSMOAuthAdapter)
oauth_callback = OAuthCallbackView.adapter_view(OSMOAuthAdapter)
