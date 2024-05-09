from django.urls import path
from .views import get_messages, send_message

urlpatterns = [
    path('messages/<str:username>/', get_messages, name='get_messages'),
    path('messages/<str:username>/send/', send_message, name='send_message'),
]