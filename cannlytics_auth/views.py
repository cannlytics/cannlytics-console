"""
Authentication Views | Cannlytics
Created: 12/20/2020
Resources:
    https://firebase.googleblog.com/2020/10/password-sign-in-best-practices.html?utm_source=firebase&utm_medium=email&utm_campaign=newsletter
    https://www.oscaralsing.com/firebase-authentication-in-django/
"""
from django.views.generic.base import TemplateView


class LoginView(TemplateView):

    def get_template_names(self):
        page = self.kwargs.get("page", "login")
        return [f"cannlytics_auth/{page}.html"]

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

