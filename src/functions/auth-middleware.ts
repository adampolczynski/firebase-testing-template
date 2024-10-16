import { debug } from 'firebase-functions/logger';
import type { Response, Request, NextFunction } from 'express';
import { auth } from 'firebase-admin';

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  debug(`authMiddleware init`);

  try {
    const { authorization } = request.headers;
    const { 1: idToken } = authorization?.split('Bearer ') ?? { 1: null };

    if (!idToken) {
      throw new Error('auth error');
    }

    const decodedToken = await auth().verifyIdToken(idToken);

    (request as any).locals = { user: decodedToken };

    next();
  } catch (error) {
    console.log(error);

    response.sendStatus(401);
  }
};
