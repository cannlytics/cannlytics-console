"""
State Variables | Cannlytics Console

Author: Keegan Skeate
Company: Cannlytics
Created: 10/15/2020

Relatively static state variables for extra context on each page/screen.
The idea is to separate the material from the templates,
with the hope of better-maintained code.

Optional: Turn into models and save in database.
"""

data = {}

docs = {}

material = {
    "dashboard": {
        "cards": [
            {
                "path": "analyses",
                "title": "Analyses",
                "description": "Manage analyses.",
                "image_path": "cannlytics_console/images/illustrations/chemistry_scientist.svg",
            },
            # Analyses *Lab*
            # Areas (Facilities | Locations)
            # Clients
            # Batches
            # Samples
            # Lab Results
            # Staff
            # Transfers (Transfers | Transfer Templates)
            # Inventory (Items | Packages)
            # Intruments *Lab*
            # Invoices
            # Settings
            # Stats
            # Traceability (logs)
            # Plants, Harvests *Cultivator*
            # Sales (Transactions | Receipts) *Cultivator* *Processor* *Retailer*
        ],
        "welcome_message": {
            "title": "Welcome to your laboratory platform 🚀",
            "message": "Get started with lab testing or analyzing your lab results.",
        },
        "organization_choices": [
            {
                "action": "Get started",
                "title": "For Labs",
                "description": "Get started with lab work, manage your lab data, and issue your certificates. Start or join a lab.",
                "type": "lab",
            },
            # {
            #     "action": "Begin now",
            #     "title": "For Producers / Processors",
            #     "description": "Start managing your lab results now. Start or join aa a producer/processor to begin.",
            #     "type": "producer",
            # },
            # {
            #     "action": "Explore for free",
            #     "title": "For Retailers",
            #     "description": "Access lab data for your products quickly and easily. Begin today.",
            #     "type": "retailer",
            # },
            # {
            #     "action": "Learn more",
            #     "title": "For Consumers",
            #     "description": "Track your consumption. Log purchases, see your usage stats, and get lab data.",
            #     "type": "consumer",
            # },
        ],
    },
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
        "options": [],
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
        "options": [],
    },
    "account": {
        "breadcrumbs": [
            {"title": "Settings", "url": "settings"},
            {"title": "Account", "active": True},
        ],
        "fields": [
            {"type": "email", "key": "email", "title": "Email"},
            {"type": "text", "key": "name", "title": "Name"},
            {"type": "text", "key": "position", "title": "Position"},
            {"type": "text", "key": "location", "title": "Location"},
            {"type": "text", "key": "linkedin", "title": "LinkedIn"},
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
            {"title": "Organizations", "active": True},
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
            {"type": "text", "key": "organization", "title": "Organization"},
            {"type": "text", "key": "trade_name", "title": "Trade Name"},
            {"type": "text", "key": "website", "title": "Website"},
            {"type": "text", "key": "phone", "title": "Phone"},
            {"type": "email", "key": "email", "title": "Email"},
            {"type": "text", "key": "linkedin", "title": "LinkedIn"},
            # {"type": "text", "key": "location", "title": "Location"},
        ],
    },
    "pin": {
        "breadcrumbs": [
            {"title": "Settings", "url": "/settings"},
            {"title": "Account", "url": "/settings/account"},
            {"title": "Pin", "active": True},
        ],
    },
    "signature": {
        "breadcrumbs": [
            {"title": "Settings", "url": "/settings"},
            {"title": "Account", "url": "/settings/account"},
            {"title": "Signature", "active": True},
        ],
    },
    "templates": {
        "breadcrumbs": [
            {"title": "Intake", "url": "intake"},
            {"title": "Templates", "active": True},
        ],
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
            {"name": "Calendar", "section": "calendar", "url": "/logistics/calendar"},
            {"name": "Logs", "section": "logs", "url": "/logistics/logs"},
            {
                "name": "Analytics",
                "section": "analytics",
                "url": "/logistics/analytics",
            },
            {"name": "Map", "section": "map", "url": "/logistics/map"},
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
                {"type": "text", "key": "linkedin", "title": "LinkedIn"},
                {"type": "text", "key": "position", "title": "Position"},
                {"type": "text", "key": "location", "title": "Location"},
            ],
            "options": [],
        },
    },
}


