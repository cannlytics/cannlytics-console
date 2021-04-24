/*
 * utils.js | Cannlytics Console
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate <contact@cannlytics.com>
 * Created: 2/21/2021
 */

// import { v4 as uuidv4 } from 'uuid';
// const id = uuidv4();

import { getUserToken } from './firebase.js';


/*---------------------------------------------------------------------
 Auth Helpers
 --------------------------------------------------------------------*/

export const authRequest = (endpoint, data) => new Promise((resolve, reject) => {
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


export function getCookie(name) {
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


export const Password = {
  /*
   * Class use to generate random passwords.
   * Usage: Password.generate(32)
   */
 
  _pattern : /[a-zA-Z0-9_\-\+\.]/,
  
  
  _getRandomByte : function() {
    // http://caniuse.com/#feat=getrandomvalues
    if (window.crypto && window.crypto.getRandomValues) {
      var result = new Uint8Array(1);
      window.crypto.getRandomValues(result);
      return result[0];
    }
    else if (window.msCrypto && window.msCrypto.getRandomValues)  {
      var result = new Uint8Array(1);
      window.msCrypto.getRandomValues(result);
      return result[0];
    }
    else {
      return Math.floor(Math.random() * 256);
    }
  },
  
  generate : function(length) {
    return Array.apply(null, {'length': length})
      .map(function() {
        var result;
        while(true)  {
          result = String.fromCharCode(this._getRandomByte());
          if (this._pattern.test(result)) {
            return result;
          }
        }        
      }, this)
      .join('');  
  }    
    
};


/*---------------------------------------------------------------------
 UI Helpers
 --------------------------------------------------------------------*/

export function hasClass(element, className) {
  /*
   * Check if an element has a class.
   */
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}


export function showNotification(title, message, options) {
  /*
   * Show an error notification.
   */
  const toastEl = document.getElementById('notification-toast');
  document.getElementById('notification-title').textContent = title;
  document.getElementById('notification-message').textContent = message;
  toastEl.classList.remove('d-none');
  if (options.type) {
    const types = ['error', 'success', 'wait'];
    types.forEach((type) => {
      if (type === options.type) {
        document.getElementById(`notification-${type}-icon`).classList.remove('d-none');
      } else {
        document.getElementById(`notification-${type}-icon`).classList.add('d-none');
      }
    });
  }
  const toast = new bootstrap.Toast(toastEl, { delay: options.delay || 4000 });
  toast.show()
}

