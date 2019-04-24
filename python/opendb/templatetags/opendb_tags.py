from django import template
from opendb.utils import get_opendb_status



register = template.Library()


# @register.simple_tag
# def opendb_status():
#     statuses = get_opendb_status()
#     return statuses


@register.simple_tag
def queue_url():
    from django.conf import settings
    return '{}/api/queue'.format(settings.PROXY_URL_API)


@register.simple_tag
def blocks_url():
    from django.conf import settings
    return '{}/api/blocks'.format(settings.PROXY_URL_API)


@register.simple_tag
def objects_url():
    from django.conf import settings
    return '{}/api/objects?type=sys.operation'.format(settings.PROXY_URL_API)