layout = {
    "sidebar": {
        "lab_index": [
            {"title": "Dashboard", "url": "/", "icon": "home", "slug": ""},
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
            {"title": "Intake", "url": "/intake", "icon": "log-in", "slug": "intake"},
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
            {"title": "Help", "url": "/help", "icon": "help-circle", "slug": "help"},
        ],
        "producer_index": [
            {"title": "Dashboard", "slug": "dashboard", "icon": "home", "url": "/"},
            {
                "title": "Purchases",
                "url": "/purchases",
                "icon": "shoping-bag",
                "slug": "purchases",
            },
            {"title": "Stats", "url": "/stats", "icon": "bar-chart-2", "slug": "stats"},
            {
                "title": "Lab Results",
                "url": "/lab-results",
                "icon": "globe",
                "slug": "lab-results",
            },
            {
                "title": "Settings",
                "url": "/settings",
                "icon": "settings",
                "slug": "settings",
            },
            {"title": "Help", "url": "/help", "icon": "help-circle", "slug": "help"},
        ],
        "retailer_index": [
            {"title": "Dashboard", "url": "/", "icon": "home", "slug": "dashboard"},
            {
                "title": "Purchases",
                "url": "/purchases",
                "icon": "shoping-bag",
                "slug": "purchases",
            },
            {"title": "Stats", "url": "/stats", "icon": "bar-chart-2", "slug": "stats"},
            {
                "title": "Lab Results",
                "url": "/lab-results",
                "icon": "globe",
                "slug": "lab-results",
            },
            {
                "title": "Settings",
                "url": "/settings",
                "icon": "settings",
                "slug": "settings",
            },
            {"title": "Help", "url": "/help", "icon": "help-circle", "slug": "help"},
        ],
        "consumer_index": [
            {"title": "Dashboard", "url": "/", "icon": "home", "slug": "dashboard"},
            {
                "title": "Purchases",
                "url": "/purchases",
                "icon": "shoping-bag",
                "slug": "purchases",
            },
            {"title": "Stats", "url": "/stats", "icon": "bar-chart-2", "slug": "stats"},
            {
                "title": "Lab Results",
                "url": "/lab-results",
                "icon": "globe",
                "slug": "lab-results",
            },
            {
                "title": "Settings",
                "url": "/settings",
                "icon": "settings",
                "slug": "settings",
            },
            {"title": "Help", "url": "/help", "icon": "help-circle", "slug": "help"},
        ],
        "admin_index": [
            {"title": "Files", "url": "/files", "icon": "server", "slug": "files"},
            {
                "title": "Invoicing",
                "url": "/invoicing",
                "icon": "credit-card",
                "slug": "invoicing",
            },
            {
                "title": "Security",
                "url": "/security",
                "icon": "shield",
                "slug": "security",
            },
        ],
        "qa_index": [
            {
                "title": "Inventory",
                "url": "/inventory",
                "icon": "briefcase",
                "slug": "inventory",
            },
            {"title": "Stats", "url": "/stats", "icon": "trending-up", "slug": "stats"},
            {
                "title": "Traceability",
                "url": "/traceability",
                "icon": "share-2",
                "slug": "traceability",
            },
        ],
    },
}

material["get-started"] = {
    "account": {"fields": material["account"]["fields"]},
    "organization": {"fields": material["organizations"]["fields"]},
    "pricing_tiers": [
        {
            "name": "Free",
            "price": "👐",
            "color": "green",
            "action": "Sign up for free",
            "url": "https://console.cannlytics.com",
            "attributes": [
                "All software",
                "All community material",
                "Email support",
                "Voting rights",
            ],
        },
        {
            "name": "Pro",
            "price": "$250 / mo.",
            "color": "orange",
            "action": "Get started",
            "url": "/contact",
            "attributes": [
                "A company website",
                "A full-suite LIMS",
                "A client portal",
                "Phone and digital support",
            ],
        },
        {
            "name": "Enterprise",
            "price": "$500 / mo.",
            "color": "purple",
            "action": "Contact us",
            "url": "/contact",
            "attributes": [
                "Traceability integration",
                "Early access to new features",
                "Around the clock support",
                "On-site support",
            ],
        },
    ],
}
