from firebase_admin import auth, firestore, initialize_app

initialize_app()

def verify_token(token):
    """ Verify a user's custom token. """
    return auth.verify_id_token(token)
