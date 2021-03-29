var cannlytics =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cannlytics_console/assets/css/cannlytics.scss":
/*!*******************************************************!*\
  !*** ./cannlytics_console/assets/css/cannlytics.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"./css/cannlytics.css\");\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/css/cannlytics.scss?");

/***/ }),

/***/ "./cannlytics_console/assets/css/console.scss":
/*!****************************************************!*\
  !*** ./cannlytics_console/assets/css/console.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"./css/cannlytics.css\");\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/css/console.scss?");

/***/ }),

/***/ "./cannlytics_console/assets/js/analysis/analysis.js":
/*!***********************************************************!*\
  !*** ./cannlytics_console/assets/js/analysis/analysis.js ***!
  \***********************************************************/
/*! exports provided: analysis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"analysis\", function() { return analysis; });\n/**\n * Cannlytics Console (v1.0.0): analysis.js\n * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)\n * Author: Keegan Skeate\n * Created: 12/3/2020\n */\n// import Chart from 'chart.js';\n// import \"chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js\";\nfunction randomValues(count, min, max) {\n  var delta = max - min;\n  return Array.from({\n    length: count\n  }).map(() => Math.random() * delta + min);\n}\n\nvar analysis = {\n  initialize() {\n    this.drawGraphs();\n  },\n\n  drawGraphs() {\n    var ctx = document.getElementById('graph-concentrations');\n    var graph = new Chart(ctx, {\n      type: 'boxplot',\n      data: this.data,\n      options: {\n        responsive: true,\n        legend: {\n          position: 'bottom'\n        }\n      }\n    });\n  },\n\n  data: {\n    // TODO: Get from Firestore\n    // define label tree\n    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],\n    datasets: [{\n      label: 'Flower',\n      backgroundColor: 'rgba(255, 0, 0, 0.5)',\n      borderColor: 'red',\n      borderWidth: 1,\n      outlierColor: '#999999',\n      padding: 10,\n      itemRadius: 0,\n      data: [randomValues(100, 0, 100), randomValues(100, 0, 20), randomValues(100, 20, 70), randomValues(100, 60, 100), randomValues(40, 50, 100), randomValues(100, 60, 120), randomValues(100, 80, 100)]\n    }, {\n      label: 'Concentrates',\n      backgroundColor: 'rgba(0, 0, 255, 0.5)',\n      borderColor: 'blue',\n      borderWidth: 1,\n      outlierColor: '#999999',\n      padding: 10,\n      itemRadius: 0,\n      data: [randomValues(100, 60, 100), randomValues(100, 0, 100), randomValues(100, 0, 20), randomValues(100, 20, 70), randomValues(40, 60, 120), randomValues(100, 20, 100), randomValues(100, 80, 100)]\n    }]\n  }\n};\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/js/analysis/analysis.js?");

/***/ }),

/***/ "./cannlytics_console/assets/js/console/console.js":
/*!*********************************************************!*\
  !*** ./cannlytics_console/assets/js/console/console.js ***!
  \*********************************************************/
/*! exports provided: initializeConsole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initializeConsole\", function() { return initializeConsole; });\n/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../firebase.js */ \"./cannlytics_console/assets/js/firebase.js\");\n/**\n * console.js | Cannlytics Console (v1.0.0)\n * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)\n * Author: Keegan Skeate\n * Created: 12/7/2020\n */\n // export const console = {\n//   initialize() {\n//     initializeConsole();\n//   },\n//   initializeGetStarted() {\n//     console.log('Initializing get started...');\n//     // console.log(firebase.auth().currentUser.uid);\n//   },\n// }\n\nfunction initializeConsole() {\n  /*\n   * Initialize the app given the Firebase user's login status.\n   */\n  _firebase_js__WEBPACK_IMPORTED_MODULE_0__[\"auth\"].onAuthStateChanged(user => {\n    if (user) {\n      initializeUserUI(user);\n      authenticateDjango(user);\n    }\n  });\n}\n\nfunction initializeUserUI(user) {\n  /*\n   * Setup user's UI based on their preferences and claims.\n   */\n  var organization = user.organization || 'Cannlytics';\n  var navPhoto = document.getElementById('userPhoto');\n  var menuPhoto = document.getElementById('userPhotoMenu');\n\n  if (user.photoURL) {\n    navPhoto.src = user.photoURL;\n    menuPhoto.src = user.photoURL;\n  } else {\n    var robohash = \"https://robohash.org/\".concat(user.email, \"?set=set5\");\n    navPhoto.src = robohash;\n    menuPhoto.src = robohash;\n  }\n\n  document.getElementById('anonymous-signup').classList.add('d-none');\n  document.getElementById('userEmail').textContent = user.email;\n  document.getElementById('userName').textContent = user.displayName || 'New account'; // document.getElementById('userOrganization').textContent = organization;\n\n  document.title = \"\".concat(document.title.split('|')[0], \" | \").concat(organization);\n  if (document.title.startsWith('|')) document.title = \"Dashboard \".concat(document.title);\n}\n\nvar authenticateDjango = user => new Promise((resolve, reject) => {\n  /*\n   * Pass auth token for current user to Django back-end.\n   */\n  user.getIdToken(\n  /* forceRefresh */\n  true).then(function (idToken) {\n    var headers = new Headers({\n      'Content-Type': 'text/plain',\n      'Authorization': \"Bearer \".concat(idToken)\n    });\n    fetch('/api/authenticate/', {\n      headers,\n      method: 'GET'\n    }).then(() => {\n      resolve();\n    });\n  }).catch(function (error) {\n    reject(error);\n  });\n});\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/js/console/console.js?");

