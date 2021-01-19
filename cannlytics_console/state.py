"""
Cannlytics Website | State Variables

Author: Keegan Skeate
Company: Cannlytics
Created: 10/15/2020

TODO: Turn into models and save in database.
"""


layout = {
    "navbar": {
        "default_logo_url": "https://firebasestorage.googleapis.com/v0/b/cannlytics.appspot.com/o/public%2Fimages%2Flogos%2Fcannlytics_calyx_detailed.svg?alt=media&token=108fea9c-29a8-40ba-aced-65aef39611e9",
    },
    "sidebar": {
        "index": [
            {
                "title": "Dashboard",
                "url": "/",
                "icon": "home",
                "slug": "dashboard",
            },
            {
                "title": "Analysis",
                "url": "/analysis",
                "icon": "clipboard",
                "slug": "analysis",
            },
            {
                "title": "Clients",
                "url": "/clients/records",
                "icon": "users",
                "slug": "clients",
            },
            {
                "title": "Intake",
                "url": "/intake",
                "icon": "log-in",
                "slug": "intake",
            },
            {
                "title": "Logistics",
                "url": "/logistics/calendar",
                "icon": "map",
                "slug": "logistics",
            },
            
            {
                "title": "Settings",
                "url": "/settings",
                "icon": "settings",
                "slug": "settings",
            },
            {
                "title": "Help",
                "url": "/help",
                "icon": "help-circle",
                "slug": "help",
            },
        ],
    },
}


material = {
    # Analysis
    "analyses": {
        "breadcrumbs": [
            {"title": "Analysis", "url": "/analysis"},
            {"title": "Analyses", "active": True},
        ],
        "fields": [
            {"type": "text", "key": "name", "title": "Name"},
            {"type": "text", "key": "instrument", "title": "Instrument"},
            {"type": "text", "key": "analytes", "title": "Analytes"},
        ],
        "options": [
            # {"title": "Change your password", "url": "/account/password-reset/"},
            # {"title": "Set your pin", "url": "/settings/account/pin"},
            # {"title": "Set your signature", "url": "/settings/account/signature"},
        ],
    },
    "instruments": {
        "breadcrumbs": [
            {"title": "Analysis", "url": "/analysis"},
            {"title": "Instruments", "active": True},
        ],
        "fields": [
            {"type": "text", "key": "name", "title": "Name"},
            {"type": "text", "key": "analyes", "title": "Analyses"},
            {"type": "text", "key": "data_path", "title": "Data path"},
        ],
        "options": [
            # {"title": "Change your password", "url": "/account/password-reset/"},
            # {"title": "Set your pin", "url": "/settings/account/pin"},
            # {"title": "Set your signature", "url": "/settings/account/signature"},
        ],
    },
    # Settings
    "account": {
        "breadcrumbs": [
            {"title": "Settings", "url": "settings"},
            {"title": "Account", "active": True},
        ],
        "fields": [
            {"type": "email", "key": "email", "title": "Email"},
            {"type": "text", "key": "name", "title": "Name"},
            {"type": "text", "key": "twitter", "title": "Twitter", "group": "@"},
            {"type": "text", "key": "linkedin", "title": "LinkedIn"},
            {"type": "text", "key": "position", "title": "Position"},
            {"type": "text", "key": "location", "title": "Location"},
        ],
        "options": [
            {"title": "Change your password", "url": "/account/password-reset/"},
            {"title": "Set your pin", "url": "/settings/account/pin"},
            {"title": "Set your signature", "url": "/settings/account/signature"},
        ],
    },
    "organizations": {
        "breadcrumbs": [
            {"title": "Settings", "url": "settings"},
            {"title": "Organizations", "active": True}
        ],
        "placeholder": {
            "action": "Start an organization",
            "height": "200px",
            "image": "cannlytics_console/images/illustrations/chemistry_scientist.svg",
            "title": "Create or join an organization",
            "message": "Add team members to your organization or join an organization to begin collaborating.",
            "url": "./organizations/new",
        },
        "fields": [
            {"type": "email", "key": "email", "title": "Email"},
            {"type": "text", "key": "name", "title": "Name"},
            {"type": "text", "key": "twitter", "title": "Twitter", "group": "@"},
            {"type": "text", "key": "linkedin", "title": "LinkedIn"},
            {"type": "text", "key": "location", "title": "Location"},
        ],
    },
    "pin": {
        "breadcrumbs": [
            {"title": "Settings", "url": "/settings"},
            {"title": "Account", "url": "/settings/account"},
            {"title": "Pin", "active": True}
        ],
    },
    "signature": {
        "breadcrumbs": [
            {"title": "Settings", "url": "/settings"},
            {"title": "Account", "url": "/settings/account"},
            {"title": "Signature", "active": True}
        ],
    },
    # "account": {
    #     "breadcrumbs": [
    #         {"title": "Settings", "url": "settings"},
    #         {"title": "Account", "active": True},
    #     ],
        
    # },
    "templates": {
        "breadcrumbs": [
            {"title": "Intake", "url": "intake"},
            {"title": "Templates", "active": True}
        ],
        # "placeholder": {
        #     "action": "Start an organization",
        #     "height": "200px",
        #     "image": "cannlytics_console/images/illustrations/chemistry_scientist.svg",
        #     "title": "Create or join an organization",
        #     "message": "Add team members to your organization or join an organization to begin collaborating.",
        #     "url": "settings/organizations/new",
        # },
    },
    "calendar": {
        "placeholder": {
            "action": "Schedule your first transfer",
            "height": "200px",
            "image": "cannlytics_console/images/illustrations/chemistry_scientist.svg",
            "title": "Awaiting your first transfer",
            "message": "Once you begin receiving transfers, your pickups and sample dropoffs will appear here.",
            "url": "settings/organizations/new",
        },
    },
    "logistics": {
        "tabs": [
            {
                "name": "Calendar",
                "section": "calendar",
                "url": "/logistics/calendar",
            },
            {
                "name": "Logs",
                "section": "logs",
                "url": "/logistics/logs",
            },
            {
                "name": "Analytics",
                "section": "analytics",
                "url": "/logistics/analytics",
            },
            {
                "name": "Map",
                "section": "map",
                "url": "/logistics/map",
            },
        ],
        "placeholder": {
            "action": "Begin analysis for analytics",
            "height": "200px",
            "image": "cannlytics_console/images/illustrations/chemistry_scientist.svg",
            "title": "Start your first analysis",
            "message": "Begin conducting analyses to unlock your analytics.",
            "url": "settings/organizations/new",
        },
    },
    # Clients
    "records": {
        "placeholder": {
            "action": "Add a client",
            "height": "200px",
            "image": "cannlytics_console/images/illustrations/chemistry_scientist.svg",
            "title": "Add your first client",
            "message": "Add a client to begin providing analyses.",
            "url": "records/new",
        },
        "client": {
            "breadcrumbs": [
                {"title": "Clients", "url": "/records"},
                {"title": "Client", "active": True},
            ],
            "fields": [
                {"type": "email", "key": "email", "title": "Email"},
                {"type": "text", "key": "name", "title": "Name"},
                {"type": "text", "key": "twitter", "title": "Twitter", "group": "@"},
                {"type": "text", "key": "linkedin", "title": "LinkedIn"},
                {"type": "text", "key": "position", "title": "Position"},
                {"type": "text", "key": "location", "title": "Location"},
            ],
            "options": [
                # {"title": "Change your password", "url": "/account/password-reset/"},
                # {"title": "Set your pin", "url": "/settings/account/pin"},
                # {"title": "Set your signature", "url": "/settings/account/signature"},
            ],
        },
    },
}



