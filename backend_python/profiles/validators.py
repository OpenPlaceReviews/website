from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _, ngettext
from django.core import validators
from django.contrib.auth.password_validation import MinimumLengthValidator


class MinimumLengthEntropyValidator:
    """
    Validate whether the password is of a minimum length.
    """
    def __init__(self, min_length=10):
        self.min_length = min_length

    def validate(self, password, user=None):
        if len(password) < self.min_length:
            raise ValidationError(
                ngettext(
                    "This password is too short. Less than %(min_length)d characters produces only 50 bit entropy",
                    "This password is too short. Less than %(min_length)d characters produces only 50 bit entropy",
                    self.min_length
                ),
                code='password_too_short',
                params={'min_length': self.min_length},
            )

    def get_help_text(self):
        return ngettext(
            "Your password must contain at least %(min_length)d character.",
            "Your password must contain at least %(min_length)d characters.",
            self.min_length
        ) % {'min_length': self.min_length}
