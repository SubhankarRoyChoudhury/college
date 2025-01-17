from django.shortcuts import render
from rest_framework.views import APIView
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .serializers import  CollegeSerializer

# Create your views here.

class CollegeViewSet(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this view

    def post(self, request, *args, **kwargs):
        # Create College instance from request data using the CollegeSerializer
        serializer = CollegeSerializer(data=request.data)
        if serializer.is_valid():
            # Save the College object
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    