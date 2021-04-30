"""
URLs | Cannlytics API
Created: 4/21/2021
Updated: 4/25/2021
Description: API URLs to interface with cannabis analytics.
"""

# External imports
from django.urls import include, path
from rest_framework import urlpatterns
from rest_framework.urlpatterns import format_suffix_patterns

# Internal imports
from cannlytics_api import views
from cannlytics_api.auth import auth
from cannlytics_api.inventory import inventory
from cannlytics_api.organizations import organizations

app_name = 'cannlytics_api' # pylint: disable=invalid-name

urlpatterns = [
    path('', views.index, name='index'),
    path('auth', include([
        path('authenticate', auth.authenticate),
        path('login', auth.login),
        path('logout', auth.logout),
    ])),
    # Allow for labs to choose to make their analyses public,
    # so that producers can search for analyses.
    path('analyses', include([
        path('', views.index),
        path('<uuid:analysis_id>/', views.index),
    ])),
    path('analytes', include([
        path('', views.index),
        path('<uuid:analyte_id>', views.index),
    ])),
    path('areas/', include([
        path('', inventory.areas),
        path('<uuid:area_id>/', inventory.areas),
    ])),
    path('clients', include([
        path('', views.index),
        path('<uuid:org_id>', views.index),
        path('<uuid:org_id>/contacts', views.index),
    ])),
    path('inventory', include([
        path('', views.index),
        path('<uuid:inventory_id>', views.index),
    ])),
    path('instruments', include([
        path('', views.index),
        path('<uuid:instruments_id>', views.index),
    ])),
    path('invoices', include([
        path('', views.index),
        path('<uuid:invoice_id>', views.index),
    ])),
    path('users', include([
        path('', auth.users),
        path('<uuid:uid>', auth.users),
        path('<uuid:uid>/settings', auth.users),
    ])),
    path('organizations/', include([
        path('', organizations.organizations),
        path('<org_id>/', organizations.organizations),
        path('<uuid:org_id>/settings/', organizations.organizations),
        # path('join/', organizations.join_organization),
    ])),
    path('samples', include([
        path('', views.index),
        path('<uuid:sample_id>', views.index),
    ])),
    path('results', include([
        path('', views.index),
        path('<uuid:sample_id>', views.index),
    ])),
    path('transfers', include([
        path('', views.index),
        path('<uuid:sample_id>', views.index),
    ])),
    path('regulations', views.regulations),
]

# TODO: Handle 404's

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

    # Make obsolete by querying organizations for type=lab
    # path('/labs/', include([
    #     path('', views.labs),
    #     path('<uuid:org_id>/', views.lab),
    #     path('<uuid:org_id>/analyses/', views.lab_analyses),
    #     path('<uuid:org_id>/logs/', views.lab_logs),
    # ])),
