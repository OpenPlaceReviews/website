from django.contrib import admin
from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from django.http import Http404
from main.views import page_not_found


urlpatterns = [
    url(r'^admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


urlpatterns += [
    url(r'^accounts/password/reset/', page_not_found),
    url(r'^accounts/', include('allauth.urls')),
    url(r'', include('main.urls')),
    url(r'', include('profiles.urls')),
]