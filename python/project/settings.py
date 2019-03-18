import os
from django.utils.translation import gettext_lazy as _

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'ak!z1@&(x=cj9imev^#fvj+dx3p^crfcs-o+$!m^6-uqp8-r#k'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = []


# Application definition
SITE_ID = 1

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'main',
    'profiles',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'osm',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.facebook',
    'opendb',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'profiles.context_processors.all_languages_vue',
                'profiles.context_processors.all_countries_vue',
                'django_settings_export.settings_export',
            ],
        },
    },
]

AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
)

WSGI_APPLICATION = 'project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'profiles.validators.MinimumLengthEntropyValidator',
        'OPTIONS': {
            'min_length': 10,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LOGIN_REDIRECT_URL = 'frontpage'
LOGOUT_REDIRECT_URL = 'frontpage'

AUTH_USER_MODEL = 'profiles.User'

ACCOUNT_EMAIL_REQUIRED = True

SOCIALACCOUNT_EMAIL_REQUIRED = True

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    },
    'facebook': {
        'METHOD': 'oauth2',
        'SCOPE': ['email', 'public_profile'],
        'AUTH_PARAMS': {'auth_type': 'reauthenticate'},
        'INIT_PARAMS': {'cookie': True},
        'FIELDS': [
            'id',
            'email',
            'name',
            'first_name',
            'last_name',
            'verified',
            'locale',
            'timezone',
            'link',
            'gender',
            'updated_time',
        ],
        'EXCHANGE_TOKEN': True,
        'LOCALE_FUNC': 'path.to.callable',
        'VERIFIED_EMAIL': False,
        'VERSION': 'v2.12',
    },
}

ACCOUNT_FORMS = {'signup': 'profiles.forms.CustomSignupForm'}
SOCIALACCOUNT_FORMS = {'signup': 'profiles.forms.CustomSocialSignupForm'}
ACCOUNT_USERNAME_MIN_LENGTH = 1
SOCIALACCOUNT_AUTO_SIGNUP = False
ACCOUNT_EMAIL_REQUIRED = True
SOCIALACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_EMAIL_SUBJECT_PREFIX = '[OpenPlaceRewiews.org]'

LANGUAGE_CODE = 'en'

LANGUAGES = [
    ('en', _('English')),
    # ('ru', _('Russian')),
]

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

APPEND_SLASH = True

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "assets"),
)
STATIC_ROOT = os.path.join(BASE_DIR, '../static')
STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(BASE_DIR, '../media')
MEDIA_URL = '/media/'

ACCOUNT_DEFAULT_HTTP_PROTOCOL = 'https'

SERVER_API_ADDRESS = 'http://127.0.0.1:6463'
SITE_URL = 'http://127.0.0.1:8000'
OPENDB_SIGN_LOGIN = 'openplacereviews:web_backend'
OPENDB_USERNAME = 'web_backend'
OPENDB_SIGN_PK = ''
SLICE_KEY = 50

SETTINGS_EXPORT = ('SERVER_API_ADDRESS', 'SITE_URL')
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'

try:
    from .settings_local import *
except ImportError:
    pass
