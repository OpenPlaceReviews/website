from django.conf.urls import url
from .views import FrontpageView, DataPageView


urlpatterns = [
    url(r'^$', FrontpageView.as_view(), name='frontpage'),
    url(r'^data/', DataPageView.as_view(), name="data_page"),
]