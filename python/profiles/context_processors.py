import json
from .models import LANGUAGES, COUNTRIES


def all_languages_vue(request):
    objs = map(lambda a : {'name':a[0], 'value':a[1]}, LANGUAGES)
    jsons = json.dumps(list(objs))
    return {
        'all_languages_vue': jsons,
    }


def all_countries_vue(request):
    objs = map(lambda a: {'name': a[0], 'value': a[1]}, COUNTRIES)
    jsons = json.dumps(list(objs))
    return {
        'all_countries_vue': jsons,
    }