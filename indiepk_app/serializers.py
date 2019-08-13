from rest_framework import serializers
from .models import Artist, Merchandise, Show

class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ('id', 'flyer_url', 'date', 'venue', 'lineup', 'cost', 'artist')

class MerchandiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Merchandise
        fields = ('id', 'name', 'photo_url', 'description', 'artist')

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ('id', 'name', 'photo_url', 'location', 'genre', 'bio')