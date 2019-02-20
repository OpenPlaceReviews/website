from allauth.socialaccount.providers.oauth.urls import default_urlpatterns

from .provider import OSMProvider


urlpatterns = default_urlpatterns(OSMProvider)