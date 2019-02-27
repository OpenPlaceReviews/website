from django import forms
from .models import LANGUAGES, COUNTRIES
from allauth.account.forms import SignupForm
from allauth.socialaccount.forms import SignupForm as SocialSignupForm


class CustomSignupForm(SignupForm):
    terms_and_services = forms.BooleanField(required=True, initial=False)
    contribution_terms = forms.BooleanField(required=True, initial=False)
    languages = forms.ChoiceField(required=False, choices=LANGUAGES)
    country = forms.ChoiceField(required=False, choices=COUNTRIES)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.request = kwargs.pop('request', None)

    def clean(self):
        super().clean()
        return self.cleaned_data

class CustomSocialSignupForm(SocialSignupForm):
    terms_and_services = forms.BooleanField(required=True, initial=False)
    contribution_terms = forms.BooleanField(required=True, initial=False)
    languages = forms.MultipleChoiceField(required=False, choices=LANGUAGES)
    country = forms.ChoiceField(required=False, choices=COUNTRIES)

    def signup(self, request, user):
        user.screen_name = self.cleaned_data.get('screen_name')
        user.save()
        email = self.cleaned_data.get('alternative_email')
        email_alternative = user.emailaddress_set.first()
        if email:
            if email_alternative:
                email_alternative.email = email
                email_alternative.save()
            else:
                user.emailaddress_set.create(email=email)
