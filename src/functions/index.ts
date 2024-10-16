import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';

import { exampleMiddleware } from './middleware-functions';
import { exampleFunction, exampleFunction2 } from './example-functions';
import { authLoginFunction, authRegisterFunction } from './auth-functions';
import { authMiddleware } from './auth-middleware-functions';

const expressApp = express();

// some examples
expressApp.get('/', [exampleMiddleware], exampleFunction2);
expressApp.get('/private', [authMiddleware], exampleFunction2);
expressApp.post('/', exampleFunction);

// auth related functions
expressApp.post('/login', authLoginFunction);
expressApp.post('/register', authRegisterFunction);

// protected routes
expressApp.get('/protected', [authMiddleware], exampleFunction2);

export const api = onRequest(expressApp);
