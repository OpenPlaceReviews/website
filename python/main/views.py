import json

import requests
from django.conf import settings
from django.http import HttpResponseNotFound, JsonResponse, Http404
from django.template.loader import render_to_string
from django.views.generic import TemplateView
from django.urls import reverse_lazy
from django.views.decorators.http import require_POST
from .forms import EmailSubscritinoForm
from ipware import get_client_ip
from django.template.defaultfilters import safe


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
        hash = self.kwargs.get('hash')
        url_block_api = "{}/api/block-by-hash?hash={}".format(settings.SERVER_API_ADDRESS, hash)
        block = requests.get(url_block_api)
        if block.json():
            ctx['block_from_api'] = block.json()
        else:
            raise Http404('Not found block by hash {}'.format(hash))
        ctx['hash'] = hash
        breadcrumbs = (
            ('Block list', reverse_lazy('data_page')),
            ('Block #' + str(block.json().get('block_id')), '')
        )
        ctx['breadcrumbs'] = breadcrumbs
        return ctx


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
                raise Http404('Not found transaction by hash {}'.format(tr_hash))
            else:
                ctx['transaction_hash'] = tr_hash
            breadcrumbs = (
                ('Block list', reverse_lazy('data_page')),
                ('Block #' + str(block.json().get('block_id')), reverse_lazy('block_page', args=[block_hash])),
                ('Transaction ' + tr_hash[:8], '')
            )
            ctx['breadcrumbs'] = breadcrumbs
        else:
            raise Http404('Not found block by hash {}'.format(block_hash))
        return ctx


class QueueTransactionView(TemplateView):
    template_name = 'main/queue_transaction.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        tr_hash= self.kwargs.get('tr_hash')
        queue_url = "{}/api/queue".format(settings.SERVER_API_ADDRESS)
        queue = requests.get(queue_url)
        tr_in_queue = False
        if queue.json():
            for op in queue.json().get('ops'):
                if tr_hash in op.get('hash'):
                    tr_in_queue = True
                    break
        if not tr_in_queue:
            raise Http404('Not found transaction in queue')
        ctx['transaction_hash'] = tr_hash
        url_tr_api = "{}/api/op-by-hash?hash={}".format(settings.SERVER_API_ADDRESS, tr_hash)
        transaction = requests.get(url_tr_api)
        breadcrumbs = (
            ('Queue', reverse_lazy('data_queue')),
            ('Transaction ' + tr_hash[:8], '')
        )
        ctx['breadcrumbs'] = breadcrumbs
        if not transaction.json():
            raise Http404('Not found transaction by hash {}'.format(tr_hash))
        return ctx


@require_POST
def subscribe(request):
    form = EmailSubscritinoForm(request.POST)
    if form.is_valid():
        email_subsciption = form.save()
        client_ip, is_routable = get_client_ip(request)
        email_subsciption.ip = client_ip
        email_subsciption.save()
        return JsonResponse({'msg': 'You have successfully subscribed'})
    else:
        return JsonResponse({'errors': dict(form.errors.items())})


class GetFormatsView(TemplateView):
    template_name = '_include/get_formats.html'

    def get_context_data(self, **kwargs):
        ctx = super(GetFormatsView, self).get_context_data(**kwargs)
        url_api = "{}/api/objects?type=sys.operation".format(settings.SERVER_API_ADDRESS)
        operations = requests.get(url_api)
        if operations.status_code == 200:
            ctx['operations'] = json.loads(operations.content)
        ctx['test'] = {'test': 'test text'}
        return ctx
