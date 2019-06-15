from django.conf.urls import url, include
from .views import *

urlpatterns = [
    url(r'^profile/edit/$', ProfileView.as_view(), name='profile_page'),
]