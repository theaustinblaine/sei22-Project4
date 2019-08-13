from django.shortcuts import render
from rest_framework import viewsets

from .serializers import ArtistSerializer, MerchandiseSerializer, ShowSerializer
from .models import Artist, Merchandise, Show

# Create your views here.
class ArtistView(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class MerchandiseView(viewsets.ModelViewSet):
    queryset = Merchandise.objects.all()
    serializer_class = MerchandiseSerializer

class ShowView(viewsets.ModelViewSet):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer