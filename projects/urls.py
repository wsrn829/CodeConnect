from django.urls import path
from .views import get_projects, create_project

urlpatterns = [
    path('project/<str:username>/', get_projects, name='get_projects'),
    path('project/<str:username>/create/', create_project, name='create_project'),
]