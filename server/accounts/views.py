from django.shortcuts import render
from rest_framework.views import APIView
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from .models import  College
from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import  CollegeUserSerializer
from .models import CollegeUser
from oauth2_provider.views import TokenView
from django.http import JsonResponse
from django.contrib.auth.models import User
import json
# User = get_user_model()


class CustomTokenView(TokenView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        # Check if the response is successful
        if response.status_code == 200:
            # Parse the response content as JSON
            token_data = json.loads(response.content)
            
            # Retrieve the user object
            username = request.POST.get('username')
            if username:
                try:
                    user = User.objects.get(username=username)
                    token_data['is_superuser'] = user.is_superuser  # Add is_superuser to the response
                except User.DoesNotExist:
                    token_data['is_superuser'] = False  # Default to False if the user does not exist
            
            # Return the modified response
            return JsonResponse(token_data, status=response.status_code)

        return response

class CollegeUserCreateView(APIView):
    permission_classes=[AllowAny]
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
    
    
@api_view(['GET'])
def getUserDetails(request):
    try:
        username = request.GET.get('username')
        if not username:
            return Response(
                {"error": "Username parameter is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Query the CustomUser model
        user = CollegeUser.objects.filter(username=username).first()
        if not user:
            return Response(
                {"error": "User not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Serialize the user data
        serialized_user = CollegeUserSerializer(user).data
        return Response(
            {"response": serialized_user},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        print("Error:", e)
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )