from django.contrib import admin
from .models import Post, Follow, FriendRequest, FriendList

admin.site.register(Post)
admin.site.register(Follow)
admin.site.register(FriendRequest)
admin.site.register(FriendList)
