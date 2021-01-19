"""
Console Views | Cannlytics
Created: 12/18/2020
"""
from django.contrib.auth.mixins import LoginRequiredMixin
from django.template.base import Template
from django.views.generic.base import ContextMixin, TemplateView
from . import state # Optional: Get from Firestore?

BASE = "cannlytics_console"

class BaseMixin(ContextMixin):

    def get_screen_material(self, context):
        """ Get screen-specific text. """
        parts = ["screen", "section", "unit"]
        for part in parts:
            key = self.kwargs.get(part, "")
            context[part] = key
            material = state.material.get(key)
            if material is not None:
                context[key] = material
        return context

    def get_context_data(self, **kwargs):
        """ Get context that is used on all pages. """
        context = super(BaseMixin, self).get_context_data(**kwargs)
        context["navbar"] = state.layout["navbar"]
        context["sidebar"] = state.layout["sidebar"]
        context = self.get_screen_material(context)
        return context


class ConsoleView(BaseMixin, TemplateView):

    def get_template_names(self):
        """ Get the screen template. """
        screen = self.kwargs.get("screen", "dashboard")
        section = self.kwargs.get("section", "")
        unit = self.kwargs.get("unit", "")
        if unit:
            return [f"{BASE}/screens/{screen}/{unit}.html"]
        elif section:
            return [f"{BASE}/screens/{screen}/{section}.html"]
        else:
            return[f"{BASE}/screens/{screen}/{screen}.html"]

    def get_context_data(self, **kwargs):
        """ Get the screen context data. """
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
        context = self.get_screen_material(context)
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