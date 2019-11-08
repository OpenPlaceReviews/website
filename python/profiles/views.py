from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView
from django.views.generic.edit import FormMixin
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from opendb.utils import get_object_by_name
from .forms import ProfileEditForm
from django.urls import reverse_lazy
from allauth.account.models import EmailAddress
from allauth.account.utils import sync_user_email_addresses
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
from django.http import JsonResponse
from django.core.exceptions import PermissionDenied


@method_decorator(login_required, name='dispatch')
class ProfileView(FormMixin, TemplateView):
    template_name = 'account/user_page.html'
    form_class = ProfileEditForm
    success_url = reverse_lazy('profile_page')
    opendb_user = None

    def dispatch(self, request, *args, **kwargs):
        sync_user_email_addresses(request.user)
        self.opendb_user = get_object_by_name(self.request.user.username)
        return super(ProfileView, self).dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        ctx = super(ProfileView, self).get_context_data(**kwargs)
        ctx['user'] = self.request.user
        ctx['social_account'] = self.request.user.socialaccount_set.all().first()
        ctx['opendb_user'] = self.opendb_user
        ctx['emails_not_verified'] = EmailAddress.objects.filter(user=self.request.user, verified=False)
        return ctx
    
    def get_initial(self):
        data = super(ProfileView, self).get_initial()
        data['email'] = self.request.user.email
        if self.opendb_user:
            details = self.opendb_user.get('details', {})
            if details:
                data['country'] = details.get('country')
                data['languages'] = details.get('languages')
        return data

    def form_valid(self, form):
        if 'email' in form.changed_data:
            email = form.cleaned_data.get('email')
            print(email, '--------------')
            user = self.request.user
            user.add_email_address(self.request, email)
        return super().form_valid(form)

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)
        return render(request, self.template_name, self.get_context_data())


@login_required
def get_private_key_by_session_id(request, session_id):
    User = get_user_model()
    session = get_object_or_404(Session, session_key=session_id)
    user_id = session.get_decoded().get('_auth_user_id')
    if request.user.id == int(user_id):
        user = get_object_or_404(User, pk=user_id)
        user_data = {
            'private_key': user.privatekey,
            'username':user.username
        }
        return JsonResponse(user_data)
    else:
        raise PermissionDenied()