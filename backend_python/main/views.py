from django.shortcuts import render
from django.template.loader import render_to_string
from django.views.generic import TemplateView
from django.http import HttpResponseNotFound

class FrontpageView(TemplateView):
    template_name = 'frontpage.html'

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


def page_not_found(request, exception=None, template_name='404.html'):
    body = render_to_string(template_name, {'is_index_page': True, 'request': request})
    return HttpResponseNotFound(body, content_type='text/html')