from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager
from django.utils.translation import gettext_lazy as _
from django.utils.functional import cached_property

import json

countries_json = open('profiles/countries.json').read()
countries_data = json.loads(countries_json)
COUNTRIES = [[item.get('alpha-3'), item.get('name')] for item in countries_data]

languages_json = open('profiles/iso_639-2_languages.json').read()
languages_data = json.loads(languages_json)
LANGUAGES = [[k, v.get('en')[0]] for k, v in languages_data.items()]

class User(AbstractUser):
    username = models.CharField(_('username'), max_length=255, unique=True)
    email = models.EmailField(_('email address'), blank=True, null=True)
    pubkey = models.CharField(max_length=255, blank=True, default='')

    objects = UserManager()

    REQUIRED_FIELDS = []
    EMAIL_FIELD = 'email'

    @cached_property
    def get_oauth_provider(self):
        return self.socialaccount_set.all()[0].provider if self.socialaccount_set.exists() else None

    @cached_property
    def get_oauth_uid(self):
        return self.socialaccount_set.all()[0].uid if self.socialaccount_set.exists() else None