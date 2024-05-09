from django.http import JsonResponse, HttpResponseBadRequest
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from accounts.models import User
from .models import Project

def get_projects(request, username):
    user = get_object_or_404(User, username=username)
    owned_projects = Project.objects.filter(owner=user).values('name', 'description', 'start_date', 'end_date')
    data = {
        'owned_projects': list(owned_projects),
    }
    return JsonResponse(data)

def create_project(request, username):
    owner = get_object_or_404(User, username=username)
    name = request.POST.get('name')
    description = request.POST.get('description')
    start_date = request.POST.get('start_date')
    end_date = request.POST.get('end_date')

    project = Project(owner=owner, name=name, description=description, start_date=start_date, end_date=end_date)

    try:
        project.full_clean()
        project.save()
        return JsonResponse({'status': 'success'})
    except ValidationError as e:
        return HttpResponseBadRequest('Invalid data: {}'.format(e))