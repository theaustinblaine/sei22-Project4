infrom django.contrib import admin
from .models import Artist, Merchandise, Show

# Register your models here.
admin.site.register([Artist, Merchandise, Show])