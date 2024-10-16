import type { Response, Request } from 'express';
import { auth } from '../';
import { debug } from 'firebase-functions/logger';

export const authLoginFunction = async (
  request: Request,
  response: Response
) => {
  const { email, password } = request.body;
  debug(`requesting authLoginFunction with ${email} and ${password}`);

  if (!email || !password) {
    throw new Error('validation error');
  }
  response.sendStatus(200);
};

export const authRegisterFunction = async (
  request: Request,
  response: Response
) => {
  const { email, password } = request.body;
  debug(`requesting authRegisterFunction with ${email} and ${password}`);

  if (!email || !password) {
    throw new Error('validation error');
  }

  const user = await (auth() as any).createUserWithEmailAndPassword(
    email,
    password
  );
  debug(`${user.email} createUserWithEmailAndPassword success`);

  response.sendStatus(200);
};
