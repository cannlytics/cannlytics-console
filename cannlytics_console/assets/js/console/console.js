/**
 * console.js | Cannlytics Console (v1.0.0)
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate
 * Created: 12/7/2020
 * Resources:
 * https://developers.google.com/web/ilt/pwa/lab-cloud-firestore#9_optional_take_the_app_offline
 */
import { auth, getUserData } from '../firebase.js';
import { idbStore } from '../store.js';


export function initializeConsole() {

  // Initialize icons.
  feather.replace();

  // Initialize the app given the Firebase user's login status.
  auth.onAuthStateChanged((user) => {

    if (user) {

      // Optional: Save the user's session on the Django back-end.
      // authenticateDjango();

      // Get the user's data, save the user's data locally, and then setup the UI.
      getUserData(user.uid).then((userData) => {
        // idbStore.set('user', userData);
        initializeUserUI(userData);
      });
      // idbStore.get('user').then((data) => {
      //   if (!data) {
      //     getUserData(user.uid).then((userData) => {
      //       idbConsole.set('user', userData);
      //       initializeUserUI(userData);
      //     });
      //   } else {
      //     initializeUserUI(data);
      //   }
      //   // console.log('IDB User:', data);
      // });

    } else {

      // Redirect to login.
      // window.location.replace('/account/login/');

    }

  });

}


function authenticateDjango() {
  /*
   * Pass current user to Django back-end.
   */
  console.log('Passing user token to Django');
  auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    const headers = new Headers({
      'Content-Type': 'text/plain',
      'Authorization': `Bearer ${idToken}`,
    });
    fetch('/api/authenticate/', {
      headers,
      method: 'POST',
      body: new FormData(document.getElementById('myForm')),
    });
  }).catch(function(error) {
    console.log('Error:', error);
    // TODO: Handle error
  });
}


function initializeUserUI(user) {
  /*
   * Setup user's UI based on their preferences and claims.
   */
  // const user = sessionStorage.getItem('user', {})
  const organization = user.organization || 'Cannlytics';
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('userName').textContent = user.name || '';
  document.getElementById('userOrganization').textContent = organization;
  document.title = `${document.title.split('|')[0]} | ${organization}`;
  if (document.title.startsWith(' |')) document.title = `Dashboard${document.title}`;
  console.log('Title:', document.title);
  // if (user.photoURL) document.getElementById('userPhoto').src = user.photoURL;
}


// function storeUser(user) {
//   /*
//    * Store the user's data locally.
//    */
//   let transaction = db.transaction(['notes_os'], 'readwrite');
//   let objectStore = transaction.objectStore('notes_os');
//   let request = objectStore.add(newItem);
// }

