from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        print(f'Token for user {user.username}: {token.key}')
        return Response({"token": token.key}, status=status.HTTP_200_OK)
        print(f'Token for user {user.username}: {token.key}')
    else:
        return Response({"message": "Invalid username and/or password."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def register(request):
    if request.method == 'GET':
        return Response({'message': 'Only POST requests are allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    elif request.method == "POST":
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        confirmation = request.data.get("confirmation")

        if password != confirmation:
            return Response({"message": "Passwords must match."}, status=status.HTTP_400_BAD_REQUEST)

        User = get_user_model()
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            token, _ = Token.objects.get_or_create(user=user)
            print(f'Token for user {user.username}: {token.key}')
        except IntegrityError:
            return Response({"message": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"token": token.key}, status=status.HTTP_201_CREATED)