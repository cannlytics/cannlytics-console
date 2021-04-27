"""
Console Views | Cannlytics
Created: 12/18/2020
Updated: 4/20/2021
"""

# External imports
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic.base import TemplateView

# Internal imports
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

# FIXME: Handle no user more elegantly. Redirect?

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
        uid = self.request.session.get('uid', '')
        context['sidebar'] = layout['sidebar']
        context = get_screen_specific_state(self.kwargs, context)
        context = get_screen_specific_data(self.kwargs, context)
        context = get_user_specific_state(uid, context)
        context = get_user_specific_data(uid, context)
        return context


#-----------------------------------------------------------------------
# Auth
# Optional: Re-write as functional views?
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
# Organizations
#-----------------------------------------------------------------------

class OrganizationView(TemplateView):
    """View used for managing organizations."""

    template_name = f'{BASE}/pages/settings/organization.html'

    def get_context_data(self, **kwargs):
        """ Get the screen context data. """
        context = super().get_context_data(**kwargs)
        organization = self.kwargs.get('name', '')
        context['breadcrumbs'] = [
            {'title': 'Settings', 'url': '/settings'},
            {'title': 'Organizations', 'url': '/settings/organizations'},
            {'title': organization.title(), 'active': True}
        ]
        # context = self.get_screen_material(context)
        return context

    # TODO: Create organization on post


#-----------------------------------------------------------------------
# Error views (Optional: Condense into a single error view?)
#-----------------------------------------------------------------------

def handler404(request, *args, **argv):
    status_code = 404
    template = f'{BASE}/general/error-pages/{status_code}.html'
    response = render_to_response(template, {}, context_instance=RequestContext(request))
    response.status_code = 404
    return response


def handler500(request, *args, **argv):
    status_code = 500
    template = f'{BASE}/general/error-pages/{status_code}.html'
    response = render_to_response(template, {}, context_instance=RequestContext(request))
    response.status_code = status_code
    return response

#-----------------------------------------------------------------------
# Scrap functional view
#-----------------------------------------------------------------------

# def dashboard(request, **kwargs):
#     """Dashboard user interface."""
#     context = {}
#     uid = request.session.get('uid', '')
#     context['sidebar'] = layout['sidebar']
#     context = get_screen_specific_state(kwargs, context)
#     context = get_screen_specific_data(kwargs, context)
#     context = get_user_specific_state(uid, context)
#     template = f'{BASE}/pages/dashboard/dashboard.html'
#     return render(request, template, context)

#-----------------------------------------------------------------------
# Scrap login required class view
#-----------------------------------------------------------------------

# from django.contrib.auth.mixins import LoginRequiredMixin

# class ConsoleView(LoginRequiredMixin, TemplateView):
#     """Main view used for most console pages."""

#     login_url = '/account/sign-in'
#     redirect_field_name = 'redirect_to'


