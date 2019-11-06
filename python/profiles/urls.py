from django.conf.urls import url, include
from .views import *

urlpatterns = [
    url(r'^profile/edit/$', ProfileView.as_view(), name='profile_page'),
    url(r'^profile/get_private_key/(?P<session_id>[a-zA-Z0-9]+)$', get_private_key_by_session_id, name='get_private_key_by_session_id'),
]