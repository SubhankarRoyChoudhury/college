from django.shortcuts import render
from rest_framework.views import APIView
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from college_management.models import College
from .serializers import  CollegeSerializer
from django.shortcuts import get_object_or_404

# Create your views here.

class CollegeViewSet(APIView):
    # permission_classes = [IsAuthenticated]  # Only authenticated users can access this view
    permission_classes=[AllowAny]

    def post(self, request, *args, **kwargs):
        # Create College instance from request data using the CollegeSerializer
        serializer = CollegeSerializer(data=request.data)
        if serializer.is_valid():
            # Save the College object
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        # Retrieve all College objects
        colleges = College.objects.all().order_by('-id')
        # Serialize the data
        serializer = CollegeSerializer(colleges, many=True)
        # Return the serialized data as a response
        return Response(serializer.data, status=status.HTTP_200_OK)

class CollegeDetailViewByID(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id, *args, **kwargs):
        """Retrieve a specific College by id."""
        try:
            # Retrieve the specific college by id using get_object_or_404 for better error handling
            college = get_object_or_404(College, id=id)
            
            # Serialize the college object
            serializer = CollegeSerializer(college)
            
            # Wrap the result in the response dictionary
            result = serializer.data
            
            # Return the response in the required format
            return Response({'response': result}, status=status.HTTP_200_OK)
        
        except Exception as e:
            # Log the exception
            # logging.getLogger("error_logger").error(repr(e))
            
            # Return a structured error response with status code 500
            response = e.args[0] if e.args else 'An unexpected error occurred.'
            return Response({'error': response}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    def put(self, request, id, *args, **kwargs):
        """Update a specific College by id."""
        try:
            # Retrieve the specific college by id
            college = get_object_or_404(College, id=id)

            # Serialize the data with incoming request
            serializer = CollegeSerializer(college, data=request.data, partial=True)

            if serializer.is_valid():
                # Save the updated data
                serializer.save()

                # Return the updated serialized data
                return Response({'response': serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            # Log the exception (optional)
            # logging.getLogger("error_logger").error(repr(e))
            
            # Return a structured error response with status code 500
            response = e.args[0] if e.args else 'An unexpected error occurred.'
            return Response({'error': response}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
    def delete(self, request, id, *args, **kwargs):
        """Delete a specific College by id."""
        try:
            # Retrieve the specific college by id
            college = get_object_or_404(College, id=id)
            
            # Delete the college
            college.delete()
            
            # Return a success response
            return Response({'message': 'College deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            # Log the exception (optional)
            # logging.getLogger("error_logger").error(repr(e))
            
            # Return a structured error response with status code 500
            response = e.args[0] if e.args else 'An unexpected error occurred.'
            return Response({'error': response}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)