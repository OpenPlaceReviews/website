from django import template
from opendb.utils import get_opendb_status
from django.urls import reverse_lazy
from django.conf import settings


register = template.Library()


# @register.simple_tag
# def opendb_status():
#     statuses = get_opendb_status()
#     return statuses


@register.simple_tag
def queue_url():
    return '{}?url={}/api/queue'.format(reverse_lazy('proxy_url'), settings.SERVER_API_ADDRESS)


@register.simple_tag
def blocks_url():
    return '{}?url={}/api/blocks'.format(reverse_lazy('proxy_url'), settings.SERVER_API_ADDRESS)


@register.simple_tag
def objects_url():
    return '{}?url={}/api/objects?type=sys.operation'.format(reverse_lazy('proxy_url'), settings.SERVER_API_ADDRESS)
