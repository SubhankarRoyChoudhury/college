from django.db import models
from django.utils import timezone

# Create your models here.



# Create your College models here.

class College(models.Model):
    name = models.CharField(
        max_length=100, unique=False, null=False, default=None)
    college_id = models.CharField(
        max_length=50, unique=True, null=False, default=None)
    username = models.CharField(max_length=30, default="", blank=True,  null=True)
    address = models.CharField(
        max_length=100, unique=False, default=None, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, default=None, blank=True)    
    state = models.CharField(max_length=50, null=True, default=None, blank=True)    
    city = models.CharField(max_length=50, null=True, default=None, blank=True)

    pin = models.CharField(max_length=30, unique=False,
                           default=None, null=True, blank=True)
    admin_name = models.CharField(max_length=50, unique=False, null=True, blank=True, default=None)
    father_name = models.CharField(
        max_length=100, null=True, blank=True, default=None)
    mobile = models.CharField(
        max_length=30, unique=False, null=True, blank=True, default=None)
    email = models.EmailField(
        verbose_name="email", max_length=60, unique=False, null=True,  blank=True, default=None)
    registrationDate = models.DateTimeField(default=timezone.now)
    is_approved = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=True)
    active_from = models.DateTimeField(blank=True, null=True, default=None)
    active_upto = models.DateTimeField(blank=True, null=True, default=None)
    test = models.BooleanField(default=False)
    created_by = models.CharField(
        max_length=100, null=True, blank=True, default=None)
    created_on = models.DateTimeField(
        blank=True, null=True, default=timezone.now)

    def __str__(self):
        return f'{self.id},{self.college_id}'
    