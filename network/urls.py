from django.urls import path
from . import views

urlpatterns = [
    path("create_post/", views.create_post, name="create_post"),
    path("posts/", views.get_posts, name="get_posts"),
    path("post/<int:post_id>/", views.get_post, name="get_post"),
    path("profile/<int:user_id>/", views.profile, name="profile"),
    path("follow/<str:username>/", views.follow, name="follow"),
    path("unfollow/<str:username>/", views.unfollow, name="unfollow"),
    path("is_following/<str:username>/", views.is_following, name="is_following"),
    path("edit_post/<int:post_id>/", views.edit_post, name="edit_post"),
    path("like_post/<int:post_id>/", views.like_post, name="like_post"),
    path("following_posts/", views.following_posts, name="following_posts"),
    path("following/", views.following, name="following"),
    path("following_list/", views.following_list, name="following_list"),
    path("followers_list/", views.followers_list, name="followers_list"),
    # path("accept_friend_request/", views.accept_friend_request, name="accept_friend_request"),
    # path("reject_friend_request/", views.reject_friend_request, name="reject_friend_request"),
]