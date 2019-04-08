from django.conf.urls import url
from .views import FrontpageView, DataPageView, MapPageView, proxy_url, \
    BlockPage, block_exm
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^$', FrontpageView.as_view(), name='frontpage'),
    url(r'^data/blocks/$', DataPageView.as_view(), name="data_page"),
    url(r'^data/blocks/(?P<hash>.+)/$', BlockPage.as_view(), name="block_page"),
    url(r'^data/queue/$',
        TemplateView.as_view(template_name='main/data_page_queue.html'),
        name='data_queue'),
    url(r'^data/entities/signups/$',
        TemplateView.as_view(template_name='main/data_entities_signups.html'),
        name='data_entities_signups'),
    url(r'^data/entities/logins/$',
        TemplateView.as_view(template_name='main/data_entities_logins.html'),
        name='data_entities_logins'),
    url(r'^data/entities/grants/$',
        TemplateView.as_view(template_name='main/data_entities_grants.html'),
        name='data_entities_grants'),
    url(r'^data/entities/validations/$',
        TemplateView.as_view(template_name='main/data_entities_validations.html'),
        name='data_entities_validations'),
    url(r'^data/entities/roles/$',
        TemplateView.as_view(template_name='main/data_entities_roles.html'),
        name='data_entities_roles'),
    url(r'^data/entities/operations/$',
        TemplateView.as_view(template_name='main/data_entities_operations.html'),
        name='data_entities_operations'),
    url(r'^map/', MapPageView.as_view(), name="map_page"),
    url(r'^proxy_url$', proxy_url, name='proxy_url'),
    url(r'^block_exm/$', block_exm),
]