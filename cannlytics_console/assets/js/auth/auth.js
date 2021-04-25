/**
 * auth.js | Cannlytics Console
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate
 * Created: 12/4/2020
 * Updated: 4/20/2021
 */

import { authRequest, showNotification } from '../utils.js';


export const auth = {


  initialize() {
    /*
     * Initialize Firebase, waiting for the user to sign in successfully to
     * programmatically login the user and route them to the dashboard.
     */
    try {
      firebase.initializeApp();
    } catch(error) {
      // Firebase already initialized.
    }
    // FIXME: Navigate to dashboard if redirecting from Google sign-in.
    // this.googleSignInRedirect();
  },


  currentUser() { return firebase.auth().currentUser },


  googleSignIn() {
    /*
     * Sign in a user with Google.
     */
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  },


  googleSignInRedirect() {
    /*
     * Signs in a user after a successful Google sign-in redirect.
     */
    // FIXME: Login on redirect does not work
    console.log('Checking for Google redirect...')
    firebase.auth().getRedirectResult().then((result) => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // window.location.href = '/';
      }
      // The signed-in user info.
      var user = result.user;
      console.log('User:', user);
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log('Error:', errorMessage);
    });
  },


  resetPassword() {
    /*
     * Reset a user's password.
     */
    var auth = firebase.auth();
    var email = document.getElementById('login-email').value;
    auth.sendPasswordResetEmail(email).then(function() {
      window.location.href = '/account/password-reset-done';
    }).catch(function(error) {
      showNotification('Reset password error', error.message, { type: 'error' });
    });
  },


  resetPasswordCodeCheck() {
    /*
     * Check if the password reset code is valid.
     */
    const url = new URL(window.location.href);
    const code = url.searchParams.get('oobCode');
    firebase.auth().verifyPasswordResetCode(code)
      .then((email) => {
        document.getElementById('user-email').value = email;
      })
      .catch(()  => {
        const invalidMessage = document.getElementById('password-reset-code-invalid-message');
        const passwordResetForm = document.getElementById('password-reset-form');
        passwordResetForm.classList.add('d-none');
        invalidMessage.classList.remove('d-none');
      });
  },


  resetPasswordConfirm() {
    /*
     * Confirm a password reset.
     */
    const newPassword = document.getElementById('login-password').value;
    const newPasswordConfirmation = document.getElementById('login-password-confirmation').value;
    if (newPassword !== newPasswordConfirmation) {
      const message = 'The passwords you entered are not the same, please confirm your password.';
      showNotification('Passwords do not match', message, { type: 'error' });
      return;
    }
    firebase.auth().confirmPasswordReset(code, newPassword)
      .then(() => {
        window.location.href = '/account/password-reset-complete';
      })
      .catch(() => {
        const message = 'The password reset link that you used is invalid. Please request a new password reset link.';
        showNotification('Password reset error', message, { type: 'error' });
      });
  },


  signIn() {
    /*
     * Sign in a user.
     */
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        window.location.href = '/';
      })
      .catch((error) => {
        showNotification('Sign in error', error.message, { type: 'error' });
      });
  },
  
  
  signUp() {
    /*
     * Sign up a user.
     */
    var termsAccepted = document.getElementById('login-terms-accepted').checked;
    if (!termsAccepted) {
      message = 'Please agree with our terms of service and read our privacy policy to create an account.';
      showNotification('Terms not accepted', error.message, { type: 'error' });
      return;
    }
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        authRequest('/api/users', { email, photo_url: `https://robohash.org/${email}?set=set5` })
      })
      .catch((error) => {
        showNotification('Sign up error', error.message, { type: 'error' });
      });
  },
  
  
  verifyUser() {
    /*
     * Send a user a verification email.
     */
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
      showNotification('Verification email sent', error.message, { type: 'success' });
    }).catch(function(error) {
      showNotification('Verification error', error.message, { type: 'error' });
    });
  },


}

