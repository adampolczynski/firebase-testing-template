import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';

const PORT = 3000;

const app = express();

app.get('/', (request, response) => {
  response.send('Hello from Firebase cloud function!');
});

app.listen(PORT, () => {
  console.debug(`Listeing on ${PORT}`);
});

export const api = onRequest(app);
