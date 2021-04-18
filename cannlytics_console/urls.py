from django.urls import include, path

from . import views
from . import api

app_name = "cannlytics_console"
urlpatterns = [
    path("", views.ConsoleView.as_view(), name="index"),
    path("account", include("cannlytics_auth.urls"), name="auth"),
    path('api/authenticate', api.authenticate),
    path('api/login', api.login),
    path('api/logout', api.logout),
    path('api/organizations', api.organizations),
    path('api/organizations/join', api.join_organization),
    path('api/users', api.users),
    path("settings/organizations/<slug:name>", views.OrganizationView.as_view()),
    path("<slug:screen>", views.ConsoleView.as_view()),
    path("<slug:screen>/<slug:section>", views.ConsoleView.as_view()),
    path("<slug:screen>/<slug:section>/<slug:unit>", views.ConsoleView.as_view()),
]
