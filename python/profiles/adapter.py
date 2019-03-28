from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from django.urls import reverse


class OPRAccountAdapter(DefaultAccountAdapter):

    def get_email_confirmation_url(self, request, emailconfirmation):
        url = reverse(
            "account_confirm_email",
            args=[emailconfirmation.key])
        ret = '{site_url}{url}'.format(
            site_url=settings.SITE_URL,
            url=url)
        return ret