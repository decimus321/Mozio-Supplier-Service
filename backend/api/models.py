from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import User


class ProviderProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False)
    name = models.CharField(max_length=64, null=False, blank=False)
    email = models.CharField(max_length=64, null=False, blank=False, unique=True)
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    language = models.CharField(max_length=32, blank=False, null=False)
    currency = models.CharField(max_length=3, blank=False, null=False)


class Polygon(models.Model):
    provider = models.ForeignKey(ProviderProfile, on_delete=models.CASCADE, null=False, blank=False)
    name = models.CharField(max_length=64, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)


class PolygonPoints(models.Model):
    polygon = models.ForeignKey(Polygon, on_delete=models.CASCADE, null=False, blank=False)
    lat = models.CharField(max_length=255, null=False, blank=False)
    long = models.CharField(max_length=255, null=False, blank=False)