# TODO: Get from Firestore client-side.
# restricted = {
#     "admin": {
#         "admin_index": [
#             {
#                 "title": "Files",
#                 "url": "/files",
#                 "icon": "server",
#                 "slug": "files",
#             },
#             {
#                 "title": "Invoicing",
#                 "url": "/invoicing",
#                 "icon": "credit-card",
#                 "slug": "invoicing",
#             },
#             {
#                 "title": "Security",
#                 "url": "/security",
#                 "icon": "shield",
#                 "slug": "security",
#             },
#         ],
#     },
#     "qa": {
#         "qa_index": [
#             {
#                 "title": "Inventory",
#                 "url": "/inventory",
#                 "icon": "briefcase",
#                 "slug": "inventory",
#             },
#             {
#                 "title": "Stats",
#                 "url": "/stats",
#                 "icon": "trending-up",
#                 "slug": "stats",
#             },
#             {
#                 "title": "Traceability",
#                 "url": "/traceability",
#                 "icon": "share-2",
#                 "slug": "traceability",
#             },
#         ],
#     },
# }

# Unused

DEFAULT_USER = {
    "display_name": "Keegan Skeate",
    "email": "keeganskeate@gmail.com",
    "phone": "828 395-3954",
    "photo_url": "https://avatars1.githubusercontent.com/u/19616734?s=460&u=9f458e2f71bd1d95c2e4f070d23820ffa3bde1cb&v=4",
    "position": "Software Developer",
    "website": "https://github.com/keeganskeate",
    "location": "USA",
    "organization": "Cannlytics",
    "organizations": ["Cannlytics"],
    "org_photo_url": "https://firebasestorage.googleapis.com/v0/b/cannlytics.appspot.com/o/public%2Fimages%2Flogos%2Fcannlytics_calyx_detailed.svg?alt=media&token=108fea9c-29a8-40ba-aced-65aef39611e9",
    "org_id": "1",
}

DATA_INDEX = {
    "dashboard": [
        {
            "collection": "team",
            "name": "team",
        }
    ]
}