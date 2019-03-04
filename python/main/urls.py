from django.conf.urls import url
from .views import FrontpageView, DataPageView, MapPageView


urlpatterns = [
    url(r'^$', FrontpageView.as_view(), name='frontpage'),
    url(r'^data/', DataPageView.as_view(), name="data_page"),
    url(r'^map/', MapPageView.as_view(), name="map_page"),
]