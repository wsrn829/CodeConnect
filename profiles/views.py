from django.http import JsonResponse, HttpResponseBadRequest
from django.views import View
from django.core.exceptions import ValidationError
from accounts.models import User
from .models import Profile

def get_profile(self, request, *args, **kwargs):
    user = User.objects.get(username=kwargs['username'])
    profile = Profile.objects.get(user=user)
    data = {
        'username': profile.user.username,
        'bio': profile.bio,
        'favorite_language': profile.favorite_language,
        'github_profile': profile.github_profile,
        # 'profile_pic' is an ImageField, so we need to call .url to get the URL of the image
        'profile_pic': request.build_absolute_uri(profile.profile_pic.url) if profile.profile_pic else None,
    }
    return JsonResponse(data)

def edit_profile(self, request, *args, **kwargs):
    user = User.objects.get(username=kwargs['username'])
    profile = Profile.objects.get(user=user)

    bio = request.POST.get('bio')
    favorite_language = request.POST.get('favorite_language')
    github_profile = request.POST.get('github_profile')

    if bio is not None:
        profile.bio = bio
    if favorite_language is not None:
        profile.favorite_language = favorite_language
    if github_profile is not None:
        profile.github_profile = github_profile

    try:
        profile.full_clean()
        profile.save()
        return JsonResponse({'status': 'success'})
    except ValidationError as e:
        return HttpResponseBadRequest('Invalid data: {}'.format(e))