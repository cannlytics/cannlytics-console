"""
Views | Cannlytics API
Created: 1/22/2021
Updated: 4/26/2021

API to interface with cannabis analytics.

Optional: Rework authentication to authenticate with cookie sessions
rather than passing ID token on every request.
https://firebase.google.com/docs/auth/admin/manage-cookies
"""

# External imports
from datetime import datetime, timedelta
from firebase_admin import auth, exceptions, initialize_app
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from time import time

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

#-----------------------------------------------------------------------
# Core Authentication Mechanism
#-----------------------------------------------------------------------

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
    authorization = request.META['HTTP_AUTHORIZATION']
    token = authorization.split(' ')[-1]
    try:
        claims = auth.verify_id_token(token)
    except auth.InvalidIdTokenError:
        # TODO: Verify with Cannlytics API key.
        raise NotImplementedError
    return claims


def verify_session(request):
    """Verifies that the user has authenticated with a Firebase ID token.
    Args:
        request: An instance of `django.http.HttpRequest` or
            `rest_framework.request.Request`.
    Returns:
        claims (dict): A dictionary of the user's custom claims, including
            the user's `uid`.
    """
    session_cookie = request.COOKIES.get('session')
    if not session_cookie:
        # Session cookie is unavailable. Force user to login.
        return {}

    # Verify the session cookie. In this case an additional check is added to detect
    # if the user's Firebase session was revoked, user deleted/disabled, etc.
    try:
        return auth.verify_session_cookie(session_cookie, check_revoked=True)
    except auth.InvalidSessionCookieError:
        # Session cookie is invalid, expired or revoked. Force user to login.
        return {}


#-----------------------------------------------------------------------

@api_view(['POST'])
def authenticate(request):
    """Generate a session cookie for a user from an ID token sent via
    HTTP authorization bearer token."""

    # Get the user's ID token from the authorization header.
    auth_header = request.META['HTTP_AUTHORIZATION']
    id_token = auth_header.split(' ')[-1]

    # Ensure that cookies are set only on recently signed in users,
    # by checking the auth_time of the ID token before creating a cookie.
    # Only create a session if the user signed in within the last 5 minutes.
    try:
        decoded_claims = auth.verify_id_token(id_token)
        if time() - decoded_claims['auth_time'] < 5 * 60:
            # Optional: Make expiration_time_of_session a setting variable.
            expires_in = timedelta(days=7)
            expires = datetime.now() + expires_in
            session_cookie = auth.create_session_cookie(id_token, expires_in=expires_in)
            response = Response({'status': 'success'}, content_type='application/json')
            response.set_cookie(
                key='session',
                value=session_cookie,
                expires=expires,
                httponly=True,
                secure=True,
            )
            return response

        # Otherwise, the user did not sign in recently. To guard against
        # ID token theft, re-authentication is required.
        return Response(
            {'status': 'error', 'message': 'Recent sign in required.'},
            content_type='application/json',
            status=status.HTTP_401_UNAUTHORIZED
        )
    except auth.InvalidIdTokenError:
        return Response(
            {'status': 'error', 'message': 'Invalid ID token.'},
            content_type='application/json',
            status=status.HTTP_401_UNAUTHORIZED
        )
    except exceptions.FirebaseError:
        return Response(
            {'status': 'error', 'message': 'Failed to create a session cookie.'},
            content_type='application/json',
            status=status.HTTP_401_UNAUTHORIZED
        )

# @api_view(['GET'])
# def login(request):
#     """Start a user's session."""
#     try:
#         claims = authenticate(request)
#         uid = claims['uid']
#         create_log(f'users/{uid}/logs', claims, 'Signed in.', 'auth', 'login')
#         update_document(f'users/{uid}', {'signed_in': True})
#         return Response({'success': True}, content_type='application/json')
#     except:
#         return Response({'success': False}, content_type='application/json', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def logout(request):
    """End a user's session."""
    session_cookie = request.COOKIES.get('session')
    try:
        decoded_claims = auth.verify_session_cookie(session_cookie)
        uid = decoded_claims['uid']
        create_log(
            ref=f'users/{uid}/logs',
            claims=decoded_claims,
            action='Signed out.',
            log_type='auth',
            key='logout'
        )
        update_document(f'users/{uid}', {'signed_in': False})
        auth.revoke_refresh_tokens(decoded_claims['sub'])
        response = Response(
            {'status': 'success'},
            content_type='application/json'
        )
        response.set_cookie('session', expires=0)
        print('Successfully logged out, cookie expired.')
        return response
    except auth.InvalidSessionCookieError:
        return Response(
            {'success': 'error', 'message': 'Invalid session cookie.'},
            content_type='application/json',
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
