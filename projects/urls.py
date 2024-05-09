from django.urls import path
from .views import get_projects, create_project

urlpatterns = [
    path('projects/<str:username>/', get_projects, name='get_projects'),
    path('projects/<str:username>/create/', create_project, name='create_project'),
]