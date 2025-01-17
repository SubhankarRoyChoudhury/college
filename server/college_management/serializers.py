from rest_framework import serializers
from .models import College


class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'  # Include all fields from the College model
