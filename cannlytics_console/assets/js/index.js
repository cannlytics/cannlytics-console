/**
 * Cannlytics Console (v1.0.0): index.js
 * Licensed under GPLv3 (https://github.com/cannlytics/cannlytics_console/blob/main/LICENSE)
 * Author: Keegan Skeate
 * Created: 12/3/2020
 * Resources:
 * https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
 * https://stackoverflow.com/questions/36955441/indexeddb-creating-a-database-and-adding-content-failed-to-execute-transaction
 * https://developers.google.com/web/ilt/pwa/lab-cloud-firestore#9_optional_take_the_app_offline
 * https://www.npmjs.com/package/idb
 */

import { app } from './app/app.js';
import { auth } from './auth/auth.js';
import { analysis } from './analysis/analysis.js'
import { dashboard } from './dashboard/dashboard.js';
import { intake } from './intake/intake.js';
import { logistics } from './logistics/logistics.js';
import { settings } from './settings/settings.js';
import { theme } from './settings/theme.js';

export {
  app,
  auth,
  analysis,
  dashboard,
  intake,
  logistics,
  settings,
  theme,
}
