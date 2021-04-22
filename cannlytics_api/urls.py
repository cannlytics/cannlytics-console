"""
URLs | Cannlytics API
Created: 4/21/2021

API URLs to interface with cannabis analytics.
"""

# External imports
from django.urls import include, path
from rest_framework import urlpatterns
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers

# Internal imports
from cannlytics_api import views
from cannlytics_api.auth import auth

# TODO: Handle 404's

# TODO: Build out additional endpoints
# /regulations
# /instruments
# /analytes
# /instruments
# /lab_results

# Change URLs to not end in a trailing slash.
# https://stackoverflow.com/questions/46163838/how-can-i-make-a-trailing-slash-optional-on-a-django-rest-framework-simplerouter
router = routers.SimpleRouter(trailing_slash=False)

app_name = 'cannlytics_api'
urlpatterns = [
    path('', views.index, name='index'),
    path('authenticate', auth.authenticate),
    path('login', auth.login),
    path('logout', auth.logout),
    path('labs/', include([
        path('', views.labs),
        path('<uuid:org_id>/', views.lab),
        path('<uuid:org_id>/analyses/', views.lab_analyses),
        path('<uuid:org_id>/logs/', views.lab_logs),
    ])),
    path('organizations/', include([
        path('', views.organizations),
        path('<uuid:org_id>/', views.organizations),
        path('join/', views.join_organization),
    ])),
    path('users/', include([
        path('', views.users),
        path('<uuid:uid>/', views.users),
    ])),
]

# Add optional format suffixes to the URLs,
# so users can explicitely specify a formatm e.g. .json.
# https://www.django-rest-framework.org/tutorial/2-requests-and-responses/
urlpatterns = format_suffix_patterns(urlpatterns)


#-----------------------------------------------------------------------
# Draft endpoints
#-----------------------------------------------------------------------

#     # Optional: Find a way to generalize
#     # path('v1/<slug:endpoint>/', views.get_labs, name='endpoint'),

#     # Functional
#     path('scholars/', cannlypedia.scholars),
# ]
