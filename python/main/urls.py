from django.conf.urls import url
from .views import FrontpageView, DataPageView, MapPageView, proxy_url, \
    BlockPage, block_exm, OperationView, TransactionPageView, QueueTransactionView
from django.views.generic import TemplateView

urlpatterns = [
    # url(r'^$', FrontpageView.as_view(), name='frontpage'),
    url(r'^$', TemplateView.as_view(template_name='landing.html'), name='frontpage'),
    url(r'^data/blocks/$', DataPageView.as_view(), name="data_page"),
    url(r'^data/blocks/(?P<hash>[a-zA-Z0-9]+)/$', BlockPage.as_view(), name="block_page"),
    url(r'^data/blocks/(?P<block_hash>[a-zA-Z0-9]+)/(?P<tr_hash>[a-zA-Z0-9]+)/$', TransactionPageView.as_view(), name="block_transaction"),
    url(r'^data/queue/(?P<tr_hash>[a-zA-Z0-9]+)/$', QueueTransactionView.as_view(),name='data_queue_transaction'),
    url(r'^data/queue/$', TemplateView.as_view(template_name='main/data_page_queue.html'), name='data_queue'),
    url(r'^data/objects/(?P<operation_id>.*)/$',
        OperationView.as_view(),name='data_operation'),
    url(r'^map/', MapPageView.as_view(), name="map_page"),
    url(r'^proxy_url$', proxy_url, name='proxy_url'),
    url(r'^block_exm/$', block_exm),

]