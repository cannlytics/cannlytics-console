/**
 * Cannlytics Console (v1.0.0): settings.js
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate
 * Created: 12/3/2020
 */
import { auth, db } from '../firebase.js';
import { v4 as uuidv4 } from 'uuid';
// const id = uuidv4();
import { accountSettings } from './account.js';

const coreSettings = {

  newOrganization() {
    const id = uuidv4();
    console.log('New org ID:', id);
  },

  addOrganization(data) {
    /* 
    * Add an organizations.
    */
    const collection = db.collection('organizations');
    return collection.add(data);
  },

  getOrganizations() {
    /* 
    * Get all of a user's organizations.
    */
    auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user.uid);
        // TODO: Get all of a users/{id} org_id's.
        // TODO: Get all organizations/{id} documents for org_id's.
        console.log('Get all organizations for user id:', user.uid);
        // const query = db.collection('organizations').limit(50);
        // query.onSnapshot(snapshot => {
        //   if (!snapshot.size) return render();
        //   snapshot.docChanges.forEach(change => {
        //     if (change.type === 'added') {
        //       render(change.doc);
        //     }
        //     else if (change.type === 'removed') {
        //       document.getElementById(change.doc.id).remove();
        //     }
        //   });
        // });
      }
    });
  //  idbStore.get('user').then((data) => {
  //   console.log('IDB User:', data);
  //   console.log('Getting organizations!');
  //  });
  },

  archiveOrganizations() {
    /* 
    * Archive one of a user's organizations.
    */
   // TODO: Add to archived organizations.
    const collection = firebase.firestore().collection('ships');
    return collection.doc(id).delete()
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
  },

  updateOrganization() {
    /* 
    * Update a user's organizations.
    */

  },

  logAction() {
    /* 
    * Record time and user of any activity.
    */

  },

};


export const settings = { ...coreSettings, ...accountSettings };
