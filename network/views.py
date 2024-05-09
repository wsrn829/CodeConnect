from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.core.paginator import Paginator
from accounts.models import User
from .models import Post, Follow

@login_required
def new_post(request):
    if request.method == 'POST':
        content =request.POST['content']
        post = Post.objects.create(user=request.user, content=content)
        return JsonResponse({'message': 'Post created successfully.'}, status=201)
    return JsonResponse({'error': 'Invalid request method.'}, status=400)

def posts(request):
    posts = list(Post.objects.values())
    return JsonResponse(posts, safe=False)

@login_required
def profile(request, user_id):
    profile = list(User.objects.filter(id=user_id).values())
    following = Follow.objects.filter(user=profile[0], follower=request.user).exists()
    followers = [x.user for x in request.user.follower.all()]
    followers_count = len(followers)
    posts = list(Post.objects.filter(user=profile[0]).order_by('-created_at').values())
    return JsonResponse({'profile': profile, 'following': following, 'followers': followers, 'followers_count': followers_count, 'posts': posts}, safe=False)

@login_required
def follow(request, user_id):
    user_to_follow = get_object_or_404(User, id=user_id)
    Follow.objects.create(user=user_to_follow, follower=request.user)
    return JsonResponse({'message': 'Followed successfully.'}, status=201)

@login_required
def unfollow(request, user_id):
    user_to_unfollow = get_object_or_404(User, id=user_id)
    Follow.objects.filter(user=user_to_unfollow, follower=request.user).delete()
    return JsonResponse({'message': 'Unfollowed successfully.'}, status=201)

@login_required
def edit_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.method == 'POST':
        post.content = request.POST['content']
        post.save()
        return JsonResponse({'message': 'Post edited successfully.'}, status=201)
    return JsonResponse({'error': 'Invalid request method.'}, status=400)

@login_required
def like_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if post.like.filter(id=request.user.id).exists():
        post.like.remove(request.user)
    else:
        post.like.add(request.user)
    return JsonResponse({'message': 'Post liked/unliked successfully.'}, status=201)

@login_required
def following_posts(request):
    following = User.objects.filter(follows__follower=request.user)
    posts = list(Post.objects.filter(user__in=following).order_by('-created_at').values())
    return JsonResponse(posts, safe=False)

@login_required
def following(request):
    following = User.objects.filter(follows__follower=request.user)
    posts = list(Post.objects.filter(user__in=following).order_by('-created_at').values())
    return JsonResponse(posts, safe=False)

@login_required
def accept_friend_request(request):
    friend_request = FriendRequest.objects.get(id=request.POST.get('friend_request_id'))
    friend_list = FriendList.objects.get(user=friend_request.receiver)
    friend_list.friends.add(friend_request.sender)
    friend_request.delete()

@login_required
def reject_friend_request(request):
    friend_request = FriendRequest.objects.get(id=request.POST.get('friend_request_id'))
    friend_request.delete()