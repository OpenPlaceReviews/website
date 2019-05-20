from django import forms
from .models import EmailSubscription


class EmailSubscritinoForm(forms.ModelForm):
    class Meta:
        model = EmailSubscription
        exclude = ['ip']