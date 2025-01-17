from django.shortcuts import render
from rest_framework.views import APIView
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from .models import  College
from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework.permissions import IsAuthenticated
from .serializers import  CollegeUserSerializer


User = get_user_model()


class CollegeUserCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CollegeUserSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the CollegeUser instance and ensure atomic transaction
            try:
                with transaction.atomic():
                    serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)