/***/ }),

/***/ "./cannlytics_console/assets/js/dashboard/dashboard.js":
/*!*************************************************************!*\
  !*** ./cannlytics_console/assets/js/dashboard/dashboard.js ***!
  \*************************************************************/
/*! exports provided: dashboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dashboard\", function() { return dashboard; });\n/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../firebase.js */ \"./cannlytics_console/assets/js/firebase.js\");\n/**\n * Cannlytics Console (v1.0.0): dashboard.js\n * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)\n * Author: Keegan Skeate\n * Created: 12/3/2020\n */\n// import { Chart } from \"frappe-charts/dist/frappe-charts.min.esm\";\n// import { Chart as fChart } from \"frappe-charts/dist/frappe-charts.esm.js\";\n// import \"frappe-charts/dist/frappe-charts.min.css\";\n\nvar dashboard = {\n  initialize() {// this.drawGraphs();\n    // this.drawHeatmap();\n    // this.drawTimeseries();\n  },\n\n  initializeGetStarted() {\n    Object(_firebase_js__WEBPACK_IMPORTED_MODULE_0__[\"getUserToken\"])().then(idToken => {\n      var headers = new Headers({\n        'Content-Type': 'text/plain',\n        'Authorization': \"Bearer \".concat(idToken)\n      });\n      fetch('/api/users/', {\n        headers\n      }).then(response => response.json()).then(data => {\n        console.log('Initialize UI with user data:', data);\n      });\n    }).catch(error => {\n      console.log(error);\n    });\n  },\n\n  drawHeatmap() {\n    console.log('Drawing heatmap'); // Optional: Get beginning and end of year. (6-month if mobile)\n\n    var data = {\n      dataPoints: {\n        \"1604188800\": 113 // TODO: Get daily samples received.\n\n      },\n      start: new Date(new Date().getFullYear(), 0, 1),\n      end: new Date(new Date().getFullYear(), 12, 31)\n    };\n    var chart = new frappe.Chart(\"#heatmap\", {\n      type: 'heatmap',\n      data: data,\n      radius: 5,\n      discreteDomains: 1,\n      colors: ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']\n    });\n  },\n\n  drawGraphs() {\n    var ctx = document.getElementById('graph-samples-received-matrix');\n    var graph = new Chart(ctx, {\n      type: 'matrix',\n      data: {\n        datasets: [{\n          label: 'My Matrix',\n          data: [{\n            x: 1,\n            y: 1,\n            v: 11\n          }, {\n            x: 2,\n            y: 2,\n            v: 22\n          }, {\n            x: 3,\n            y: 3,\n            v: 33\n          }],\n          backgroundColor: function backgroundColor(ctx) {\n            var value = ctx.dataset.data[ctx.dataIndex].v;\n            var alpha = (value - 5) / 40;\n            return Color('green').alpha(alpha).rgbString();\n          },\n          width: function width(ctx) {\n            var a = ctx.chart.chartArea;\n            return (a.right - a.left) / 3.5;\n          },\n          height: function height(ctx) {\n            var a = ctx.chart.chartArea;\n            return (a.bottom - a.top) / 3.5;\n          }\n        }]\n      }\n    });\n  },\n\n  drawTimeseries() {\n    console.log('Drawing timeseries!'); // TODO: Get data dynamically\n\n    new frappe.Chart(\"#timeseries\", {\n      // or DOM element\n      data: {\n        labels: [\"Mon.\", \"Tue.\", \"Wed.\", \"Thu.\", \"Fri.\", \"Sat.\", \"Sun.\"],\n        datasets: [{\n          name: \"Samples\",\n          chartType: \"bar\",\n          values: [25, 40, 30, 35, 8, 52, 17, 3]\n        }, {\n          name: \"Projects\",\n          chartType: \"bar\",\n          values: [25, 50, 10, 15, 18, 32, 27, 14]\n        }, {\n          name: \"Clients\",\n          chartType: \"line\",\n          values: [15, 20, 5, 20, 58, 12, 25, 37]\n        }],\n        yMarkers: [{\n          label: \"Capacity\",\n          value: 70,\n          options: {\n            labelPos: \"left\"\n          }\n        }] // yRegions: [\n        //   { label: \"Region\", start: -10, end: 50, options: { labelPos: \"right\" } }\n        // ]\n\n      },\n      // title: \"My Awesome Chart\",\n      type: \"axis-mixed\",\n      // or 'bar', 'line', 'pie', 'percentage'\n      height: 300,\n      colors: ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e'],\n      axisOptions: {\n        xAxisMode: \"tick\",\n        xIsSeries: true\n      },\n      barOptions: {\n        stacked: false,\n        spaceRatio: 0.5\n      }\n    }); // var ctx = document.getElementById('timeseries').getContext('2d');;\n    // var myChart = new Chart(ctx, {\n    //   type: 'bar',\n    //   data: {\n    //     labels: [\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\", \"Sunday\"],\n    //     datasets: [\n    //       {\n    //         label: 'In-transit',\n    //         backgroundColor: \"#caf270\",\n    //         data: [12, 59, 5, 56, 58,12, 59],\n    //       },\n    //       {\n    //         label: 'Started',\n    //         backgroundColor: \"#45c490\",\n    //         data: [12, 59, 5, 56, 58,12, 59],\n    //       },\n    //       {\n    //         label: 'Complete',\n    //         backgroundColor: \"#008d93\",\n    //         data: [12, 59, 5, 56, 58,12, 5],\n    //       },\n    //     ],\n    //   },\n    //   options: {\n    //       tooltips: {\n    //         displayColors: true,\n    //         callbacks:{\n    //           mode: 'x',\n    //         },\n    //       },\n    //       scales: {\n    //         xAxes: [{\n    //           stacked: true,\n    //           gridLines: {\n    //             display: false,\n    //           }\n    //         }],\n    //         yAxes: [{\n    //           stacked: true,\n    //           ticks: {\n    //             beginAtZero: true,\n    //           },\n    //           type: 'linear',\n    //         }]\n    //       },\n    //       responsive: true,\n    //       maintainAspectRatio: false,\n    //       legend: { position: 'top' },\n    //     }\n    //   });\n  }\n\n};\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/js/dashboard/dashboard.js?");

