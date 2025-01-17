from django.urls import path, include
from .views import  CollegeViewSet

urlpatterns = [
    path('colleges/', CollegeViewSet.as_view(), name='college-list-create'),
]
