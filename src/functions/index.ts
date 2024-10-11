import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';

const app = express();

app.get('/', (request, response) => {
  response.send('Hello from Firebase cloud function!');
});

export const api = onRequest(app);