/***/ }),

/***/ "./cannlytics_console/assets/js/firebase.js":
/*!**************************************************!*\
  !*** ./cannlytics_console/assets/js/firebase.js ***!
  \**************************************************/
/*! exports provided: auth, db, firestore, getUserToken, signOut, getDocument, updateDocument, getCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"auth\", function() { return auth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"db\", function() { return db; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"firestore\", function() { return firestore; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUserToken\", function() { return getUserToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signOut\", function() { return signOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDocument\", function() { return getDocument; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateDocument\", function() { return updateDocument; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCollection\", function() { return getCollection; });\n/**\r\n * firebase.js | Cannlytics Website\r\n * Created: 12/22/2020\r\n */\nfirebase.initializeApp({\n  apiKey: \"AIzaSyCWEMwQitfiSSAg21KcRb0YpNOhdyD4bak\",\n  authDomain: \"cannlytics.firebaseapp.com\",\n  databaseURL: \"https://cannlytics.firebaseio.com\",\n  projectId: \"cannlytics\",\n  storageBucket: \"cannlytics.appspot.com\",\n  messagingSenderId: \"464045168555\",\n  appId: \"1:464045168555:web:901f17cf975e20ccf624ee\",\n  measurementId: \"G-EGEJHVEYRN\"\n});\nvar auth = firebase.auth();\nvar db = firebase.firestore();\nvar {\n  firestore\n} = firebase;\nvar GoogleAuthProvider = firebase.auth.GoogleAuthProvider;\n/*\r\n * Auth interface\r\n */\n\nvar getUserToken = function getUserToken() {\n  var refresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  return new Promise((resolve, reject) => {\n    /*\r\n     * Get an auth token for a given user.\r\n     */\n    if (!auth.currentUser) {\n      auth.onAuthStateChanged(user => {\n        if (user) {\n          user.getIdToken(refresh).then(idToken => {\n            resolve(idToken);\n          }).catch(error => {\n            reject(error);\n          });\n        }\n      });\n    } else {\n      auth.currentUser.getIdToken(refresh).then(idToken => {\n        resolve(idToken);\n      }).catch(error => {\n        reject(error);\n      });\n    }\n  });\n};\n\nfunction signOut() {\n  /*\r\n   * Sign a user out of Firebase and clear the session.\r\n   */\n  firebase.auth().currentUser.getIdToken(\n  /* forceRefresh */\n  true).then(function (idToken) {\n    var headers = new Headers({\n      'Content-Type': 'text/plain',\n      'Authorization': \"Bearer \".concat(idToken)\n    });\n    fetch('/api/logout/', {\n      headers,\n      method: 'GET'\n    }).then(() => {\n      firebase.auth().signOut().then(() => {\n        document.location.href = '/account/logout/';\n      }).catch(error => {\n        document.location.href = '/account/logout/';\n      });\n    });\n  }).catch(function (error) {\n    document.location.href = '/account/logout/';\n  });\n}\n/*\r\n * Firestore interface\r\n */\n\n\nvar getCollection = function getCollection(path) {\n  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  var orderBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  var desc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n  var filters = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];\n  return new Promise(resolve => {\n    /*\r\n     * Get documents from a collection in Firestore.\r\n     */\n    var ref = getReference(path);\n    filters.forEach(filter => {\n      ref = ref.where(filter.key, filter.operation, filter.value);\n    });\n    if (orderBy && desc) ref = ref.orderBy(orderBy, 'desc');else if (orderBy) ref = ref.orderBy(orderBy);\n    if (limit) ref = ref.limit(limit);\n    ref.get().then(snapshot => {\n      var docs = [];\n      snapshot.forEach(doc => {\n        docs.push(doc.data());\n      });\n      resolve(docs);\n    }).catch(error => {\n      console.log('Error getting documents: ', error);\n    });\n  });\n};\n\nvar getDocument = path => new Promise(resolve => {\n  /*\r\n   * Get a document from Firestore.\r\n   */\n  var ref = getReference(path);\n  ref.get().then(doc => {\n    resolve(doc.data());\n  });\n});\n\nvar getReference = path => {\n  /*\r\n   * Create a collection or a document Firestore reference.\r\n   */\n  var ref = db;\n  var parts = path.split('/');\n  parts.forEach((part, index) => {\n    if (index % 2) ref = ref.doc(part);else ref = ref.collection(part);\n  });\n  return ref;\n};\n\nvar updateDocument = (path, data) => new Promise(resolve => {\n  /*\r\n   * Update or create a document in Firestore.\r\n   */\n  var ref = getReference(path);\n  ref.set(data, {\n    merge: true\n  }).then(doc => {\n    resolve(doc.data());\n  });\n});\n/*\r\n * Miscellaneous\r\n */\n// function sendFeedback() {\n//   /*\n//    * Send feedback through Firestore-triggered Google Cloud Function.\n//    */\n//   sessionStorage.getItem('user', {}); // TODO: Get user data.\n//   const message = document.getElementById('feedback-message').value;\n//   const timestamp = Date.now().toString(); // TODO: Use ISO time instead.\n//   const code = Math.random().toString(36).slice(-3);\n//   const data = {\n//     name: user.name,\n//     email: user.email,\n//     organization: user.organization,\n//     body: message,\n//     from: 'contact@cannlytics.com',\n//     reply: 'contact@cannlytics.com',\n//     recipients: ['contact@cannlytics.com'],\n//     subject: 'New Cannlytics Console feedback!',\n//     promo: code,\n//   };\n//   db.collection('users').doc(user.uid).collection('feedback')\n//     .doc(timestamp)\n//     .set(data).then(() => {\n//       // TODO: Show toast: \"Thank you for your feedback! ** Save code ${code} for 1 free hour of support.\"\n//     }).catch((error) => {\n//       // Handle error\n//     });\n// }\n\n\n\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/js/firebase.js?");

/***/ }),

