"""
Console Views | Cannlytics
Created: 12/18/2020
Updated: 5/10/2021
"""

# External imports
from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse

# Internal imports
from cannlytics_api.auth import auth
from cannlytics_console.state import layout
from cannlytics_console.utils import (
    get_screen_specific_data,
    get_screen_specific_state,
    get_user_specific_state,
    get_user_specific_data,
)

BASE = 'cannlytics_console'

#-----------------------------------------------------------------------
# Main view
#-----------------------------------------------------------------------

class ConsoleView(TemplateView):
    """Main view used for most console pages."""

    login_url = '/account/sign-in'
    redirect_field_name = 'redirect_to'

    def get_template_names(self):
        """Get the screen's template based on the URL."""
        screen = self.kwargs.get('screen', 'dashboard')
        section = self.kwargs.get('section', screen)
        unit = self.kwargs.get('unit', section)
        return [
            f'{BASE}/pages/{screen}/{unit}.html',
            f'{BASE}/pages/{screen}/{section}.html',
            f'{BASE}/pages/{screen}/{screen}-{section}.html',
            f'{BASE}/pages/{screen}/{screen}.html',
            f'{BASE}/pages/general/{screen}/{screen}-{section}.html',
            f'{BASE}/pages/general/{screen}/{section}.html',
        ]

    def get_context_data(self, **kwargs):
        """Get context that is used on all pages."""
        context = super().get_context_data(**kwargs)
        user_claims = auth.verify_session(self.request)
        user = {
            'email_verified': user_claims['email_verified'],
            'display_name': user_claims['name'],
            'photo_url': user_claims['picture'],
            'uid': user_claims['uid'],
            'email': user_claims['email'],
        }
        context.update({'user': user})
        print('\nUser session:', context['user'], '\n')
        context['sidebar'] = layout['sidebar']
        context = get_screen_specific_state(self.kwargs, context)
        context = get_screen_specific_data(self.kwargs, context)
        # context = get_user_specific_state(session, context)
        # context = get_user_specific_data(uid, context)
        return context


#-----------------------------------------------------------------------
# Auth
# Optional: Create user / sign-in users server-side.
# https://www.geeksforgeeks.org/django-authentication-project-with-firebase/
#-----------------------------------------------------------------------

class LoginView(TemplateView):
    """Dynamic login view for authentication forms."""

    def get_template_names(self):
        page = self.kwargs.get('page', 'login')
        return [f'{BASE}/pages/account/{page}.html']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

#-----------------------------------------------------------------------
# Error views (Optional: Add 403 and 400 views)
#-----------------------------------------------------------------------

def handler404(request, *args, **argv): #pylint: disable=unused-argument
    """Handle missing pages."""
    status_code = 404
    template = f'{BASE}/pages/general/error-pages/{status_code}.html'
    return render(request, template, {}, status=status_code)


def handler500(request, *args, **argv): #pylint: disable=unused-argument
    """Handle internal errors."""
    status_code = 500
    template = f'{BASE}/pages/general/error-pages/{status_code}.html'
    return render(request, template, {}, status=status_code)


def no_content(request, *args, **argv): #pylint: disable=unused-argument
    """Handle empty response."""
    return HttpResponse(status=204)


#-----------------------------------------------------------------------
# Organizations TODO: Making obsolete?
#-----------------------------------------------------------------------

# class OrganizationView(TemplateView):
#     """View used for managing organizations."""

#     template_name = f'{BASE}/pages/settings/organization.html'

#     def get_context_data(self, **kwargs):
#         """ Get the screen context data. """
#         context = super().get_context_data(**kwargs)
#         organization = self.kwargs.get('name', '')
#         context['breadcrumbs'] = [
#             {'title': 'Settings', 'url': '/settings'},
#             {'title': 'Organizations', 'url': '/settings/organizations'},
#             {'title': organization.title(), 'active': True}
#         ]
#         # context = self.get_screen_material(context)
#         return context

#     # Create organization on post.
