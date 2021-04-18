"""
API | Cannlytics Console
Created: 2/21/2021
Description: Simple API endpoints to supplement console functionality.
Resources:
    https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
"""
from cannlytics.firebase import initialize_firebase, verify_token, update_document, get_document, get_collection
from datetime import datetime
from django.core.mail import send_mail
from django.http import JsonResponse
from django.conf import settings
from django.template.loader import render_to_string
from json import loads


initialize_firebase()


# (Moving to cannlytics engine)
def create_log(ref, claims, action, log_type, key, changes=None):
    """Create an activity log."""
    now = datetime.now()
    timestamp = datetime.now().isoformat()
    log_id = now.strftime('%Y-%m-%d_%H-%M-%S')
    log_entry = {
        'action': action,
        'type': log_type,
        'key': key,
        'created_at': timestamp,
        'user': claims.get('uid'),
        'user_name': claims.get('display_name'),
        'user_email': claims.get('email'),
        'user_photo_url': claims.get('photo_url'),
        'changes': changes,
    }
    update_document(f'{ref}/{log_id}', log_entry)


def authenticate(request, direct=False):
    """Identify the user on the back-end."""
    try:
        authorization = request.headers['Authorization']
        token = authorization.split(' ')[1]
        claims = verify_token(token)
        uid = claims['uid']
        request.session['uid'] = uid
        if direct:
            return claims
        else:
            return JsonResponse({'success': True}, status=200)
    except:
        return JsonResponse({'success': False}, status=500)


def login(request):
    """Start a user's session."""
    try:
        claims = authenticate(request, direct=True)
        uid = claims['uid']
        create_log(f'users/{uid}/logs', claims, 'Signed in.', 'auth', 'login')
        update_document(f'users/{uid}', {'signed_in': True})
        return JsonResponse({'success': True}, status=200)
    except:
        return JsonResponse({'success': False}, status=500)


def logout(request):
    """End a user's session."""
    try:
        claims = authenticate(request, direct=True)
        uid = claims['uid']
        create_log(f'users/{uid}/logs', claims, 'Signed out.', 'auth', 'logout')
        update_document(f'users/{uid}', {'signed_in': False})
        return JsonResponse({'success': True}, status=200)
    except:
        return JsonResponse({'success': False}, status=500)


#----------------------------------------------------------------------------#
# API functions to migrate to cannlytics_website
#----------------------------------------------------------------------------#


def unsubscribe(request):
    """Unsubscribe a user from emails."""


#----------------------------------------------------------------------------#
# API functions to migrate to cannlytics_api
#----------------------------------------------------------------------------#


def users(request):
    """Get or update user's data."""
    print('Request to users endpoint!')
    try:
        claims = authenticate(request, direct=True)
        if request.method =='POST':
            post_data = loads(request.body.decode('utf-8'))
            uid = claims['uid']
            changes = [post_data]
            create_log(f'users/{uid}/logs', claims, 'Updated user data.', 'users', 'user_data', changes)
            update_document(f'users/{uid}', post_data)
            return JsonResponse(post_data, status=200)
        else:
            user_data = get_document(f'users/{claims["uid"]}')
            return JsonResponse(user_data, status=200)
    except:
        return JsonResponse({'success': False}, status=500)


def organizations(request):
    """Get or update user's organizations."""
    claims = authenticate(request, direct=True)
    if request.method =='POST':
        post_data = loads(request.body.decode('utf-8'))
        uid = claims['uid']

        # Return an error if the organization already exists
        # and the user is not part of the organization's team.
        query = {'key': 'organization', 'operation': '==', 'value': organization}
        organizations = get_collection('organizations', filters=[query])
        if not organizations:
            message = 'Organization does not exist. Please check the organization name and try again.'
            return JsonResponse({'success': False, 'message': message}, status=400)

        # Create activity log.
        # changes = [post_data]
        # create_log(f'users/{uid}/logs', claims, 'Updated user data.', 'users', 'user_data', changes)

        # Create organization if it doesn't exist
        # All organizations have a unique `org_id`.
        organization = {
            'owner': [],
            'name': '',
            'license': '',
            'license_type': '',
            'team': [],
            'support': '',
        }

        # If an organization already exists, then only the owner edit the organization's team.
        # update_document(f'users/{uid}', post_data)

        # On organization creation, the creating user get custom claims.
        # owner: [org_id, ...]

        # Owners can add another user to the team.
        # team: [org_id, ...]
        # The receiving user then gets the claims.
        # team: [org_id, ...]

        # If a user has org_id in their team claims, then they can perform team actions.

        # Only user's with org_id in owner claim can do sensitive operations.
        # Such as adding team members, archiving organization

        # Each organization can have multiple licenses.

        # Create activity log.
        # changes = [post_data]
        # create_log(f'organization/{uid}/logs', claims, 'Updated organization data.', 'organizations', 'organization_data', changes)

        return JsonResponse(organization, status=200)
    else:
        # user_data = get_document(f'users/{claims['uid']}')
        return JsonResponse({}, status=200)



