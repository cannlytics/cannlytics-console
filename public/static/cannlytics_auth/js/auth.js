/**
 * auth.js | Cannlytics Console
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate
 * Created: 12/4/2020
 */

// https://firebase.google.com/docs/auth/web/google-signin#expandable-4
// https://docs.djangoproject.com/en/3.1/topics/auth/customizing/

// TODO: Console specific configuration
firebase.initializeApp({
  apiKey: 'AIzaSyCWEMwQitfiSSAg21KcRb0YpNOhdyD4bak',
  authDomain: 'cannlytics.firebaseapp.com',
  databaseURL: 'https://cannlytics.firebaseio.com',
  projectId: 'cannlytics',
  storageBucket: 'cannlytics.appspot.com',
  messagingSenderId: '464045168555',
  appId: '1:464045168555:web:901f17cf975e20ccf624ee',
  // measurementId: 'G-L7L5FE68R5',
});

// const auth = firebase.auth();
// auth.onAuthStateChanged((user) => {
//   if (user) {

//     // Save user locally?
//     console.log('User:', user);
//     // sessionStorage.setItem('user', user);

//     // Navigate to desired page (unless resetting password)
//     // window.location.replace('/');

//   } else {
//     // window.location.replace('/account/login')
//     console.log('User needs to log in');
//   }
// });


function createUser(user) {
  var db = firebase.firestore();
  db.collection('users').doc(user.uid).set({
    email: user.email,
    created_at: new Date().toISOString(),
    uid: user.uid,
    // TODO: See if Google Sign in provide picture
  });
}


function signIn() {
  var email = document.getElementById("input_email").value;
  var password = document.getElementById("input_password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    window.location.href = '/';
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // TODO: Show error
    console.log('Error:', errorMessage);
  });
}


function resetPassword() {
  var auth = firebase.auth();
  var email = document.getElementById("input_email").value;
  auth.sendPasswordResetEmail(email).then(function() {
    window.location.href = '/account/password-reset-done/';
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // TODO: Show error
    console.log('Error:', errorMessage);
  });
}


function signUp() {
  var email = document.getElementById("input_email").value;
  var password = document.getElementById("input_password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    createUser(user);
    // TODO: Verify user
    window.location.href = '/';
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // TODO: Show error
    console.log('Error:', errorMessage);
  });
}


function googleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  // If browser:
  // firebase.auth().signInWithPopup(provider).then(function(result) {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   var token = result.credential.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   console.log('User good to go:', user);
  //   window.location.href = '/';
  //   // ...
  // }).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  //   // ...
  // });
  // // If mobile:
  firebase.auth().signInWithRedirect(provider);
}

// Not necessary
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


function verifyUser() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    // TODO: Notify user that an email sent.
  }).catch(function(error) {
    // TODO: Notify user that an error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('Error:', errorMessage);
  });
}
