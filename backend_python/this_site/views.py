from django.shortcuts import render
from django.views.generic import TemplateView


class FrontpageView(TemplateView):
    template_name = 'frontpage.html'