def confirm_join_organization():
    """Confirm a user's request to join an organization."""


def decline_join_organization():
    """Decline a user's request to join an organization."""


def join_organization(request):
    """Send the owner of an organization a request for a user to join."""

    # Identify the user.
    claims = authenticate(request, direct=True)
    uid = claims['uid']
    user_email = claims['email']
    post_data = loads(request.body.decode('utf-8'))
    organization = post_data.get('organization')

    # Return an error if the organization doesn't exist.
    query = {'key': 'organization', 'operation': '==', 'value': organization}
    organizations = get_collection('organizations', filters=[query])
    if not organizations:
        message = 'Organization does not exist. Please check the organization name and try again.'
        return JsonResponse({'success': False, 'message': message}, status=400)

    # Send the owner an email requesting to add the user to the organization's team.
    org_email = organizations[0]['email']
    recipients = settings.LIST_OF_EMAIL_RECIPIENTS
    sender = settings.DEFAULT_FROM_EMAIL
    text = f"A user with the email address {user_email} would like to join your organization, \
        {organization}. Do you want to add this user to your organization's team? Please \
        reply YES or NO to confirm."
    paragraphs = []
    # TODO: Generate confirm, decline, and unsubscribe links with HMACs from user's uid and owner's uid.
    user_hmac = ''
    owner_hmac = ''
    # Optional: Find new home's for endpoints in cannlytics_api and cannlytics_website
    confirm_link = f'https://console.cannlytics.com/api/organizations/confirm?hash={owner_hmac}&member={user_hmac}'
    decline_link = f'https://console.cannlytics.com/api/organizations/decline?hash={owner_hmac}&member={user_hmac}'
    unsubscribe_link = f'https://console.cannlytics.com/api/unsubscribe?hash={owner_hmac}'
    html_message = render_to_string('templates/cannlytics_console/emails/action_email_template.html', {
        'recipient': org_email,
        'paragraphs': paragraphs,
        'primary_action': 'Confirm',
        'primary_link': confirm_link,
        'secondary_action': 'Decline',
        'secondary_link': decline_link,
        'unsubscribe_link': unsubscribe_link,
    })

    # TODO: Skip sending email if owner is unsubscribed.
    send_mail(
        subject="Request to join your organization's team.",
        message=text,
        from_email=sender,
        recipient_list=recipients,
        fail_silently=False,
        html_message=html_message
    )

    # Create activity logs.
    create_log(f'users/{uid}/logs', claims, 'Requested to join an organization.', 'users', 'user_data', [post_data])
    create_log(f'organization/{uid}/logs', claims, 'Request from a user to join the organization.', 'organizations', 'organization_data', [post_data])
    
    message = f'Request to join {organization} sent to the owner.'
    return JsonResponse({'success': True, 'message': message}, status=200)


#----------------------------------------------------------------------------#
# SCRAP
#----------------------------------------------------------------------------#

# from django.core.mail import EmailMessage
# from django.template.loader import get_template
# from xhtml2pdf import pisa
# from io import BytesIO
# from .settings import EMAIL_HOST_USER

# def create_coa_pdf(request):
#     """ Create a CoA PDF. """
#     data = {'test': 1}
#     template = get_template('coa.html')
#     data_p = template.render(data)
#     response = BytesIO()
#     pdfPage = pisa.pisaDocument(BytesIO(data_p.encode('UTF-8')), response)
#     if not pdfPage.err:
#         return HttpResponse(response.getvalue(),content_type='application/pdf')
#     else:
#         return HttpResponse('Error Generating PDF')


# def email_coa_pdf(request):
#     """ Email a CoA PDF. """
#     message = request.POST.get('message', '')
#     subject = request.POST.get('subject', '')
#     mail_id = request.POST.get('email', '')
#     email = EmailMessage(subject, message, EMAIL_HOST_USER, [mail_id])
#     email.content_subtype = 'html'
#     file = request.FILES['file']
#     email.attach(file.name, file.read(), file.content_type)
#     email.send()
#     return HttpResponse('Sent')

