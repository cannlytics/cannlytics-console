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
    var auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        authRequest('/api/login')
          .then(function() {
            window.location.href = '/';
          }).catch(function(error) {
            const message = 'An authentication error occurred. Please contact support@cannlytics.com';
            showNotification('Authentication error', error.message, { type: 'error' });
          });
      }
    });
  },

  googleSignIn() {
    /*
     * Sign in a user with Google.
     */
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  },

  resetPassword() {
    /*
     * Reset a user's password.
     */
    var auth = firebase.auth();
    var email = document.getElementById('login-email').value;
    auth.sendPasswordResetEmail(email).then(function() {
      window.location.href = '/account/password-reset-done/';
    }).catch(function(error) {
      showNotification('Reset password error', error.message, { type: 'error' });
    });
  },

  signIn() {
    /*
     * Sign in a user.
     */
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
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
        authRequest('/users', { email, photo_url: `https://robohash.org/${email}?set=set5` })
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
    user.sendEmailVerification().then(function() {
      // TODO: Notify user that an email sent.
    }).catch(function(error) {
      showNotification('Verification error', error.message, { type: 'error' });
    });
  },

}


//---------------------------------------------------------------------
// FIXME: Ensure Google sign-in works.
// https://github.com/firebase/firebase-js-sdk/issues/1682
// firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     console.log('User good to go:', user);
//     // ...
//   }
//   // The signed-in user info.
//   var user = result.user;
//   console.log('User:', user);
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
//   console.log('Error:', errorMessage);
// });
