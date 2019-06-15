from django import template


register = template.Library()

@register.filter
def replace_dot(value, replace_digit='_'):
    return str(value).replace('.', replace_digit)


@register.filter
def replace_value(string, args):
    args = args.split('|')
    return str(string).replace(args[0], args[1])


@register.filter
def get_item(dictionary, key):
    return dictionary.get(key)
