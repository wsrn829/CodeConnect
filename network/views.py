from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User
from .models import Post, Follow, FriendRequest, FriendList
from django.http import JsonResponse

@api_view(['POST'])
@login_required
def create_post(request):
    if request.method == 'POST':
        user = request.user
        content = request.data.get('content')
        post = Post.objects.create(user=user, content=content)
        return Response({'message': 'Post created successfully.'}, status=status.HTTP_201_CREATED)
    return Response({'error': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_posts(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        posts_data = []
        for post in posts:
            posts_data.append({
                'id': post.id,
                'user': post.user.username,
                'content': post.content,
                'created_at': post.created_at,
                'updated_at': post.updated_at,
            })
        return Response(posts_data, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_post(request, post_id):
    if request.method == 'GET':
        post = get_object_or_404(Post, id=post_id)
        post_data = {
            'id': post.id,
            'user': post.user.username,
            'content': post.content,
            'created_at': post.created_at,
            'updated_at': post.updated_at,
        }
        return Response(post_data, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def profile(request, user_id):
    if request.method == 'GET':
        profile = list(User.objects.filter(id=user_id).values())
        following = Follow.objects.filter(user=profile[0], follower=request.user).exists()
        followers = [x.user for x in request.user.follower.all()]
        followers_count = len(followers)
        posts = list(Post.objects.filter(user=profile[0]).order_by('-created_at').values())
        return Response({'profile': profile, 'following': following, 'followers': followers, 'followers_count': followers_count, 'posts': posts}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@login_required
def follow(request, username):
    user_to_follow = get_object_or_404(User, username=username)
    Follow.objects.create(user=user_to_follow, follower=request.user)
    return Response({'message': 'Followed successfully.'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@login_required
def unfollow(request, username):
    user_to_unfollow = get_object_or_404(User, username=username)
    Follow.objects.filter(user=user_to_unfollow, follower=request.user).delete()
    return Response({'message': 'Unfollowed successfully.'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@login_required
def following_list(request):
    following_users = Follow.objects.filter(follower=request.user).values_list('user', flat=True)
    following_data = [{'username': user.username, 'id': user.id} for user in User.objects.filter(id__in=following_users)]
    return Response(following_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@login_required
def is_following(request, username):
    user = get_object_or_404(User, username=username)
    is_following = Follow.objects.filter(user=user, follower=request.user).exists()
    return JsonResponse({'is_following': is_following})

@api_view(['GET'])
@login_required
def followers_list(request):
    followers = Follow.objects.filter(user=request.user).values_list('follower', flat=True)
    followers_data = [{'username': user.username, 'id': user.id} for user in User.objects.filter(id__in=followers)]
    return Response(followers_data, status=status.HTTP_200_OK)

@api_view(['POST'])
@login_required
def edit_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.method == 'POST':
        post.content = request.data.get('content')
        post.save()
        return Response({'message': 'Post edited successfully.'}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@login_required
def like_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if post.like.filter(id=request.user.id).exists():
        post.like.remove(request.user)
    else:
        post.like.add(request.user)
    like_count = post.like.count()
    return Response({'message': 'Post liked/unliked successfully.', 'like_count': like_count}, status=status.HTTP_200_OK)

@api_view(['GET'])
@login_required
def following_posts(request):
    following = User.objects.filter(follows__follower=request.user)
    posts = list(Post.objects.filter(user__in=following).order_by('-created_at').values())
    return Response(posts, status=status.HTTP_200_OK)

@api_view(['GET'])
def following(request):
    following = User.objects.filter(follows__follower=request.user)
    posts = list(Post.objects.filter(user__in=following).order_by('-created_at').values())
    return Response(posts, status=status.HTTP_200_OK)

# @api_view(['POST'])
# @login_required
# def accept_friend_request(request):
#     friend_request = get_object_or_404(FriendRequest, id=request.data.get('friend_request_id'))
#     friend_list = FriendList.objects.get(user=friend_request.receiver)
#     friend_list.friends.add(friend_request.sender)
#     friend_request.delete()
#     return Response({'message': 'Friend request accepted.'}, status=status.HTTP_200_OK)

# @api_view(['POST'])
# @login_required
# def reject_friend_request(request):
#     friend_request = get_object_or_404(FriendRequest, id=request.data.get('friend_request_id'))
#     friend_request.delete()
#     return Response({'message': 'Friend request rejected.'}, status=status.HTTP_200_OK)