/**
 * API Interface | Cannlytics Console
 * Author: Keegan Skeate
 * Created: 4/24/2021
 * Description: The `api` object interfaces with the Cannlytics API to send
 * and retrieve data to and from the back-end, where data is processed and
 * stored in the Firestore database and Metrc API.
 */

import { authRequest } from '../utils.js';
 

export const api = {


  /*----------------------------------------------------------------------------
  Areas
  ----------------------------------------------------------------------------*/
 
  // getAreas(params) {
  //   /*
  //    * Get facilities and locations from Firestore/Metrc.
  //    */
  //   return new Promise((resolve, reject) => {
  //     authRequest('/api/areas', { params })
  //       .then((data) => { resolve(data); })
  //       .catch((error) => { reject(error); });
  //   });
  // },
  getAreas: function(params) {
    /*
     * Get facilities and locations from Firestore/Metrc.
     */
    console.log('Getting areas...');
    return authRequest('http://127.0.0.1:8000/api/areas');
    // return new Promise(function(resolve, reject) {
    //   authRequest('/api/areas', { params })
    //     .then((data) => { resolve(data); })
    //     .catch((error) => { reject(error); });
    // });
  },


  createArea(data) {
    /*
     * Create a location in Firestore and Metrc.
     */
    return new Promise((resolve, reject) => {
      authRequest('/api/areas', data)
        .then((data) => { resolve(data); })
        .catch((error) => { reject(error); });
    });
  },


  updateArea(data) {
    /*
     * Update a location in Firestore and Metrc.
     */
    return createArea(data);
  },


  deleteArea(data) {
    /*
     * Delete a location in Firestore and Metrc.
     */
    return new Promise((resolve, reject) => {
      authRequest('/api/areas', data, { delete: true })
        .then((data) => { resolve(data); })
        .catch((error) => { reject(error); });
    });
  },


  /*----------------------------------------------------------------------------
  Inventory
  ----------------------------------------------------------------------------*/
 
  getInventory(params) {
    /*
     * Get inventory.
     */
    return new Promise((resolve, reject) => {
      authRequest('/api/inventory', { params })
        .then((data) => { resolve(data); })
        .catch((error) => { reject(error); });
    });
  },


  createInventory(data) {
    /*
     * Create an inventory item.
     */
    return new Promise((resolve, reject) => {
      authRequest('/api/inventory', data)
        .then((data) => { resolve(data); })
        .catch((error) => { reject(error); });
    });
  },


  updateInventory(data) {
    /*
     * Update an inventory item.
     */
    return createArea(data);
  },


  deleteInventory(data) {
    /*
     * Delete an inventory item.
     */
    return new Promise((resolve, reject) => {
      authRequest('/api/inventory', data, { delete: true })
        .then((data) => { resolve(data); })
        .catch((error) => { reject(error); });
    });
  },


}
