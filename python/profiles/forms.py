from django import forms
from .models import LANGUAGES, COUNTRIES
from allauth.account.forms import SignupForm
from allauth.socialaccount.forms import SignupForm as SocialSignupForm
from opendb.utils import opendb_signup
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
        response = opendb_signup(**signup_data)
        if response.status_code != 200:
            error_msg = 'Error signed in OpenDB: {}'.format(json.loads(response.content.decode('utf-8')).get('message'))
            raise forms.ValidationError(error_msg)
        return self.cleaned_data
