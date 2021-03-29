/**
 * auth.js | Cannlytics Console
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate
 * Created: 12/4/2020
 */

// Auth resources
// https://firebase.google.com/docs/auth/web/google-signin#expandable-4
// https://docs.djangoproject.com/en/3.1/topics/auth/customizing/
// https://firebase.google.com/docs/auth/admin/manage-cookies

// Sessions resources
// https://docs.djangoproject.com/en/3.1/topics/http/sessions/
// https://stackoverflow.com/questions/59433872/how-to-redirect-to-a-page-after-successful-login-and-implement-tokens-within-the
// https://docs.djangoproject.com/en/3.1/topics/http/sessions/


// Initialize Firebase. Optional: Turn into a function.
try {
  firebase.initializeApp();
} catch(error) {}

// Wait for the user to sign in successfully.
var auth = firebase.auth();
auth.onAuthStateChanged((user) => {
  if (user) {
    authRequest('/api/login/')
      .then(function() {
        window.location.href = '/';
      }).catch(function(error) {
        showError('Authentication error', 'An authentication error occurred. Please contact support@cannlytics.com');
      });
  }
});


const getUserToken = (refresh=false) => new Promise((resolve, reject) => {
  /*
   * Get an auth token for a given user.
   */
  if (!auth.currentUser) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken(refresh).then((idToken) => {
          resolve(idToken)
        }).catch((error) => {
          reject(error);
        });
      }
    });
  } else {
    auth.currentUser.getIdToken(refresh).then((idToken) => {
      resolve(idToken)
    }).catch((error) => {
      reject(error);
    });
  }
});

const authRequest = (endpoint, data) => new Promise((resolve, reject) => {
  /*
   * Make an authorized GET or POST request.
   */
  getUserToken().then((idToken) => {
    const csrftoken = getCookie('csrftoken');
    const headers = new Headers({
      'Content-Type': 'text/plain',
      'Authorization': `Bearer ${idToken}`,
      'X-CSRFToken': csrftoken,
    });
    const options = { headers, mode: 'same-origin' };
    if (data) {
      options.method = 'POST';
      options.body = JSON.stringify(data);
    }
    fetch(endpoint, options)
      .then(response => response.json())
      .then((data) => {
        resolve(data);
      });
  }).catch((error) => {
    reject(error);
  });
});

function getCookie(name) {
  /*
   * Get a cookie by name.
   */
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


function googleSignIn() {
  /*
   * Sign in a user with Google.
   */
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}


function resetPassword() {
  /*
   * Reset a user's password.
   */
  var auth = firebase.auth();
  var email = document.getElementById('login-email').value;
  auth.sendPasswordResetEmail(email).then(function() {
    window.location.href = '/account/password-reset-done/';
  }).catch(function(error) {
    showError('Reset password error', error.message);
  });
}


function signIn() {
  /*
   * Sign in a user.
   */
  var email = document.getElementById('login-email').value;
  var password = document.getElementById('login-password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      showError('Sign in error', error.message);
    });
}


function signUp() {
  /*
   * Sign up a user.
   */
  var termsAccepted = document.getElementById('login-terms-accepted').checked;
  if (!termsAccepted) {
    showError(
      'Terms not accepted',
      'Please agree with our terms of service and read our privacy policy to create an account.'
    );
    return;
  }
  var email = document.getElementById('login-email').value;
  var password = document.getElementById('login-password').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      authRequest('/users', { email, photo_url: `https://robohash.org/${email}?set=set5` })
    })
    .catch((error) => {
      showError('Sign up error', error.message);
    });
}


function showError(title, message, delay=4000) {
  /*
   * Show an error notification.
   */
  var toastEl = document.getElementById('error-notification');
  document.getElementById('error-notification-title').textContent = title;
  document.getElementById('error-notification-message').textContent = message;
  var toast = new bootstrap.Toast(toastEl, { delay });
  toast.show()
}


function verifyUser() {
  /*
   * Send a user a verification email.
   */
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    // TODO: Notify user that an email sent.
  }).catch(function(error) {
    showError('Verification error', error.message);
  });
}


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
