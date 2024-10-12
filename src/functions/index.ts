import { easyBusboy } from 'easy-busboy';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { ExampleService } from '../lib/example-service';

const app = express();

app.post('/', async (request, response) => {
  const { fields, files } = await easyBusboy(request);

  const exampleService = new ExampleService();
  exampleService.addField('test', 123);
  exampleService.addField('another', { i: 123 });

  response.send({ fields, files, example: exampleService.toString() });
});

export const api = onRequest(app);
