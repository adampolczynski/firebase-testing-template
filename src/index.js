"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const firebase_admin_1 = require("firebase-admin");
// import { parse as parseEnv, config as envConfig } from 'dotenv';
const firestore_1 = require("firebase/firestore");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const adminApp = (0, firebase_admin_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
