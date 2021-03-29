"""
Console Views | Cannlytics
Created: 12/18/2020
"""
from django.views.generic.base import TemplateView
from .mixins import BaseMixin

BASE = "cannlytics_console"


class ConsoleView(BaseMixin, TemplateView):

    def get_template_names(self):
        """Get the screen's template based on the URL."""
        screen = self.kwargs.get("screen", "dashboard")
        section = self.kwargs.get("section", screen)
        unit = self.kwargs.get("unit", section)
        return [
            f"{BASE}/screens/{screen}/{unit}.html",
            f"{BASE}/screens/{screen}/{section}.html",
            f"{BASE}/screens/{screen}/{screen}.html",
            f"{BASE}/screens/general/{screen}/{screen}-{section}.html",
            f"{BASE}/screens/general/{screen}/{section}.html",
        ]

    def get_context_data(self, **kwargs):
        """Get the screen context data."""
        context = super().get_context_data(**kwargs)
        return context



class OrganizationView(BaseMixin, TemplateView):

    template_name = f"{BASE}/screens/settings/organization.html"

    def get_context_data(self, **kwargs):
        """ Get the screen context data. """
        context = super().get_context_data(**kwargs)
        organization = self.kwargs.get("name", "")
        context["breadcrumbs"] = [
            {"title": "Settings", "url": "/settings"},
            {"title": "Organizations", "url": "/settings/organizations"},
            {"title": organization.title(), "active": True}
        ]
        # context = self.get_screen_material(context)
        return context
    
    # TODO: Create organization on post

    # def get_user_material(self, context):
    #     """ FIXME: Get user-specific fields based on custom claims. """
    #     # TODO: Get special fields on the client side.
    #     # user = self.request.session.get("user", {})
    #     # possible_claims = ["admin", "qa"]
    #     # for claim in possible_claims:
    #     #     if user.get(claim):
    #     #         context[claim] = state.restricted[claim]
    #     # context["user"] = user
    #     # return context

