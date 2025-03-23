from django.urls import path, include
from .views import  CollegeViewSet, CollegeDetailViewByID, CollegeViewIsApprove

urlpatterns = [
    path('colleges/', CollegeViewSet.as_view(), name='college-list-create'),
    path('colleges_is_approve/', CollegeViewIsApprove.as_view(), name='approve-college-list'),
    path('colleges/<int:id>/', CollegeDetailViewByID.as_view(), name='college-detail'),
]
