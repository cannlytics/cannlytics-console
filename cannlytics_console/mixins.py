"""
mixins.py | Cannlytics Console
Created: 2/19/2021
"""
from cannlytics.firebase import get_document, get_collection
from django.views.generic.base import ContextMixin
from . import state


APP = "cannlytics_console"


class BaseMixin(ContextMixin):

    def get_screen_data(self, context):
        """Get all screen-specific data from Firestore."""
        screen = self.kwargs.get("screen", "dashboard")
        section = self.kwargs.get("section", "")
        if section:
            data = state.data.get(section)
        else:
            data = state.data.get(screen)
        if data is None:
            return context
        documents = data.get("documents")
        collections = data.get("collections")
        if documents:
            for item in documents:
                context[item["name"]] = get_document(item["ref"])
        if collections:
            for item in collections:
                context[item["name"]] = get_collection(
                    item["ref"],
                    limit=item.get("limit"),
                    order_by=item.get("order_by"),
                    desc=item.get("desc"),
                    filters=item.get("filters"),
                )
        return context

    def get_screen_state(self, context):
        """Get screen-specific material."""
        screen = self.kwargs.get("screen", "dashboard")
        section = self.kwargs.get("section", "")
        unit = self.kwargs.get("unit", "")
        parts = [screen, section, unit]
        for part in parts:
            material = state.material.get(part)
            if material:
                key = part.replace('-', '_')
                context[key] = material
        return context
    
    # def get_user_ui(self, context):
    #     """Get the user-specific UI."""
    #     uid = self.request.session.get("uid", "")
    #     print('User:', uid)
    #         # 
    #     # possible_claims = ["admin", "qa"]
    #     # for claim in possible_claims:
    #     #     if user.get(claim):
    #     #         context[claim] = state.restricted[claim]
    #     # context["user"] = user
    #     # return context
    #     return context

    def get_context_data(self, **kwargs):
        """Get context that is used on all pages."""
        context = super(BaseMixin, self).get_context_data(**kwargs)
        context["sidebar"] = state.layout["sidebar"]
        context = self.get_screen_state(context)
        context = self.get_screen_data(context)
        # context = self.get_user_ui(context)
        return context

