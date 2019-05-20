from django.contrib import admin
from .models import EmailSubscription


class EmailSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['email', 'active', 'created', 'ip']
    search_fields = ['email', 'ip']

admin.site.register(EmailSubscription, EmailSubscriptionAdmin)
