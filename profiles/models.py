from django.db import models
from accounts.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    favorite_language = models.CharField(max_length=100, blank=True)
    github_profile = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return self.user.username