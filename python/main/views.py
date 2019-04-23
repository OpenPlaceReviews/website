import json

import requests
from django.conf import settings
from django.http import HttpResponseNotFound, JsonResponse, HttpResponse
from django.template.loader import render_to_string
from django.views.generic import TemplateView
from django.urls import reverse_lazy
from django.http import JsonResponse, HttpResponseRedirect


class FrontpageView(TemplateView):
    template_name = 'frontpage.html'

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


def page_not_found(request, exception=None, template_name='404.html'):
    body = render_to_string(template_name, {'is_index_page': True, 'request': request})
    return HttpResponseNotFound(body, content_type='text/html')


class DataPageView(TemplateView):
    template_name = 'main/data_page.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        breadcrumbs = {
            'Data': reverse_lazy('data_queue'),
            'Block list': reverse_lazy('data_page')
        }
        ctx['breadcrumbs'] = breadcrumbs
        return ctx


class MapPageView(TemplateView):
    template_name = 'main/map_page.html'


def proxy_url(request):
    url = request.GET.get('url')
    response = requests.get(url)
    if response.json().__class__ != dict().__class__:
        return JsonResponse(response.json(), safe=False)
    else:
        return JsonResponse(response.json())


class BlockPage(TemplateView):
    template_name = 'main/block_page.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data()
        ctx['hash'] = self.kwargs.get('hash')
        return ctx

    def render_to_response(self, context, **response_kwargs):
        if 'json' in self.request.GET:
            block_url = '{}?url={}/api/block-by-hash?hash={}'.format(reverse_lazy('proxy_url'), settings.SERVER_API_ADDRESS, self.kwargs.get('hash'))
            return HttpResponseRedirect(block_url)
        return super().render_to_response(context, **response_kwargs)


def block_exm(reqeust):
    block = json.loads(open('./main/block.json').read())
    return JsonResponse(block)


class OperationView(TemplateView):
    template_name = 'main/data_object_page.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['type_op'] = self.kwargs.get('operation_id')
        return ctx


class TransactionPageView(TemplateView):
    template_name = 'main/data_transaction.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['block_hash'] = self.kwargs.get('block_hash')
        ctx['tr_hash'] = self.kwargs.get('tr_hash')
        return ctx