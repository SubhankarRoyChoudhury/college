from django.urls import path, include
from .views import CollegeUserCreateView, CollegeViewSet

urlpatterns = [
    path("o/", include("oauth2_provider.urls", namespace="oauth2_provider")),
    path('create-college-user/', CollegeUserCreateView.as_view(), name='create-college-user'),
    path('colleges/', CollegeViewSet.as_view(), name='college-list-create'),
]
