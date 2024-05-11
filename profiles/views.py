from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User
from .models import Profile

@api_view(['GET'])
def get_profile(request, username):
    user = get_object_or_404(User, username=username)
    profile = get_object_or_404(Profile, user=user)
    data = {
        'username': profile.user.username,
        'bio': profile.bio,
        'favorite_language': profile.favorite_language,
        'github_profile': profile.github_profile,
        'profile_pic': request.build_absolute_uri(profile.profile_pic.url) if profile.profile_pic else None,
    }
    return Response(data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_profile(request, username):
    user = get_object_or_404(User, username=username)
    profile = get_object_or_404(Profile, user=user)

    bio = request.data.get('bio')
    favorite_language = request.data.get('favorite_language')
    github_profile = request.data.get('github_profile')

    if bio is not None:
        profile.bio = bio
    if favorite_language is not None:
        profile.favorite_language = favorite_language
    if github_profile is not None:
        profile.github_profile = github_profile

    try:
        profile.full_clean()
        profile.save()
        return Response({'status': 'success'}, status=status.HTTP_200_OK)
    except ValidationError as e:
        return Response({'error': 'Invalid data: {}'.format(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_profile(request):
    print(request.auth)
    user = request.user  # Get the currently authenticated user
    print(user)
    if not user.is_authenticated:  # If the user is not authenticated, return an error
        return Response({'error': 'You must be logged in to create a profile.'}, status=status.HTTP_403_FORBIDDEN)

    # Check if the user already has a profile
    if Profile.objects.filter(user=user).exists():
        return Response({'error': 'Profile already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    profile = Profile.objects.create(user=user)

    bio = request.data.get('bio')
    favorite_language = request.data.get('favorite_language')
    github_profile = request.data.get('github_profile')

    if bio is not None:
        profile.bio = bio
    if favorite_language is not None:
        profile.favorite_language = favorite_language
    if github_profile is not None:
        profile.github_profile = github_profile

    try:
        profile.full_clean()
        profile.save()
        return Response({'status': 'success'}, status=status.HTTP_201_CREATED)
    except ValidationError as e:
        return Response({'error': 'Invalid data: {}'.format(e)}, status=status.HTTP_400_BAD_REQUEST)
