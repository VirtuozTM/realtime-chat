# Create your views here.
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import CreateUserView, FriendsListView, UserProfileView

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("user-data/", UserProfileView.as_view(), name="user-profile"),
    path("friends/", FriendsListView.as_view(), name="user-list"),
]
