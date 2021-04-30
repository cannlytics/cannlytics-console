"""
URLs | Cannlytics
Created: 4/18/2020
Resources: https://docs.djangoproject.com/en/3.2/topics/http/urls/
"""

# External imports
from django.conf.urls import handler404, handler500
from django.urls import include, path
from django.views.generic import TemplateView
from rest_framework.documentation import include_docs_urls
from rest_framework import routers

# Internal imports
from cannlytics_console import views

# Change URLs to not end in a trailing slash.
# https://stackoverflow.com/questions/46163838/how-can-i-make-a-trailing-slash-optional-on-a-django-rest-framework-simplerouter
# router = routers.SimpleRouter(trailing_slash=False)

app_name = 'cannlytics_console' # pylint: disable=invalid-name
urlpatterns = [
    path('', views.ConsoleView.as_view(), name='index'),
    path('account/<slug:page>', views.LoginView.as_view(), name='auth'),
    path('api', include('cannlytics_api.urls'), name='api'),
    # path('docs', include_docs_urls(title='Cannlytics API'), name='api-docs'),
    # path('swagger-ui', TemplateView.as_view(
    #     template_name='cannlytics_console/pages/general/swagger-ui.html',
    #     extra_context={'schema_url':'openapi-schema'}
    # ), name='swagger-ui'),
    path('settings/organizations/<slug:name>', views.OrganizationView.as_view()),
    path('<slug:screen>', views.ConsoleView.as_view()),
    path('<slug:screen>/<slug:section>', views.ConsoleView.as_view()),
    path('<slug:screen>/<slug:section>/<slug:unit>', views.ConsoleView.as_view()),
]

# Error pages.
handler404 = 'cannlytics_console.views.handler404'
handler500 = 'cannlytics_console.views.handler500'

# Optional: Add 403 and 400 pages
# handler403 = 'cannlytics_console.views.my_custom_permission_denied_view'
# handler400 = 'cannlytics_console.views.my_custom_bad_request_view'

    # path('account', include('cannlytics_console.authentication.urls'), name='auth'),
    # path('api/authenticate', authenticate),
    # path('api/login', login),
    # path('api/logout', logout),
    # path('api/organizations', organizations),
    # path('api/organizations/join', join_organization),
    # path('api/users', users),
