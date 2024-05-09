from django.urls import path
from .views import get_profile, edit_profile

urlpatterns = [
    path('profile/<str:username>/', get_profile, name='get_profile'),
    path('profile/<str:username>/edit/', edit_profile, name='edit_profile'),
]