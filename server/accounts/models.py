from django.db import models

# Create your models here.
from django.db import models
from django.utils import timezone

from college_management.models import College


# Create your CollegeUser models here.

class CollegeUser(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE,
                                null=False, blank=False, default=None, related_name='company_user')
    first_name = models.CharField(max_length=50, default=None, null=True, blank=True)
    last_name = models.CharField(max_length=50, default=None, null=True, blank=True)
    fatherOrHusband = models.CharField(
        max_length=50, default=None, null=True, blank=True)
    aliasName = models.CharField(
        max_length=30, default='', null=True, blank=True)
    username = models.CharField(
        max_length=30, unique=True, null=False, default="")
    address = models.CharField(
        max_length=100, unique=False, default=None, null=True, blank=True)  
    department = models.CharField(max_length=50, default=None, null=True, blank=True)
      
    gender = models.CharField(max_length=10, null=True, default=None, blank=True)
    country = models.CharField(max_length=100, null=True, default=None, blank=True)    
    state = models.CharField(max_length=50, null=True, default=None, blank=True)    
    city = models.CharField(max_length=50, null=True, default=None, blank=True)
    pin = models.CharField(max_length=30, unique=False,
                           default=None, null=True, blank=True)
    email = models.EmailField(verbose_name="email",
                              max_length=60, unique=False, null=True)
    mobile = models.CharField(max_length=30, null=True, default='', blank=True)
    image_url = models.CharField(
        max_length=150, default='', null=False, blank=True)
    attachment_id = models.IntegerField(null=True, blank=True)
    registrationDate = models.DateTimeField(default=timezone.now)
    is_superuser = models.BooleanField(default=False)
    # Please don't use "is_admin" field, check the status from UserGroup table.
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_owner = models.BooleanField(default=False)
    # Please don't use "is_manager" field, check the status from UserGroup table.
    is_manager = models.BooleanField(default=False)
    # Please don't use "is_assistant" field, check the status from UserGroup table.
    is_assistant = models.BooleanField(default=False)
    password_reset_link_sent_at = models.DateTimeField(null=True, blank=True)
    password_reset_token = models.CharField(
        max_length=150, default='', null=True, blank=True)

    def __str__(self):
        return f'{self.id},{self.username}'


