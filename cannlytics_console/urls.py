"""
URLs | Cannlytics
Created: 4/18/2020
Resources: https://docs.djangoproject.com/en/3.2/topics/http/urls/
"""

# External imports
from django.urls import include, path

# Internal imports
from cannlytics_console import views

app_name = 'cannlytics_console' # pylint: disable=invalid-name
urlpatterns = [
    path('', views.ConsoleView.as_view(), name='index'),
    path('account/<slug:page>', views.LoginView.as_view(), name='auth'),
    path('api', include('cannlytics_api.urls'), name='api'),
    path('settings/organizations/<slug:name>', views.OrganizationView.as_view()),
    path('<slug:screen>', views.ConsoleView.as_view()),
    path('<slug:screen>/<slug:section>', views.ConsoleView.as_view()),
    path('<slug:screen>/<slug:section>/<slug:unit>', views.ConsoleView.as_view()),
]


    # path('account', include('cannlytics_console.authentication.urls'), name='auth'),
    # path('api/authenticate', authenticate),
    # path('api/login', login),
    # path('api/logout', logout),
    # path('api/organizations', organizations),
    # path('api/organizations/join', join_organization),
    # path('api/users', users),