/***/ "./cannlytics_console/assets/js/index.js":
/*!***********************************************!*\
  !*** ./cannlytics_console/assets/js/index.js ***!
  \***********************************************/
/*! exports provided: analysis, dashboard, intake, logistics, settings, theme, initializeConsole, signOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _analysis_analysis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analysis/analysis.js */ \"./cannlytics_console/assets/js/analysis/analysis.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"analysis\", function() { return _analysis_analysis_js__WEBPACK_IMPORTED_MODULE_0__[\"analysis\"]; });\n\n/* harmony import */ var _dashboard_dashboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard/dashboard.js */ \"./cannlytics_console/assets/js/dashboard/dashboard.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"dashboard\", function() { return _dashboard_dashboard_js__WEBPACK_IMPORTED_MODULE_1__[\"dashboard\"]; });\n\n/* harmony import */ var _intake_intake_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./intake/intake.js */ \"./cannlytics_console/assets/js/intake/intake.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"intake\", function() { return _intake_intake_js__WEBPACK_IMPORTED_MODULE_2__[\"intake\"]; });\n\n/* harmony import */ var _logistics_logistics_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logistics/logistics.js */ \"./cannlytics_console/assets/js/logistics/logistics.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"logistics\", function() { return _logistics_logistics_js__WEBPACK_IMPORTED_MODULE_3__[\"logistics\"]; });\n\n/* harmony import */ var _settings_settings_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings/settings.js */ \"./cannlytics_console/assets/js/settings/settings.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return _settings_settings_js__WEBPACK_IMPORTED_MODULE_4__[\"settings\"]; });\n\n/* harmony import */ var _settings_theme_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings/theme.js */ \"./cannlytics_console/assets/js/settings/theme.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"theme\", function() { return _settings_theme_js__WEBPACK_IMPORTED_MODULE_5__[\"theme\"]; });\n\n/* harmony import */ var _console_console_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./console/console.js */ \"./cannlytics_console/assets/js/console/console.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"initializeConsole\", function() { return _console_console_js__WEBPACK_IMPORTED_MODULE_6__[\"initializeConsole\"]; });\n\n/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./firebase.js */ \"./cannlytics_console/assets/js/firebase.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"signOut\", function() { return _firebase_js__WEBPACK_IMPORTED_MODULE_7__[\"signOut\"]; });\n\n/**\r\n * Cannlytics Console (v1.0.0): index.js\r\n * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)\r\n * Author: Keegan Skeate\r\n * Created: 12/3/2020\r\n * Resources:\r\n * https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB\r\n * https://stackoverflow.com/questions/36955441/indexeddb-creating-a-database-and-adding-content-failed-to-execute-transaction\r\n * https://developers.google.com/web/ilt/pwa/lab-cloud-firestore#9_optional_take_the_app_offline\r\n * https://www.npmjs.com/package/idb\r\n */\n// Sub-modules\n\n\n\n\n\n // Functions\n\n\n\n\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/js/index.js?");

