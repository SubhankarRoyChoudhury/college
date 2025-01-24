from django.urls import path, include
from .views import  CollegeViewSet, CollegeDetailViewByID

urlpatterns = [
    path('colleges/', CollegeViewSet.as_view(), name='college-list-create'),
    path('colleges/<int:id>/', CollegeDetailViewByID.as_view(), name='college-detail'),
]
