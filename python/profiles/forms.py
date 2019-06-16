from django import forms
from .models import LANGUAGES, COUNTRIES, User
from allauth.account.forms import SignupForm, LoginForm
from allauth.socialaccount.forms import SignupForm as SocialSignupForm
from opendb.utils import opendb_signup, opendb_login, set_login_session, get_object_by_name
import json


class CustomSignupForm(SignupForm):
    terms_of_service = forms.BooleanField(required=True, initial=False)
    contribution_terms = forms.BooleanField(required=True, initial=False)
    languages = forms.MultipleChoiceField(required=False, choices=LANGUAGES)
    country = forms.ChoiceField(required=False, choices=COUNTRIES)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.request = kwargs.pop('request', None)

    def clean_username(self, second_clean=False):
        data = self.cleaned_data.get('username')
        if User.objects.filter(username=data).exists():
            opendb_user = get_object_by_name(data)
            if opendb_user and not 'errors' in opendb_user:
                super().clean_username()
            elif not opendb_user:
                User.objects.filter(username=data, is_superuser=False).delete()
            return data
        super().clean_username()
        return data

    def clean_email(self):
        username = self.cleaned_data.get('username')
        data = self.cleaned_data.get('data')
        if not User.objects.filter(username=username, email=data).exists():
            super().clean_email()
        return data

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
        if self.is_valid():
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
        self.provatekey = ''

    def clean(self):
        super().clean()
        if self.is_valid():
            user_opendb = get_object_by_name(self.cleaned_data.get('username'))
            if not user_opendb:
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
                response = opendb_signup(**signup_data)
                if response.status_code != 200:
                    error_msg = 'Error signed in OpenDB: {}'.format(json.loads(response.content.decode('utf-8')).get('message'))
                    raise forms.ValidationError(error_msg)
            elif user_opendb and not 'errors' in user_opendb:
                login_data = {
                    'nickname': self.cleaned_data.get('username'),
                    'pwd': '',
                    'oauth_provider': self.sociallogin.account.provider,
                    'oauth_uid': self.sociallogin.account.uid,
                }
                login_response = opendb_login(**login_data)
                if login_response.status_code != 200:
                    error_msg = 'Error signed in OpenDB: {}'.format(
                        json.loads(login_response.content.decode('utf-8')).get('message'))
                    raise forms.ValidationError(error_msg)
                else:
                    self.provatekey = login_response.json().get('eval').get('privatekey')
        return self.cleaned_data

    def save(self, request):
        user = super(CustomSocialSignupForm, self).save(request)
        user.privatekey = self.provatekey
        user.save()
        return user

class CustomLoginForm(LoginForm):
    def clean_login(self):
        username = self.cleaned_data.get('login')
        opendb_user = get_object_by_name(username)
        if opendb_user and not 'errors' in opendb_user:
            return username
        super().clean_login()
        return username

    def clean(self):
        username = self.cleaned_data.get('login')
        pwd = self.cleaned_data.get('password')
        site_user = User.objects.filter(username=username)
        opendb_user = get_object_by_name(username)
        if self.is_valid():
            if site_user.exists():
                user = site_user[0]
                if not user.has_usable_password():
                    error_msg = 'For authorization in this account, use OAuth provider.'
                    raise forms.ValidationError(error_msg)
                elif not opendb_user:
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
                    site_user.update(privatekey='')
                    opendb_signup(**signup_data)
            else:
                if opendb_user and not 'errors' in opendb_user:
                    login_data = {
                        'nickname': username,
                        'pwd': pwd,
                        'oauth_provider': '',
                        'oauth_uid': '',
                    }
                    response = opendb_login(**login_data)
                    if response.status_code == 200:
                        user = User.objects.create_user(username, pwd)
                        pubkey = json.loads(response.content.decode('utf-8')).get('create')[0].get('pubkey')
                        privatekey = json.loads(response.content.decode('utf-8')).get('eval').get('privatekey')
                        set_login_session(user, pubkey, privatekey, self.request)
        super(CustomLoginForm, self).clean()
        return self.cleaned_data
