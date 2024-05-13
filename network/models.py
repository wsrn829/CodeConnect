from django.core.validators import RegexValidator
from django.db import models
from accounts.models import User

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    like = models.ManyToManyField(User, blank=True, related_name='likes')

    class Meta:
        ordering = ['-created_at']

class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followING')
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')

class FriendRequest(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_requests')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender.username} -> {self.receiver.username}'

class FriendList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, blank=True, related_name='friend_lists')

    def __str__(self):
        return self.user.username