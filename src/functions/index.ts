import { easyBusboy } from 'easy-busboy';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';

const app = express();

app.post('/', async (request, response) => {
  const { fields, files } = await easyBusboy(request);
  response.send({ fields, files });
});

export const api = onRequest(app);