/***/ }),

/***/ "./cannlytics_console/assets/js/intake/intake.js":
/*!*******************************************************!*\
  !*** ./cannlytics_console/assets/js/intake/intake.js ***!
  \*******************************************************/
/*! exports provided: intake */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"intake\", function() { return intake; });\n/**\n * Cannlytics Console (v1.0.0): intake.js\n * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)\n * Author: Keegan Skeate\n * Created: 12/3/2020\n */\n// import Chart from 'chart.js';\n// TODO: Get transfers\n// TODO: search transfers\n// TODO: Create transfer\n// TODO: Edit transfer\n// TODO: Delete transfer\n// TODO: Get projects\n// TODO: Search projects\n// TODO: Create project\n// TODO: Edit project\n// TODO: Delete project\nvar intake = {\n  initialize() {\n    // console.log(this.getData())\n    console.log('Initializing intake..');\n    this.drawProgressGraph(); // var data = cannlyticsConsole.getData()\n    // cannlyticsConsole.renderGraph('myChart', data)\n  },\n\n  drawProgressGraph() {\n    var data = {\n      datasets: [{\n        data: [10, 20],\n        backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)'],\n        borderColor: ['rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)'],\n        borderWidth: 1\n      }],\n      labels: ['In-Transit', 'Received']\n    }; // TODO: Get from Firestore\n\n    var ctx = document.getElementById('graph-progress');\n    var myPieChart = new Chart(ctx, {\n      type: 'pie',\n      data: data,\n      options: {\n        cutoutPercentage: 50\n      }\n    });\n  },\n\n  // TODO: Get data\n  getData() {\n    return [15339, 21345, 18483, 24003, 23489, 24092, 12034];\n  },\n\n  // TODO: Render graphs\n  renderGraph(id, data) {\n    var ctx = document.getElementById(id); // eslint-disable-next-line no-unused-vars\n\n    var myChart = new Chart(ctx, {\n      type: 'line',\n      data: {\n        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],\n        datasets: [{\n          data: data,\n          lineTension: 0,\n          backgroundColor: 'transparent',\n          borderColor: '#007bff',\n          borderWidth: 4,\n          pointBackgroundColor: '#007bff'\n        }]\n      },\n      options: {\n        scales: {\n          yAxes: [{\n            ticks: {\n              beginAtZero: false\n            }\n          }]\n        },\n        legend: {\n          display: false\n        }\n      }\n    });\n  }\n\n};\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/js/intake/intake.js?");

