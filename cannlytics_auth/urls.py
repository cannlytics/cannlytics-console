"""
Authentication URLs | Cannlytics
Created: 12/20/2020
"""
from django.urls import path
from . import views

app_name = "cannlytics_auth"

urlpatterns = [
    path("<slug:page>/", views.LoginView.as_view(), name="index"),
    # reset/<uidb64>/<token>/
]
