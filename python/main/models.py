from django.db import models


class EmailSubscription(models.Model):
    email = models.EmailField(unique=True)
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    ip = models.GenericIPAddressField(blank=True, null=True)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = 'emails subscription'
        verbose_name = 'email subscription'
        ordering = ['email']
