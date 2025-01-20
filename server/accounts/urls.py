from django.urls import path, include
from .views import CustomTokenView, CollegeUserCreateView, getUserDetails

urlpatterns = [
    # path("o/", include("oauth2_provider.urls", namespace="oauth2_provider")),
    path("o/token/", CustomTokenView.as_view(), name="token"),
    path('usersDetails/',getUserDetails, name='usersDetails'),
    path('create-college-user/', CollegeUserCreateView.as_view(), name='create-college-user'),
]
