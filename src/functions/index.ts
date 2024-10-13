import { easyBusboy } from 'easy-busboy';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { ExampleService } from '../lib/example-service';

const app = express();

app.post('/', async (request, response) => {
  const { fields, files } = await easyBusboy(request);

  const exampleService = new ExampleService();
  exampleService.process();

  response.send({ fields, files, example: exampleService.toString() });
});

export const api = onRequest(app);
