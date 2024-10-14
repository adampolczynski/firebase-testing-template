import { easyBusboy } from 'easy-busboy';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { debug } from 'firebase-functions/logger';
import { ExampleService } from '../lib/example-service';
import { IncomingMessage } from 'http';
import type { Response, Request } from 'express';

const app = express();

export const exampleCloudFunction = async (
  request: Request,
  response: Response
) => {
  debug(`exampleFunction init`);
  const { fields, files } = await easyBusboy(request);
  debug(
    `easyBusboy response keys: ${Object.keys(files)}, ${Object.keys(fields)}`
  );

  const exampleService = new ExampleService();
  exampleService.process();
  debug(`exampleService response: ${exampleService.toString()}`);

  response.send({ fields, files, example: exampleService.toString() });
};

app.post('/', exampleCloudFunction);

export const api = onRequest(app);
