from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('artists', views.ArtistView)
router.register('merchandise', views.MerchandiseView)
router.register('shows', views.ShowView)

urlpatterns = [
    path('', include(router.urls))
]