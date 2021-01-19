from django.core.mail import EmailMessage
from django.http import HttpResponse, JsonResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from io import BytesIO

from .settings import EMAIL_HOST_USER
from .firebase import verify_token


def authenticate(request):
    """ Identify the user on the back-end. """
    # try:
    authorization = request.headers["Authorization"]
    token = authorization.split(' ')[1]
    claims = verify_token(token)
    uid = claims['uid']
    print('Claims:', claims)
    print('Authorized user ID:', uid)
    # TODO: Save user's custom claims in the session.
    request.session['uid'] = uid
    return JsonResponse({"success": True}, status=200)


def create_coa_pdf(request):
    """ Create a CoA PDF. """
    data = {'test': 1}
    template = get_template("coa.html")
    data_p = template.render(data)
    response = BytesIO()
    pdfPage = pisa.pisaDocument(BytesIO(data_p.encode("UTF-8")), response)
    if not pdfPage.err:
        return HttpResponse(response.getvalue(),content_type="application/pdf")
    else:
        return HttpResponse("Error Generating PDF")


def email_coa_pdf(request):
    """ Email a CoA PDF. """
    message = request.POST.get('message', '')
    subject = request.POST.get('subject', '')
    mail_id = request.POST.get('email', '')
    email = EmailMessage(subject, message, EMAIL_HOST_USER, [mail_id])
    email.content_subtype = 'html'
    file = request.FILES['file']
    email.attach(file.name, file.read(), file.content_type)
    email.send()
    return HttpResponse("Sent")

