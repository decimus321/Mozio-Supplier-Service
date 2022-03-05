from django.contrib import admin
from .models import ProviderProfile, Polygon, PolygonPoints

# Register your models here.
admin.site.register(ProviderProfile)
admin.site.register(Polygon)
admin.site.register(PolygonPoints)
