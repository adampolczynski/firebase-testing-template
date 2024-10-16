import express from 'express';
import { initializeApp as firebaseApp, FirebaseOptions } from 'firebase/app';
import * as fbAdmin from 'firebase-admin';
import { getFirestore } from 'firebase/firestore';

import { config } from '@dotenvx/dotenvx';
import { onRequest } from 'firebase-functions/v2/https';
import {
  exampleFunction,
  exampleFunction2,
} from './functions/example-function';
import { exampleMiddleware } from './functions/example-middleware';
import { authMiddleware } from './functions/auth-middleware';

config();

// const { defineSecret } = require('firebase-functions/params');
// const apiKey = defineSecret('FB_API_KEY');
//  safe place to access a parameter's value.
// const { onInit } = require('firebase-functions/v2/core');

const env = process.env;

if (!env) {
  process.exit(1);
}

const firebaseConfig: FirebaseOptions = {
  apiKey: env.FB_API_KEY,
  authDomain: env.FB_AUTH_DOMAIN,
  projectId: env.FB_PROJECT_ID,
  storageBucket: env.FB_STORAGE_BUCKET,
  messagingSenderId: env.FB_MESSAGING_SENDER_ID,
  appId: env.FB_APP_ID,
};

const expressApp = express();
expressApp.get('/', [exampleMiddleware], exampleFunction2);
expressApp.get('/private', [authMiddleware], exampleFunction2);
expressApp.post('/', exampleFunction);

const app = firebaseApp(firebaseConfig);
const adminApp = fbAdmin.initializeApp({ projectId: env.FB_PROJECT_ID });
const db = getFirestore(app);

const api = onRequest(expressApp);

export default { api };
