/**
 * app.js | Cannlytics Console
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate <contact@cannlytics.com>
 * Created: 12/7/2020
 */
import { auth, signOut } from '../firebase.js';
import { authRequest } from '../utils.js';


export const app = {

  initialize() {
    /*
    * Initialize the console.
    */
    auth.onAuthStateChanged((user) => {
      console.log('Detected user:', user)
      if (user) {
        initializeUserUI(user);
        authRequest('/api/auth/authenticate/');
        // TODO: Get user's organizations from Firestore through the API!
        // console.log('Getting user organizations...');
        // authRequest('/api/organizations').then((data) => {
        //   console.log('User organizations:', data);
        // });
      }
    });
  },

  signOut: signOut,

}


function initializeUserUI(user) {
  /*
   * Setup user's UI based on their preferences and claims.
   */
  const organization = user.organization || 'Cannlytics';
  const navPhoto = document.getElementById('userPhotoNav');
  const menuPhoto = document.getElementById('userPhotoMenu');
  if (user.photoURL) {
    navPhoto.src = user.photoURL;
    menuPhoto.src = user.photoURL;
  }
  else {
    const robohash = `https://robohash.org/${user.email}?set=set5`;
    navPhoto.src = robohash;
    menuPhoto.src = robohash;
  }
  document.getElementById('anonymous-signup').classList.add('d-none');
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('userName').textContent = user.displayName || 'New account';
  document.title = `${document.title.split('|')[0]} | ${organization}`;
  if (document.title.startsWith('|')) document.title = `Dashboard ${document.title}`;
}

