from django.shortcuts import render
from django.views.generic import TemplateView
from profiles.models import User


class ProfileView(TemplateView):
    template_name = 'account/user_page.html'

