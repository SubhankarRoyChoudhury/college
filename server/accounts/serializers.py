from django.contrib.auth import get_user_model
from rest_framework import serializers
from college_management.models import College
from django.contrib.auth.models import AbstractUser
from django.db import models

from .models import CollegeUser

User = get_user_model()

# <!-- In Account Serializers Create User into Authentication User Table and also CollegeUser Table -->

# class CustomUser(AbstractUser):
#     is_admin = models.BooleanField(default=False)
    
class CollegeUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CollegeUser
        fields = ['college', 'first_name', 'last_name', 'fatherOrHusband', 'aliasName', 'username', 'gender', 'address', 'department', 'country', 'state', 'city', 'pin', 'email', 'mobile', 'image_url', 'attachment_id', 'is_admin', 'is_superuser', 'is_active', 'is_staff', 'is_owner', 'is_manager', 'is_assistant', 'password']

    def validate_username(self, value):
        # Ensure the username is unique across the User model
        if get_user_model().objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def create(self, validated_data):
        # Extract and pop fields
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')
        college = validated_data.pop('college')

        # Check if the User already exists
        user_model = get_user_model()
        user = user_model.objects.filter(username=username).first()

        if not user:
            # Create the User instance
            user = user_model.objects.create_user(
                first_name=first_name,
                last_name=last_name,
                username=username,
                password=password,
                email=email,
                is_staff=validated_data.get('is_staff', False),
                is_superuser=validated_data.get('is_superuser', False),
                is_active=validated_data.get('is_active', False),
            )
            # user.is_admin = validated_data.get('is_admin', False)
            # user.save()

        # Ensure the College instance exists
        if not isinstance(college, College):
            college = College.objects.get(id=college.id)

        # Create the CollegeUser instance without the `user` argument
        college_user = CollegeUser.objects.create(
            college=college,  # Add the college reference
            first_name=first_name,
            last_name=last_name,
            fatherOrHusband=validated_data.get('fatherOrHusband'),
            aliasName=validated_data.get('aliasName'),
            username=username,
            email=email,
            gender=validated_data.get('gender'),
            address=validated_data.get('address'),
            pin=validated_data.get('pin'),
            department=validated_data.get('department'),
            country=validated_data.get('country'),
            state=validated_data.get('state'),
            city=validated_data.get('city'),
            mobile=validated_data.get('mobile'),
            image_url=validated_data.get('image_url'),
            attachment_id=validated_data.get('attachment_id'),
            is_admin=validated_data.get('is_admin', False),
            is_active=validated_data.get('is_active', False),
            is_staff=validated_data.get('is_staff', False),
            is_owner=validated_data.get('is_owner', False),
            is_manager=validated_data.get('is_manager', False),
            is_superuser=validated_data.get('is_superuser', False),
            is_assistant=validated_data.get('is_assistant', False),
        )

        return college_user
