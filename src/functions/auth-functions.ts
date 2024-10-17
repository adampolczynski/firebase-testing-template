import type { Response, Request, NextFunction } from 'express';
import { auth } from '../services/firebase-wrapper';
import { debug } from 'firebase-functions/logger';

export const authLoginFunction = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body;
  debug(`requesting authLoginFunction with ${email} and ${password}`);

  if (!email || !password) {
    next('validation error');
  }
  response.status(200).json({ status: 'success' });
};

export const authRegisterFunction = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body;
  debug(`requesting authRegisterFunction with ${email} and ${password}`);

  if (!email || !password) {
    next(new Error('validation error'));
  }

  const user = await auth().createUser({ email, password });
  debug(`${user.email} createUser success`);

  response.status(200).json({ status: 'success' });
};
