from django.shortcuts import render
from django.views.generic import TemplateView


class FrontpageView(TemplateView):
    template_name = 'frontpage.html'

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
