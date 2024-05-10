from django.urls import path
from . import views

urlpatterns = [
    path("new_post", views.new_post, name="new_post"),
    path("posts", views.posts, name="posts"),
    path("profile/<int:user_id>", views.profile, name="profile"),
    path("follow/<int:user_id>", views.follow, name="follow"),
    path("unfollow/<int:user_id>", views.unfollow, name="unfollow"),
    path("edit_post/<int:post_id>", views.edit_post, name="edit_post"),
    path("like_post/<int:post_id>", views.like_post, name="like_post"),
    path("following_posts", views.following_posts, name="following_posts"),
    path("following", views.following, name="following"),
    path("accept_friend_request", views.accept_friend_request, name="accept_friend_request"),
    path("reject_friend_request", views.reject_friend_request, name="reject_friend_request"),
]