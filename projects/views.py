from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from accounts.models import User
from .models import Project


@api_view(['GET'])
def get_projects(request, username):
    user = get_object_or_404(User, username=username)
    projects = Project.objects.filter(owner=user).values('name', 'description', 'start_date', 'end_date')
    data = {
        'projects': list(projects),
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_project(request, username):
    owner = get_object_or_404(User, username=username)
    name = request.data.get('name')
    description = request.data.get('description')
    start_date = request.data.get('start_date')
    end_date = request.data.get('end_date')

    project = Project(owner=owner, name=name, description=description, start_date=start_date, end_date=end_date)

    try:
        project.full_clean()
        project.save()
        return Response({'status': 'success'}, status=status.HTTP_201_CREATED)
    except ValidationError as e:
        return Response({'message': 'Invalid data: {}'.format(e)}, status=status.HTTP_400_BAD_REQUEST)