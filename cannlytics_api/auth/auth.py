"""
Views | Cannlytics API
Created: 1/22/2021

API to interface with cannabis analytics.
"""

# External imports
from firebase_admin import auth
from rest_framework.response import Response

# Internal imports
from cannlytics.firebase import (
    create_log,
    update_document,
)

def authenticate(request):
    """Identify the user's Firebase account using an ID token."""
    try:
        authorization = request.headers['Authorization']
        token = authorization.split(' ')[1]
        claims = auth.verify_id_token(token)
        uid = claims['uid']
        request.session['uid'] = uid
        # Optional: Save user's custom claims in a session?
        return Response(claims, content_type='application/json')
    except:
         return Response({'success': False}, content_type='application/json', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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


def logout(request):
    """End a user's session."""
    try:
        claims = authenticate(request)
        uid = claims['uid']
        create_log(f'users/{uid}/logs', claims, 'Signed out.', 'auth', 'logout')
        update_document(f'users/{uid}', {'signed_in': False})
        return Response({'success': True}, content_type='application/json')
    except:
        return Response({'success': False}, content_type='application/json', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

