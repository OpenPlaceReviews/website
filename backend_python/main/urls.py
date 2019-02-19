from django.conf.urls import url
from .views import FrontpageView


urlpatterns = [
    url(r'^$', FrontpageView.as_view(), name='frontpage'),
]