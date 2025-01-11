from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import CollegeUser, College

User = get_user_model()

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'  # Include all fields from the College model

# <!-- In Account Serializers Create User into Authentication User Table and also CollegeUser Table -->

class CollegeUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CollegeUser
        fields = ['college', 'name', 'fatherOrHusband', 'aliasName', 'username', 'address', 'country', 'state', 'city', 'pin', 'email', 'mobile', 'image_url', 'attachment_id', 'is_admin', 'is_active', 'is_staff', 'is_owner', 'is_manager', 'is_assistant', 'password']

    def validate_username(self, value):
        # Ensure the username is unique across the User model
        if get_user_model().objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def create(self, validated_data):
        # Extract and pop fields
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
                username=username,
                password=password,
                email=email,
                is_staff=validated_data.get('is_staff', False),
                is_superuser=validated_data.get('is_superuser', False),
            )

        # Ensure the College instance exists
        if not isinstance(college, College):
            college = College.objects.get(id=college.id)

        # Create the CollegeUser instance without the `user` argument
        college_user = CollegeUser.objects.create(
            college=college,  # Add the college reference
            name=validated_data.get('name'),
            fatherOrHusband=validated_data.get('fatherOrHusband'),
            aliasName=validated_data.get('aliasName'),
            username=username,
            email=email,
            address=validated_data.get('address'),
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
            is_assistant=validated_data.get('is_assistant', False),
        )

        return college_user
