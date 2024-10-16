import { debug } from 'firebase-functions/logger';
import { ExampleService } from '../services/example-service';
import type { Response, Request, NextFunction } from 'express';

export const exampleMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  debug(`exampleMiddleware init`);
  debug(`req.locals ${(request as any).locals}`);

  next();
};
