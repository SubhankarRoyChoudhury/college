from django.urls import path, include
from .views import CustomTokenView, CollegeUserCreateAndGetView,CollegeUserDetailView, getUserDetails
from . import views

urlpatterns = [
    # path("o/", include("oauth2_provider.urls", namespace="oauth2_provider")),
    path("o/token/", CustomTokenView.as_view(), name="token"),
    path('usersDetails/',getUserDetails, name='usersDetails'),
    path('college-user/', CollegeUserCreateAndGetView.as_view(), name='create-college-user'),
    path('college-user/<int:id>/', CollegeUserDetailView.as_view(), name='college-user-detail'),
    # path('college-user-list/', CollegeUserListView.as_view(), name='create-college-user'),
    path('users/', views.user_list, name='user_list'),
    path('users/<int:user_id>/', views.user_detail, name='user_detail'),
    path('users/<int:user_id>/update/', views.update_user, name='update_user'),
]
