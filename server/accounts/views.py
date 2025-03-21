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
from django.utils import timezone

from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR

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


# def user_list(request):
#     """Return a list of all users with detailed information."""
#     users = User.objects.all().values(
#         'id', 'username', 'email', 'first_name', 'last_name',
#         'is_staff', 'is_superuser', 'is_active', 'last_login', 'date_joined'
#     )  # Fetch only required fields
#     return JsonResponse(list(users), safe=False)

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
            try:
                with transaction.atomic():
                    serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                if 'username' in str(e).lower():
                    return Response(
                        {'username': ['Username already exists. Please choose a different username.']},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                return Response({'error': [str(e)]}, status=status.HTTP_400_BAD_REQUEST)
        
        # Return serializer errors in a structured format
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        """Retrieve all CollegeUsers."""
        college_users = CollegeUser.objects.select_related('college').all()  # Optimize query
        serializer = CollegeUserSerializer(college_users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class CollegeUserDetailViewByID(APIView):
    permission_classes=[AllowAny]
    def get(self, request, id, *args, **kwargs):
        """Retrieve a specific CollegeUser by id."""
        try:
            college_user = get_object_or_404(CollegeUser.objects.select_related('college').filter(delist=False), id=id)  # Optimize query with select_related
            serializer = CollegeUserSerializer(college_user)
            result = serializer.data
            # return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'response': result}, status=status.HTTP_200_OK)
        
        except Exception as e:
            # Log the exception
            # logging.getLogger("error_logger").error(repr(e))
            
            # Return a structured error response with status code 500
            response = e.args[0] if e.args else 'An unexpected error occurred.'
            return Response({'error': response}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    def put(self, request, id, *args, **kwargs):
        """Update a specific CollegeUser by id."""
        try:
            # Retrieve the CollegeUser instance
            college_user = get_object_or_404(CollegeUser.objects.select_related('college'), id=id)

            # If the username is the same as the current one, remove it from validation
            if request.data.get('username') == college_user.username:
                request.data.pop('username', None)  # Remove `username` from the data to bypass validation

            # Partially update the CollegeUser instance
            serializer = CollegeUserSerializer(college_user, data=request.data, partial=True)
            
            if serializer.is_valid():
                # Save the CollegeUser updates
                serializer.save()

                # Update the corresponding User model fields
                user_model = get_user_model()
                user = user_model.objects.filter(username=college_user.username).first()
                if user:
                    user.is_staff = request.data.get('is_staff', user.is_staff)
                    user.is_active = request.data.get('is_active', user.is_active)
                    user.is_superuser = request.data.get('is_superuser', user.is_superuser)
                    user.save()

                return Response({'response': serializer.data}, status=status.HTTP_200_OK)

            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            response = e.args[0] if e.args else 'An unexpected error occurred.'
            return Response({'error': response}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    # def put(self, request, id, *args, **kwargs):
    #     """Update a specific CollegeUser by id, including updating the username in the User model."""
    #     try:
    #         # Retrieve the CollegeUser instance
    #         college_user = get_object_or_404(CollegeUser.objects.select_related('college'), id=id)

    #         # Save the old username for reference
    #         old_username = college_user.username

    #         # Partially update the CollegeUser instance
    #         serializer = CollegeUserSerializer(college_user, data=request.data, partial=True)

    #         if serializer.is_valid():
    #             # Save the CollegeUser updates
    #             serializer.save()

    #             # Update the corresponding User model fields
    #             user_model = get_user_model()
    #             user = user_model.objects.filter(username=old_username).first()

    #             if user:
    #                 # Update the username and other fields in the User model
    #                 new_username = request.data.get('username', user.username)
    #                 user.username = new_username
                    
    #                 # Explicitly handle boolean values
    #                 is_staff = request.data.get('is_staff', None)
    #                 is_active = request.data.get('is_active', None)
    #                 is_superuser = request.data.get('is_superuser', None)

    #                 if is_staff is not None:
    #                     user.is_staff = bool(is_staff)
    #                 if is_active is not None:
    #                     user.is_active = bool(is_active)
    #                 if is_superuser is not None:
    #                     user.is_superuser = bool(is_superuser)

    #                 user.save()

    #                 # Ensure the CollegeUser's username reflects the updated username
    #                 college_user.username = new_username
    #                 college_user.save()

    #             return Response({'response': serializer.data}, status=HTTP_200_OK)

    #         return Response({'error': serializer.errors}, status=HTTP_400_BAD_REQUEST)

    #     except Exception as e:
    #         response = e.args[0] if e.args else 'An unexpected error occurred.'
    #         return Response({'error': response}, status=HTTP_500_INTERNAL_SERVER_ERROR)

# class CollegeUserListView(APIView):
#     permission_classes=[AllowAny]
#     def get(self, request, *args, **kwargs):
#         """Retrieve all CollegeUsers."""
#         college_users = CollegeUser.objects.all()
#         serializer = CollegeUserSerializer(college_users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)


class CollegeUserDelistView(APIView):
    """
    API to delist (soft delete) a CollegeUser.
    """
    permission_classes = [AllowAny]  # Change this if you want to restrict access

    def put(self, request, id, *args, **kwargs):
        """Mark a CollegeUser as delisted."""
        try:
            # Retrieve the CollegeUser instance
            college_user = get_object_or_404(CollegeUser, id=id)

            # If already delisted, return a response
            if college_user.delist:
                return Response({'message': 'User is already delisted.'}, status=status.HTTP_400_BAD_REQUEST)

            # Mark the user as delisted
            college_user.delist = True
            college_user.delisted_by = request.user.username if request.user.is_authenticated else "system"
            college_user.delisted_on = timezone.now()
            college_user.is_active = False  # Optionally deactivate the CollegeUser
            college_user.save()

            # Update the corresponding authentication User model
            user_model = get_user_model()
            user = user_model.objects.filter(username=college_user.username).first()
            if user:
                user.is_active = False  # Disable login for delisted users
                user.save()

            return Response({'message': 'User has been successfully delisted.'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
         
    
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