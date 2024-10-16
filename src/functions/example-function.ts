import { easyBusboy } from 'easy-busboy';
import { debug } from 'firebase-functions/logger';
import { ExampleService } from '../services/example-service';
import type { Response, Request } from 'express';

export const exampleFunction = async (request: Request, response: Response) => {
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
