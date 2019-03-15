from django.template.loader import render_to_string
from django.views.generic import TemplateView
from django.http import HttpResponseNotFound, HttpResponse, JsonResponse
import requests
import json


class FrontpageView(TemplateView):
    template_name = 'frontpage.html'

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


def page_not_found(request, exception=None, template_name='404.html'):
    body = render_to_string(template_name, {'is_index_page': True, 'request': request})
    return HttpResponseNotFound(body, content_type='text/html')


class DataPageView(TemplateView):
    template_name = 'main/data_page.html'


class MapPageView(TemplateView):
    template_name = 'main/map_page.html'


def proxy_url(request):
    url = request.GET.get('url')
    response = requests.get(url)
    return JsonResponse(response.json())


class BlockPage(TemplateView):
    template_name = 'main/block_page.html'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data()
        url = 'http://127.0.0.1:8000/en/block_exm/'
        ctx['block_id'] = self.kwargs.get('block_id')
        response = requests.get(url).json()
        ctx['operations'] = response.get('ops')
        return ctx


def block_exm(reqeust):
    block = json.loads(open('./main/block.json').read())
    return JsonResponse(block)