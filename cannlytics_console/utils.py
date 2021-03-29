"""
General Utility Functions
Created: 11/26/2020
"""
from django.utils.crypto import get_random_string


#----------------------------------------------#
# Render helpers
#----------------------------------------------#


def get_page(request, default=""):
    page = "/".join(request.path.split("/")[2:]).rstrip("/")
    if not page:
        page = default
    return page


#----------------------------------------------#
# Authentication helpers
#----------------------------------------------#


def generate_secret_key(env_file_name):
    """ Generate a Django secret key. """
    env_file = open(env_file_name, "w+")
    chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
    generated_secret_key = get_random_string(50, chars)
    env_file.write("SECRET_KEY = '{}'\n".format(generated_secret_key))
    env_file.close()