/***/ }),

/***/ "./cannlytics_console/assets/js/logistics/logistics.js":
/*!*************************************************************!*\
  !*** ./cannlytics_console/assets/js/logistics/logistics.js ***!
  \*************************************************************/
/*! exports provided: logistics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logistics\", function() { return logistics; });\n/**\n * Cannlytics Console (v1.0.0): logistics.js\n * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)\n * Author: Keegan Skeate\n * Created: 12/9/2020\n * Resources:\n *    https://github.com/fullcalendar/fullcalendar-example-projects/blob/master/webpack/src/main.js\n *    https://fullcalendar.io/docs/handlers\n */\n// import { Calendar } from '@fullcalendar/core';\n// import interactionPlugin from '@fullcalendar/interaction';\n// import dayGridPlugin from '@fullcalendar/daygrid';\n// import timeGridPlugin from '@fullcalendar/timegrid';\n// import listPlugin from '@fullcalendar/list';\nvar logistics = {\n  initialize() {\n    console.log('Initializing logistics..'); // this.drawCalendar();\n\n    var script = document.createElement('script');\n    script.src = 'https://cdn.jsdelivr.net/npm/fullcalendar@5.4.0/main.min.js';\n    script.defer = true; // window.initMap = this.drawCalendar;\n\n    document.head.appendChild(script);\n    document.addEventListener('DOMContentLoaded', function () {\n      var calendarEl = document.getElementById('calendar');\n      var calendar = new FullCalendar.Calendar(calendarEl, {\n        initialView: 'dayGridMonth',\n        initialDate: '2020-12-07',\n        headerToolbar: {\n          left: 'prev,next today',\n          center: 'title',\n          right: 'dayGridMonth,timeGridWeek,timeGridDay'\n        },\n        events: [{\n          title: 'All Day Event',\n          start: '2020-12-01'\n        }, {\n          title: 'Long Event',\n          start: '2020-12-07',\n          end: '2020-12-10'\n        }, {\n          groupId: '999',\n          title: 'Repeating Event',\n          start: '2020-12-09T16:00:00'\n        }, {\n          groupId: '999',\n          title: 'Repeating Event',\n          start: '2020-12-16T16:00:00'\n        }, {\n          title: 'Conference',\n          start: '2020-12-11',\n          end: '2020-12-13'\n        }, {\n          title: 'Meeting',\n          start: '2020-12-12T10:30:00',\n          end: '2020-12-12T12:30:00'\n        }, {\n          title: 'Lunch',\n          start: '2020-12-12T12:00:00'\n        }, {\n          title: 'Meeting',\n          start: '2020-12-12T14:30:00'\n        }, {\n          title: 'Birthday Party',\n          start: '2020-12-13T07:00:00'\n        }, {\n          title: 'Click for Google',\n          url: 'http://google.com/',\n          start: '2020-12-28'\n        }]\n      });\n      calendar.render();\n    });\n  },\n\n  initializeLogs() {\n    console.log('Initialize logs...');\n  },\n\n  initializeAnalytics() {\n    console.log('Initialize analytics...');\n  },\n\n  initializeMap() {\n    var script = document.createElement('script');\n    var API_KEY = 'AIzaSyB-ZjpD7MgK9mMwxQgsyr5wh-4xciJzIHw'; // TODO: Get from Firestore.\n\n    script.src = \"https://maps.googleapis.com/maps/api/js?key=\".concat(API_KEY, \"&callback=initMap\");\n    script.defer = true;\n    window.initMap = this.drawMap;\n    document.head.appendChild(script);\n  },\n\n  drawCalendar() {\n    var calendarEl = document.getElementById('calendar');\n    if (!calendarEl) return;\n    var calendar = new Calendar(calendarEl, {\n      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],\n      headerToolbar: {\n        left: 'prev,next today',\n        center: 'title',\n        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'\n      },\n      initialDate: '2020-12-10',\n      // TODO: Set current day.\n      navLinks: true,\n      // can click day/week names to navigate views\n      editable: true,\n      dayMaxEvents: true,\n      // allow \"more\" link when too many events\n      // TODO: Get events from Firestore.\n      events: [{\n        title: 'Meeting',\n        start: '2020-12-12T10:30:00',\n        end: '2020-12-12T12:30:00'\n      }],\n      dateClick: function dateClick() {\n        console.log('a day has been clicked!');\n      }\n    });\n    calendar.render();\n  },\n\n  drawMap() {\n    var locations = [[\"USA\", 39.8283, -98.5795, 1]]; // TODO: Get location of transfers from Firestore\n\n    var map = new google.maps.Map(document.getElementById('map'), {\n      zoom: 4,\n      center: new google.maps.LatLng(39.8283, -98.5795),\n      // TODO: Get organization's latitude and longitude\n      mapTypeId: google.maps.MapTypeId.ROADMAP\n    });\n    var infoWindow = new google.maps.InfoWindow();\n    var marker, i;\n\n    for (i = 0; i < locations.length; i++) {\n      marker = new google.maps.Marker({\n        position: new google.maps.LatLng(locations[i][1], locations[i][2]),\n        map: map\n      });\n      google.maps.event.addListener(marker, 'click', function (marker, i) {\n        return function () {\n          infoWindow.setContent(locations[i][0]);\n          infoWindow.open(map, marker);\n        };\n      }(marker, i));\n    }\n  }\n\n};\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/js/logistics/logistics.js?");

