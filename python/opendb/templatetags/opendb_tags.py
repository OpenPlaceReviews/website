from django import template
from opendb.utils import get_opendb_status


register = template.Library()


@register.simple_tag
def opendb_status():
    statuses = get_opendb_status()
    return statuses
