import { initializeApp as firebaseApp } from 'firebase/app';
import { initializeApp as firebaseAdminApp } from 'firebase-admin';
// import { parse as parseEnv, config as envConfig } from 'dotenv';
import { getFirestore } from 'firebase/firestore';
// import { api } from './functions';

// const env = envConfig({ path: '../.env' }).parsed;
// console.debug('env', env);
// if (!env) {
//   process.exit(1);
// }
const env = process.env;

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
};

const app = firebaseApp(firebaseConfig);
const adminApp = firebaseAdminApp(firebaseConfig);
const db = getFirestore(app);
