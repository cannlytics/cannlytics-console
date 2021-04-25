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
 
  getAreas: (params) => authRequest('/api/areas', null, { params }),
  createArea: (data) => authRequest('/api/areas', data),
  updateArea: (data) => authRequest('/api/areas', data),
  deleteArea: (data) => authRequest('/api/areas', data, { delete: true }),

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
