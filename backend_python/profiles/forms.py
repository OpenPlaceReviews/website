from django import forms
from .models import LANGUAGES, COUNTRIES
from allauth.account.forms import SignupForm
from allauth.socialaccount.forms import SignupForm as SocialSignupForm


class CustomSignupForm(SignupForm):
    terms_and_services = forms.BooleanField(required=True, initial=False)
    contribution_terms = forms.BooleanField(required=True, initial=False)
    languages = forms.ChoiceField(required=False, choices=LANGUAGES)
    country = forms.ChoiceField(required=False, choices=COUNTRIES)


class CustomSocialSignupForm(SocialSignupForm):
    terms_and_services = forms.BooleanField(required=True, initial=False)
    contribution_terms = forms.BooleanField(required=True, initial=False)
    languages = forms.ChoiceField(required=False, choices=LANGUAGES)
    country = forms.ChoiceField(required=False, choices=COUNTRIES)
