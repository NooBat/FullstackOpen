import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import * as serviceAccount from './ServiceAccount.json';

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
