import express from 'express';
import { initializeApp, FirebaseOptions } from 'firebase/app';
import * as fbAdmin from 'firebase-admin';
import { getFirestore } from 'firebase/firestore';

import { config } from '@dotenvx/dotenvx';
import { onRequest } from 'firebase-functions/v2/https';
import {
  authLoginFunction,
  authRegisterFunction,
  exampleFunction,
  exampleFunction2,
  exampleMiddleware,
  authMiddleware,
  htmlLoginFunction,
  htmlRegisterFunction,
} from './functions';

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

// auth related functions
expressApp.get('/login', htmlLoginFunction);
expressApp.get('/register', htmlRegisterFunction);
expressApp.post('/login', authLoginFunction);
expressApp.post('/register', authRegisterFunction);

// protected routes
expressApp.get('/protected', [authMiddleware], exampleFunction2);

export const app = initializeApp(firebaseConfig);

export const admin = fbAdmin.initializeApp({ projectId: env.FB_PROJECT_ID });
export const auth = admin.auth;
export const db = getFirestore(app);

export const api = onRequest(expressApp);
