import { debug } from 'firebase-functions/logger';
import { ExampleService } from '../services/example-service';
import type { Response, Request, NextFunction } from 'express';

export const exampleMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  debug(`exampleMiddleware init`);

  const exampleService = new ExampleService();
  exampleService.process();
  debug(`exampleService response: ${exampleService.toString()}`);

  next();
};

export const applyExampleMiddleware =
  (handler: (req: Request, res: Response) => void) =>
  (req: Request, res: Response) => {
    return exampleMiddleware(req, res, () => {
      return handler(req, res);
    });
  };
