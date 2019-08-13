from django.db import models

# Create your models here.
class Artist(models.Model):
    name = models.CharField(max_length=200)
    photo_url = models.CharField(max_length=500)
    location = models.CharField(max_length=150)
    genre = models.CharField(max_length=300)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Merchandise(models.Model):
    name = models.CharField(max_length=250)
    photo_url = models.CharField(max_length=500)
    description = models.TextField(blank=True, null=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='merchandise')

    def __str__(self):
        return self.name

class Show(models.Model):
    flyer_url = models.CharField(max_length=500, blank=True)
    date = models.CharField(max_length=100)
    venue = models.CharField(max_length=200)
    lineup = models.CharField(max_length=400)
    cost = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='shows')

    def __str__(self):
        return self.venue