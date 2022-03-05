from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializerWithToken, MyTokenObtainPairSerializer, UserSerializer, \
    ProviderProfileSerializer, PolygonSerializer, PolygonPointsSerializer, PolygonSerializerWithProvider
from django.contrib.auth.models import User

from .models import ProviderProfile, Polygon, PolygonPoints
SUPPLIER_SECRET_CODE = '123456789'
ADMIN_SECRET_CODE = '987654321'


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def RegisterSupplier(request):
    try:
        data = request.data
        email = data.get('email')
        if not User.objects.filter(email=email).exists():
            password = data.get('password')
            name = data.get('name')
            phone = data.get('phone')
            language = data.get('language')
            currency = data.get('currency')
            secret = data.get('secret')
            if secret == SUPPLIER_SECRET_CODE:
                user = User.objects.create(
                    username=email,
                    email=email,
                    password=make_password(password),
                    first_name=name,
                )

                ProviderProfile.objects.create(
                    user=user,
                    email=email,
                    name=name,
                    phone=phone,
                    language=language,
                    currency=currency,
                )
                serializer = UserSerializerWithToken(user, many=False)
                return Response(serializer.data)
            else:
                message = {'detail': 'The entered secret code is invalid'}
        else:
            message = {'detail': 'This account already exists'}
    except:
        message = {'detail': 'We can\'t process your request'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetSupplierProfile(request):
    try:
        user = request.user
        serialized_user = UserSerializer(user, many=False)
        profile = ProviderProfile.objects.get(user=user)
        serialized_profile = ProviderProfileSerializer(profile)

        serialized_data = {}
        serialized_data.update(serialized_user.data)
        serialized_data.update(serialized_profile.data)

        return Response(serialized_data)
    except:
        message = {'detail': 'We can\'t process your request'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddPolygon(request):
    try:
        user = request.user
        if user in User.objects.all():
            profile = ProviderProfile.objects.get(user=user)
            data = request.data
            name = data.get('title')
            price = data.get('price')
            points = data.get('points')
            polygon = Polygon.objects.create(
                provider=profile,
                name=name,
                price=price
            )
            for point in points:
                PolygonPoints.objects.create(
                    polygon=polygon,
                    lat=point.get('lat'),
                    long=point.get('long')
                )
            serialized_polygon = PolygonSerializer(polygon)
            return Response(serialized_polygon.data)
    except:
        message = {'detail': 'We can\'t process your request'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetAllPolygons(request):
    try:
        user = request.user
        profile = ProviderProfile.objects.get(user=user)
        polygons = Polygon.objects.filter(provider=profile)
        serialized_polygons = PolygonSerializer(polygons, many=True)
        return Response(serialized_polygons.data)
    except:
        message = {'detail': 'We can\'t process your request'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def DeletePolygon(request):
    try:
        user = request.user
        polygon_id = request.data.get('polygon_id')
        profile = ProviderProfile.objects.get(user=user)
        all_polygons = Polygon.objects.filter(provider=profile)
        polygon_to_delete = Polygon.objects.get(id=polygon_id)
        if polygon_to_delete in all_polygons:
            polygon_to_delete.delete()
            message = {'detail': f"The polygon no. {polygon_id} has been deleted successfully"}
            return Response(message, status=status.HTTP_200_OK)
        message = {'detail': "This polygon doesn't exist"}
    except:
        message = {'detail': 'We can\'t process your request'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def GetPolygonPoints(request):
    try:
        user = request.user
        polygon_id = request.data.get('polygon_id')

        profile = ProviderProfile.objects.get(user=user)
        all_polygons = Polygon.objects.filter(provider=profile)
        polygon = Polygon.objects.get(id=polygon_id)

        if polygon in all_polygons:
            points = PolygonPoints.objects.filter(polygon=polygon)
            serialized_points = PolygonPointsSerializer(points, many=True)
            return Response(serialized_points.data)
        message={'detail': "This polygon doesn't exist"}
    except:
        message = {'detail': 'We can\'t process your request'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def EditPolygon(request):
    try:
        user = request.user
        if user in User.objects.all():
            profile = ProviderProfile.objects.get(user=user)
            data = request.data
            polygon_id = request.data.get('polygon_id')
            name = data.get('name')
            price = data.get('price')
            existing_points = data.get('existing_points')
            new_points = data.get('new_points')

            polygon = Polygon.objects.get(id=polygon_id)
            polygon.name = name
            polygon.price = price
            polygon.save()
            if existing_points:
                for point in existing_points:
                    point_to_update = PolygonPoints.objects.get(id=point.get('id'))
                    point_to_update.lat = point.get('lat')
                    point_to_update.long = point.get('long')
                    point_to_update.save()
            if new_points:
                for point in new_points:
                    PolygonPoints.objects.create(
                        polygon=polygon,
                        lat=point.get('lat'),
                        long=point.get('long')
                    )
            serialized_polygon = PolygonSerializer(polygon)
            return Response(serialized_polygon.data)
    except:
        message = {'detail': 'We can\'t process your request'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def CheckAdminCode(request):
    try:
        code = request.query_params.get('code')
        if code == ADMIN_SECRET_CODE:
            message = {'detail': 'You logged successfully as admin'}
            return Response(message, status=status.HTTP_200_OK)
        message = {'detail': 'The entered code in incorrect'}
    except:
        message = {'detail': 'We can\'t process your request'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def QueryCoordinates(request):
    try:
        code = request.query_params.get('code')
        if code == ADMIN_SECRET_CODE:
            lat = request.query_params.get('lat')
            long = request.query_params.get('long')
            polygons = Polygon.objects.filter(polygonpoints__lat=lat, polygonpoints__long=long)
            serialized_polygons_with_provider = PolygonSerializerWithProvider(polygons, many=True)

            return Response(serialized_polygons_with_provider.data)
        message = {'detail': 'The entered code in incorrect'}
    except:
        message = {'detail': 'We can\'t process your request'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)