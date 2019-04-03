from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponseRedirect
from django.contrib.auth import logout
from django.urls import reverse_lazy
from django.contrib import messages


class ValidationPKMiddleware(MiddlewareMixin):

    def process_request(self, request):

        if request.user.is_authenticated and request.user.privatekey:
            pk_tail = request.session.get('opendb_privatekey')
            if pk_tail and pk_tail in request.user.privatekey:
                return
            else:
                logout(request)
                messages.error(request, 'You secret key incorrect. Please login again.')
                return HttpResponseRedirect(reverse_lazy('account_login'))