/***/ }),

/***/ "./cannlytics_console/assets/js/settings/account.js":
/*!**********************************************************!*\
  !*** ./cannlytics_console/assets/js/settings/account.js ***!
  \**********************************************************/
/*! exports provided: accountSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"accountSettings\", function() { return accountSettings; });\n/**\n * account.js | Cannlytics Console (v1.0.0)\n * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)\n * Author: Keegan Skeate\n * Created: 1/2/2021\n */\nvar accountSettings = {\n  saveAccount(data) {\n    /* \n    * Saves a user's account fields.\n    */\n    console.log('Todo: Save user fields to firestore!');\n  },\n\n  exportAccount(data) {\n    /* \n    * Exports a user's data.\n    */\n    console.log('Export all of a users data to Excel.');\n  },\n\n  uploadAccountPhoto() {\n    /* \n    * Upload an image for a user's account.\n    */\n    console.log('Todo: Upload photo!');\n  },\n\n  createPin(data) {\n    /* \n    * Create a pin for a user.\n    */\n    console.log('Todo: Create  apin!');\n  },\n\n  uploadSignature(data) {\n    /* \n    * Upload a signature for a user.\n    */\n    var collection = db.collection('organizations');\n    return collection.add(data);\n  },\n\n  deleteSignature(data) {\n    /* \n    * Remove a signature from a user.\n    */\n    var collection = db.collection('organizations');\n    return collection.add(data);\n  }\n\n};\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/js/settings/account.js?");

/***/ }),

/***/ "./cannlytics_console/assets/js/settings/settings.js":
/*!***********************************************************!*\
  !*** ./cannlytics_console/assets/js/settings/settings.js ***!
  \***********************************************************/
/*! exports provided: settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\n/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../firebase.js */ \"./cannlytics_console/assets/js/firebase.js\");\n/* harmony import */ var _account_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account.js */ \"./cannlytics_console/assets/js/settings/account.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * Cannlytics Console (v1.0.0): settings.js\n * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)\n * Author: Keegan Skeate\n * Created: 12/3/2020\n */\n // import { v4 as uuidv4 } from 'uuid';\n// const id = uuidv4();\n\n\nvar coreSettings = {\n  newOrganization() {\n    // const id = uuidv4();\n    console.log('TODO: Create new org');\n  },\n\n  addOrganization(data) {\n    /* \n    * Add an organizations.\n    */\n    var collection = _firebase_js__WEBPACK_IMPORTED_MODULE_0__[\"db\"].collection('organizations');\n    return collection.add(data);\n  },\n\n  getOrganizations() {\n    /* \n    * Get all of a user's organizations.\n    */\n    _firebase_js__WEBPACK_IMPORTED_MODULE_0__[\"auth\"].onAuthStateChanged(user => {\n      if (user) {\n        // console.log(user.uid);\n        // TODO: Get all of a users/{id} org_id's.\n        // TODO: Get all organizations/{id} documents for org_id's.\n        console.log('Get all organizations for user id:', user.uid); // const query = db.collection('organizations').limit(50);\n        // query.onSnapshot(snapshot => {\n        //   if (!snapshot.size) return render();\n        //   snapshot.docChanges.forEach(change => {\n        //     if (change.type === 'added') {\n        //       render(change.doc);\n        //     }\n        //     else if (change.type === 'removed') {\n        //       document.getElementById(change.doc.id).remove();\n        //     }\n        //   });\n        // });\n      }\n    }); //  idbStore.get('user').then((data) => {\n    //   console.log('IDB User:', data);\n    //   console.log('Getting organizations!');\n    //  });\n  },\n\n  archiveOrganizations() {\n    /* \n    * Archive one of a user's organizations.\n    */\n    // TODO: Add to archived organizations.\n    var collection = firebase.firestore().collection('ships');\n    return collection.doc(id).delete().catch(function (error) {\n      console.error('Error removing document: ', error);\n    });\n  },\n\n  updateOrganization() {\n    /* \n    * Update a user's organizations.\n    */\n  },\n\n  logAction() {\n    /* \n    * Record time and user of any activity.\n    */\n  },\n\n  sendFeedback() {\n    /*\n     * Send feedback through Firestore-triggered Google Cloud Function.\n     */\n    sessionStorage.getItem('user', {}); // TODO: Get user data.\n\n    var message = document.getElementById('feedback-message').value;\n    var timestamp = Date.now().toString(); // TODO: Use ISO time instead.\n\n    var code = Math.random().toString(36).slice(-3);\n    var data = {\n      name: user.name,\n      email: user.email,\n      organization: user.organization,\n      body: message,\n      from: 'contact@cannlytics.com',\n      reply: 'contact@cannlytics.com',\n      recipients: ['contact@cannlytics.com'],\n      subject: 'New Cannlytics Console feedback!',\n      promo: code\n    };\n    _firebase_js__WEBPACK_IMPORTED_MODULE_0__[\"db\"].collection('users').doc(user.uid).collection('feedback').doc(timestamp).set(data).then(() => {// TODO: Show toast: \"Thank you for your feedback! ** Save code ${code} for 1 free hour of support.\"\n    }).catch(error => {// Handle error\n    });\n  }\n\n};\nvar settings = _objectSpread(_objectSpread({}, coreSettings), _account_js__WEBPACK_IMPORTED_MODULE_1__[\"accountSettings\"]);\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/js/settings/settings.js?");

