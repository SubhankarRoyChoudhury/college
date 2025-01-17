from django.db import models
from django.utils import timezone

# Create your models here.



# Create your College models here.

class College(models.Model):
    college_name = models.CharField(
        max_length=100, unique=False, null=False, default=None)
    college_id = models.CharField(
        max_length=50, unique=True, null=False, default=None)
    username = models.CharField(max_length=30, default="", null=True)
    address = models.CharField(
        max_length=100, unique=False, default=None, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, default=None, blank=True)    
    state = models.CharField(max_length=50, null=True, default=None, blank=True)    
    city = models.CharField(max_length=50, null=True, default=None, blank=True)

    pin = models.CharField(max_length=30, unique=False,
                           default=None, null=True, blank=True)
    admin_name = models.CharField(max_length=50, unique=False, default=None)
    father_name = models.CharField(
        max_length=100, null=True, blank=True, default=None)
    mobile = models.CharField(
        max_length=30, unique=False, null=True, blank=True, default=None)
    email = models.EmailField(
        verbose_name="email", max_length=60, unique=False, null=False, default=None)
    registrationDate = models.DateTimeField(default=timezone.now)
    is_approved = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    active_from = models.DateTimeField(blank=True, null=True, default=None)
    active_upto = models.DateTimeField(blank=True, null=True, default=None)
    test = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.id},{self.college_id}'
    