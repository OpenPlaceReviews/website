import json

import requests
from django.conf import settings
from django.http import HttpResponseNotFound, Http404
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
            block_url = '{}/api/block-by-hash?hash={}'.format(settings.PROXY_URL_API, self.kwargs.get('hash'))
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
        block_hash = self.kwargs.get('block_hash')
        tr_hash= self.kwargs.get('tr_hash')
        url_block_api = "{}/api/block-by-hash?hash={}".format(settings.SERVER_API_ADDRESS, block_hash)
        block = requests.get(url_block_api)
        if block.json():
            ctx['block_from_api'] = block.json()
            has_tr_hash = False
            for op in block.json().get('ops'):
                if tr_hash in op.get('hash'):
                    has_tr_hash = True
                    ctx['transaction_from_block'] = op
                    break
            if not has_tr_hash:
                raise Http404
            else:
                ctx['transaction_hash'] = tr_hash

        else:
            raise Http404
        return ctx