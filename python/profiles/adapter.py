from allauth.account.adapter import DefaultAccountAdapter
from allauth.utils import build_absolute_uri
from django.conf import settings
from django.urls import reverse


class OPRAccountAdapter(DefaultAccountAdapter):

    def get_email_confirmation_url(self, request, emailconfirmation):
        url = reverse(
            "account_confirm_email",
            args=[emailconfirmation.key])
        ret = '{proto}://{domain}{url}'.format(
            proto=settings.DEFAULT_HTTP_PROTOCOL,
            domain=settings.SITE_URL,
            url=url)
        return ret