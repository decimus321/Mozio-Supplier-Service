from django.urls import path
from .views import RegisterSupplier, MyTokenObtainPairView, GetSupplierProfile, AddPolygon, \
    GetAllPolygons, DeletePolygon, GetPolygonPoints, EditPolygon, CheckAdminCode, QueryCoordinates

urlpatterns = [
    path('login-supplier', MyTokenObtainPairView.as_view(), name='login-supplier'),
    path('register-supplier', RegisterSupplier, name='register-supplier'),
    path('profile-supplier', GetSupplierProfile, name='profile-supplier'),
    path('add-polygon', AddPolygon, name='add-polygon'),
    path('get-all-polygons', GetAllPolygons, name='get-all-polygons'),
    path('delete-polygon', DeletePolygon, name='delete-polygon'),
    path('get-polygon-points', GetPolygonPoints, name='get-polygon-points'),
    path('edit-polygon', EditPolygon, name='edit-polygon'),
    path('check-admin', CheckAdminCode, name="check-admin"),
    path('query-coordinates', QueryCoordinates, name='query-coordinates')
]
