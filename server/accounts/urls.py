from django.urls import path, include
from .views import  CollegeUserCreateView

urlpatterns = [
    path("o/", include("oauth2_provider.urls", namespace="oauth2_provider")),
    path('create-college-user/', CollegeUserCreateView.as_view(), name='create-college-user'),
]
