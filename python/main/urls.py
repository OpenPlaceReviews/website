from django.conf.urls import url
from .views import FrontpageView, DataPageView, MapPageView, proxy_url, \
    BlockPage, block_exm


urlpatterns = [
    url(r'^$', FrontpageView.as_view(), name='frontpage'),
    url(r'^data/blocks/$', DataPageView.as_view(), name="data_page"),
    url(r'^data/blocks/(?P<block_id>\d+)/$', BlockPage.as_view(), name="block_page"),
    url(r'^map/', MapPageView.as_view(), name="map_page"),
    url(r'^proxy_url$', proxy_url, name='proxy_url'),
    url(r'^block_exm/$', block_exm),
]