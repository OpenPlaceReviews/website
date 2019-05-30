from django import forms
from .models import LANGUAGES, COUNTRIES, User
from allauth.account.forms import SignupForm, LoginForm
from allauth.socialaccount.forms import SignupForm as SocialSignupForm
from opendb.utils import opendb_signup, opendb_login, set_login_session
import json


class CustomSignupForm(SignupForm):
    terms_of_service = forms.BooleanField(required=True, initial=False)
    contribution_terms = forms.BooleanField(required=True, initial=False)
    languages = forms.MultipleChoiceField(required=False, choices=LANGUAGES)
    country = forms.ChoiceField(required=False, choices=COUNTRIES)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.request = kwargs.pop('request', None)

    def clean(self):
        super().clean()
        signup_data = {
            'nickname': self.cleaned_data.get('username'),
            'pwd': self.cleaned_data.get('password1'),
            'oauth_provider': '',
            'oauth_uid': '',
            'details': {
                'languages': self.cleaned_data.get('languages'),
                'country': self.cleaned_data.get('country'),
            }
        }
        response = opendb_signup(**signup_data)
        if response.status_code != 200:
            error_msg = 'Error signed in OpenDB: {}'.format(json.loads(response.content.decode('utf-8')).get('message'))
            raise forms.ValidationError(error_msg)
        return self.cleaned_data


class CustomSocialSignupForm(SocialSignupForm):
    terms_of_service = forms.BooleanField(required=True, initial=False)
    contribution_terms = forms.BooleanField(required=True, initial=False)
    languages = forms.MultipleChoiceField(required=False, choices=LANGUAGES)
    country = forms.ChoiceField(required=False, choices=COUNTRIES)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.request = kwargs.pop('request', None)

    def clean(self):
        super().clean()
        signup_data = {
            'nickname': self.cleaned_data.get('username'),
            'pwd': '',
            'oauth_provider': self.sociallogin.account.provider,
            'oauth_uid': self.sociallogin.account.uid,
            'details': {
                'languages': self.cleaned_data.get('languages'),
                'country': self.cleaned_data.get('country'),
            }
        }
        # TODO: create user for SiteDB if there is in OpenDB
        response = opendb_signup(**signup_data)
        if response.status_code != 200:
            error_msg = 'Error signed in OpenDB---: {}'.format(json.loads(response.content.decode('utf-8')).get('message'))
            raise forms.ValidationError(error_msg)

        return self.cleaned_data


class CustomLoginForm(LoginForm):

    def clean(self):
        username = self.cleaned_data.get('login')
        pwd = self.cleaned_data.get('password')
        try:
            user = User.objects.get(username=username)
            if not user.has_usable_password():
                error_msg = 'For authorization in this account, use OAuth provider.'
                raise forms.ValidationError(error_msg)
            else:
                super(CustomLoginForm, self).clean()
                if not user.privatekey:
                    login_data = {
                        'nickname': username,
                        'pwd': pwd,
                        'oauth_provider': '',
                        'oauth_uid': '',
                    }
                    response = opendb_login(**login_data)
                    if response.status_code == 200:
                        user = User.objects.create_user(username, pwd)
                        pubkey = json.loads(response.content.decode('utf-8')).get('new')[0].get('pubkey')
                        privatekey = json.loads(response.content.decode('utf-8')).get('eval').get('privatekey')
                        set_login_session(user, pubkey, privatekey, self.request)
                    else:
                        signup_data = {
                            'nickname': username,
                            'pwd': pwd,
                            'oauth_provider': '',
                            'oauth_uid': '',
                            'details': {
                                'languages': '',
                                'country': '',
                            }
                        }
                        opendb_signup(**signup_data)

        except User.DoesNotExist:
            if self.request:
                login_data = {
                    'nickname': username,
                    'pwd': pwd,
                    'oauth_provider': '',
                    'oauth_uid': '',
                }
                response = opendb_login(**login_data)
                if response.status_code == 200:
                    user = User.objects.create_user(username, pwd)
                    pubkey = json.loads(response.content.decode('utf-8')).get('new')[0].get('pubkey')
                    privatekey = json.loads(response.content.decode('utf-8')).get('eval').get('privatekey')
                    set_login_session(user, pubkey, privatekey, self.request)
            super(CustomLoginForm, self).clean()
        return self.cleaned_data
