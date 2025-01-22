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
import json
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import CollegeUser 

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
    
    



def user_list(request):
    """Return a list of all users."""
    # users = get_all_users()
    users = User.objects.all()
    data = [model_to_dict(user) for user in users]
    return JsonResponse(data, safe=False)

def user_detail(request, user_id):
    """Return details of a specific user."""
    try:
        user = User.objects.get(id=user_id)
        data = model_to_dict(user)
        return JsonResponse(data)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    
    
# THIS CODE USE FOR ONLY UPDATE THE User MODEL START

# @csrf_exempt
# def update_user(request, user_id):
#     """Update details of a specific user."""
#     if request.method != "PUT":
#         return JsonResponse({"error": "Method not allowed"}, status=405)

#     try:
#         user = User.objects.get(id=user_id)
#     except User.DoesNotExist:
#         return JsonResponse({"error": "User not found"}, status=404)

#     try:
#         # Parse the request body and update allowed fields
#         data = json.loads(request.body)
#         allowed_fields = {"username", "first_name", "last_name", "email", "is_staff", "is_active", "is_superuser"}
#         updated_fields = {field: value for field, value in data.items() if field in allowed_fields}
        
#         for field, value in updated_fields.items():
#             setattr(user, field, value)
        
#         user.save()

#         return JsonResponse(model_to_dict(user, fields=allowed_fields), safe=False)
#     except Exception as e:
#         return JsonResponse({"error": f"Failed to update user: {str(e)}"}, status=400)
    
# THIS CODE USE FOR ONLY UPDATE THE User MODEL END
    
# THIS CODE USE FOR UPDATE THE User MODEL AND CollegeUser MODEL AT SAME TIME UPDATE USER MODEL AND COLLEGEUSER MODEL START

@csrf_exempt
def update_user(request, user_id):
    """Update details of a specific user in both User and CollegeUser models."""
    if request.method != "PUT":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        # Fetch the user from the User model
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found in User model"}, status=404)

    try:
        # Fetch the corresponding CollegeUser
        try:
            college_user = CollegeUser.objects.get(username=user.username)
        except CollegeUser.DoesNotExist:
            return JsonResponse({"error": "User not found in CollegeUser model"}, status=404)

        # Parse the request body and update allowed fields
        data = json.loads(request.body)
        user_allowed_fields = {"first_name", "last_name", "email", "is_staff", "is_active", "is_superuser"}
        college_user_allowed_fields = {"is_staff", "is_active", "is_superuser"}

        # Update User fields
        for field, value in data.items():
            if field in user_allowed_fields:
                setattr(user, field, value)

        # Update CollegeUser fields
        for field, value in data.items():
            if field in college_user_allowed_fields:
                setattr(college_user, field, value)

        # Save both models
        user.save()
        college_user.save()

        # Prepare the response with updated data
        updated_user_data = model_to_dict(user, fields=user_allowed_fields)
        updated_college_user_data = model_to_dict(college_user, fields=college_user_allowed_fields)

        return JsonResponse({
            "user": updated_user_data,
            "college_user": updated_college_user_data
        }, safe=False)

    except Exception as e:
        return JsonResponse({"error": f"Failed to update user: {str(e)}"}, status=400)
# THIS CODE USE FOR UPDATE THE User MODEL AND CollegeUser MODEL AT SAME TIME UPDATE USER MODEL AND COLLEGEUSER MODEL END


class CollegeUserCreateAndGetView(APIView):
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
                if 'username' in str(e).lower():  # Check if the error is related to username
                    return Response({'error': 'Username already exists. Please choose a different username.'}, 
                                    status=status.HTTP_400_BAD_REQUEST)
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        """Retrieve all CollegeUsers."""
        college_users = CollegeUser.objects.all()
        serializer = CollegeUserSerializer(college_users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# class CollegeUserListView(APIView):
#     permission_classes=[AllowAny]
#     def get(self, request, *args, **kwargs):
#         """Retrieve all CollegeUsers."""
#         college_users = CollegeUser.objects.all()
#         serializer = CollegeUserSerializer(college_users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
    
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