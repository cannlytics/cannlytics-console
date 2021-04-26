"""
Views | Cannlytics API
Created: 1/22/2021
Updated: 4/26/2021

API to interface with cannabis analytics.
"""

# External imports
from firebase_admin import auth, initialize_app
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Internal imports
from cannlytics.firebase import (
    create_log,
    update_document,
)

# Initialize Firebase.
try:
    initialize_app()
except ValueError:
    pass


def authenticate_request(request):
    """Authenticate a user given a Firebase token or an API key
    passed in an `Authentication: Bearer <token>` header.
    Args:
        request: An instance of `django.http.HttpRequest` or
            `rest_framework.request.Request`.
    Returns:
        claims (dict): A dictionary of the user's custom claims, including
            the user's `uid`.
    """
    # authorization = request.headers['Authorization']
    authorization = request.META['HTTP_AUTHORIZATION']
    token = authorization.split(' ')[-1]
    claims = auth.verify_id_token(token)
    # TODO: Implement custom API key to use as an alternate.
    return claims


@api_view(['GET'])
def authenticate(request):
    """Identify the user's Firebase account using an ID token."""
    try:
        claims = authenticate_request(request)
        uid = claims['uid']
        request.session['uid'] = uid
        return Response(claims, content_type='application/json')
    except:
        return Response({'success': False}, content_type='application/json', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def login(request):
    """Start a user's session."""
    try:
        claims = authenticate(request)
        uid = claims['uid']
        create_log(f'users/{uid}/logs', claims, 'Signed in.', 'auth', 'login')
        update_document(f'users/{uid}', {'signed_in': True})
        return Response({'success': True}, content_type='application/json')
    except:
        return Response({'success': False}, content_type='application/json', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def logout(request):
    """End a user's session."""
    try:
        claims = authenticate(request)
        uid = claims['uid']
        try:
            del request.session['uid']
        except:
            pass
        create_log(f'users/{uid}/logs', claims, 'Signed out.', 'auth', 'logout')
        update_document(f'users/{uid}', {'signed_in': False})
        return Response({'success': True}, content_type='application/json')
    except:
        return Response({'success': False}, content_type='application/json', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
