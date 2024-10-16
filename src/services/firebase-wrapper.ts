import { initializeApp, FirebaseOptions } from 'firebase/app';
import * as fbAdmin from 'firebase-admin';
import { getFirestore } from 'firebase/firestore';

const { env } = process;

const firebaseConfig: FirebaseOptions = {
  apiKey: env.FB_API_KEY,
  authDomain: env.FB_AUTH_DOMAIN,
  projectId: env.FB_PROJECT_ID,
  storageBucket: env.FB_STORAGE_BUCKET,
  messagingSenderId: env.FB_MESSAGING_SENDER_ID,
  appId: env.FB_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const admin = fbAdmin.initializeApp({ projectId: env.FB_PROJECT_ID });
export const auth = admin.auth;
export const db = getFirestore(app);
