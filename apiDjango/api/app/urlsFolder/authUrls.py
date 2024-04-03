from django.urls import include, path
from app.views.auth import signIn

urlpatterns = [
    path('auth/',signIn.SignIn.as_view())
]