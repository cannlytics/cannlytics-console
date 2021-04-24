"""
Console Views | Cannlytics
Created: 12/18/2020
Updated: 4/20/2021
"""

# External imports
from django.shortcuts import render
from django.views.generic.base import TemplateView

# Internal imports
from cannlytics_console.state import layout
from cannlytics_console.utils import (
    get_screen_specific_data,
    get_screen_specific_state,
    get_user_specific_state,
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
        context['sidebar'] = layout['sidebar']
        context = get_screen_specific_state(self.kwargs, context)
        context = get_screen_specific_data(self.kwargs, context)
        context = get_user_specific_state(self.request, context)
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

# def signIn(request):
#     return render(request,"Login.html")
# def home(request):
#     return render(request,"Home.html")
  
# def postsignIn(request):
#     email=request.POST.get('email')
#     pasw=request.POST.get('pass')
#     try:
#         # if there is no error then signin the user with given email and password
#         user=authe.sign_in_with_email_and_password(email,pasw)
#     except:
#         message="Invalid Credentials!!Please ChecK your Data"
#         return render(request,"Login.html",{"message":message})
#     session_id=user['idToken']
#     request.session['uid']=str(session_id)
#     return render(request,"Home.html",{"email":email})
  
# def logout(request):
#     try:
#         del request.session['uid']
#     except:
#         pass
#     return render(request,"Login.html")
  
# def signUp(request):
#     return render(request,"Registration.html")
  
# def postsignUp(request):
#      email = request.POST.get('email')
#      passs = request.POST.get('pass')
#      name = request.POST.get('name')
#      try:
#         # creating a user with the given email and password
#         user=authe.create_user_with_email_and_password(email,passs)
#         uid = user['localId']
#         idtoken = request.session['uid']
#         print(uid)
#      except:
#         return render(request, "Registration.html")
#      return render(request,"Login.html")


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
