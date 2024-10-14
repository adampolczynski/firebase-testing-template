import { easyBusboy } from 'easy-busboy';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { ExampleService } from '../lib/example-service';
import { IncomingMessage } from 'http';
import type { Response } from 'express';

const app = express();

export const exampleCloudFunction = async (
  request: IncomingMessage,
  response: Response
) => {
  console.debug(request, request.on);
  const { fields, files } = await easyBusboy(request);

  const exampleService = new ExampleService();
  exampleService.process();

  response.send({ fields, files, example: exampleService.toString() });
};

app.post('/', exampleCloudFunction);

export const api = onRequest(app);
