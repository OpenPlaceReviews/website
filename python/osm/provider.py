from allauth.socialaccount.providers.base import ProviderAccount
from allauth.socialaccount.providers.oauth.provider import OAuthProvider


class OSMAccount(ProviderAccount):
    def get_profile_url(self):
        return 'https://www.openstreetmap.org/user/%s' % self.account.extra_data.get('username')

    def get_avatar_url(self):
        return self.account.extra_data.get('avatar')

    def get_username(self):
        return self.account.extra_data.get('username')

    def to_str(self):
        return self.get_username()


class OSMProvider(OAuthProvider):
    id = 'osm'
    name = 'OpenStreetMap'
    account_class = OSMAccount

    def get_default_scope(self):
        scope = ['read']
        return scope

    def extract_uid(self, data):
        return str(data['id'])

    def extract_extra_data(self, data):
        data['name'] = data['username']
        return data

    def extract_common_fields(self, data):
        return dict(username=data.get('username'),
                    avatar=data.get('avatar'))


from allauth.socialaccount import providers


provider_classes = [OSMProvider]
providers.registry.register(OSMProvider)