/***/ }),

/***/ "./cannlytics_console/assets/js/settings/theme.js":
/*!********************************************************!*\
  !*** ./cannlytics_console/assets/js/settings/theme.js ***!
  \********************************************************/
/*! exports provided: theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"theme\", function() { return theme; });\n/**\n * Cannlytics Console (v1.0.0): theme.js\n * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)\n * Author: Keegan Skeate\n * Created: 12/6/2020\n */\nvar theme = {\n  changeTheme() {\n    /*\n     * Change the UI theme.\n     */\n    var theme = localStorage.getItem('theme');\n\n    if (!theme) {\n      var hours = new Date().getHours();\n      var dayTime = hours > 6 && hours < 20;\n      theme = dayTime ? 'light' : 'dark';\n    }\n\n    var newTheme = theme === 'light' ? 'dark' : 'light';\n    toggleTheme(newTheme);\n    localStorage.setItem('theme', newTheme);\n  },\n\n  setInitialTheme() {\n    /*\n     * Set th initial UI theme.\n     */\n    if (typeof Storage !== 'undefined') {\n      var theme = localStorage.getItem('theme');\n\n      if (!theme) {\n        var hours = new Date().getHours();\n        var dayTime = hours > 6 && hours < 20;\n        if (!dayTime) toggleTheme('dark');\n        return;\n      }\n\n      toggleTheme(theme);\n      localStorage.setItem('theme', theme);\n    }\n  }\n\n};\n\nfunction toggleTheme(theme) {\n  /*\n   * Toggle the UI theme.\n   */\n  if (theme === 'light') {\n    document.body.className = 'base';\n  } else if (!hasClass(document.body, 'dark')) {\n    document.body.className += ' dark';\n  }\n}\n\nfunction hasClass(element, className) {\n  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;\n}\n\n//# sourceURL=webpack://cannlytics/./cannlytics_console/assets/js/settings/theme.js?");

/***/ }),

/***/ 0:
/*!**************************************************************************************************************************************************!*\
  !*** multi ./cannlytics_console/assets/css/console.scss ./cannlytics_console/assets/css/cannlytics.scss ./cannlytics_console/assets/js/index.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./cannlytics_console/assets/css/console.scss */\"./cannlytics_console/assets/css/console.scss\");\n__webpack_require__(/*! ./cannlytics_console/assets/css/cannlytics.scss */\"./cannlytics_console/assets/css/cannlytics.scss\");\nmodule.exports = __webpack_require__(/*! ./cannlytics_console/assets/js/index.js */\"./cannlytics_console/assets/js/index.js\");\n\n\n//# sourceURL=webpack://cannlytics/multi_./cannlytics_console/assets/css/console.scss_./cannlytics_console/assets/css/cannlytics.scss_./cannlytics_console/assets/js/index.js?");

/***/ })

/******/ });