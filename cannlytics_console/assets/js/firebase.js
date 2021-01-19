/**
 * firebase.js | Cannlytics Console (v1.0.0)
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate
 * Created: 12/22/2020
 */
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/performance';
import 'firebase/storage';

// Initialize Firebase.
// TODO: Don't save config to github?
firebase.initializeApp();

// Define frequently used Firebase modules.
const analytics = firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();
const performance = firebase.performance();
const storage = firebase.storage();

// Define useful Firebase objects.
const { currentUser } = auth;
const { firestore } = firebase;


const getUserData = (uid) => new Promise((resolve) => {
  /*
   * Get a user's data from Firestore.
   */
  db.collection('users').doc(uid).get().then((doc) => {
    resolve(doc.data());
  });
});


// function initializeUserUI(user) {
//   /*
//    * Setup user's UI based on their preferences and claims.
//    */
//   // const user = sessionStorage.getItem('user', {})
//   const organization = user.organization || 'Cannlytics';
//   document.getElementById('userEmail').textContent = user.email;
//   document.getElementById('userName').textContent = user.name || 'Cannlytics User';
//   if (user.photoURL) document.getElementById('userPhoto').src = user.photoURL;
//   document.getElementById('userOrganization').textContent = organization;
//   document.title = `${document.title.split('|')[0]} | ${organization}`;
// }


function signOut() {
  /*
   * Sign a user out of Firebase and clear the session.
   */
  const uid = sessionStorage.getItem('user', {}).uid; 
  sessionStorage.clear();
  db.collection('users').doc(uid).update({
    sign_out_at: new Date().toISOString(),
  });
  auth.signOut();
}


function sendFeedback() {
  /*
   * Send feedback through Firestore-triggered Google Cloud Function.
   */
  sessionStorage.getItem('user', {}); // TODO: Get user data.
  const message = document.getElementById('feedback-message').value;
  const timestamp = Date.now().toString(); // TODO: Use ISO time instead.
  const code = Math.random().toString(36).slice(-3);
  const data = {
    name: user.name,
    email: user.email,
    organization: user.organization,
    body: message,
    from: 'contact@cannlytics.com',
    reply: 'contact@cannlytics.com',
    recipients: ['contact@cannlytics.com'],
    subject: 'New Cannlytics Console feedback!',
    promo: code,
  };
  db.collection('users').doc(user.uid).collection('feedback')
    .doc(timestamp)
    .set(data).then(() => {
      // TODO: Show toast: "Thank you for your feedback! ** Save code ${code} for 1 free hour of support."
    }).catch((error) => {
      // Handle error
    });
}


export {
  analytics,
  auth,
  currentUser,
  db,
  firestore,
  performance,
  storage,
  getUserData,
  signOut,
  sendFeedback,
};
