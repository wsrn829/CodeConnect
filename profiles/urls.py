from django.urls import path
from .views import get_profile, update_profile, create_profile

urlpatterns = [
    path('profile/create/', create_profile, name='create_profile'),
    path('profile/<str:username>/', get_profile, name='get_profile'),
    path('profile/<str:username>/edit/', update_profile, name='edit_profile'),
]
