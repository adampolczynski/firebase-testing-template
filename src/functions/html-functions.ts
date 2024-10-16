import type { Response, Request } from 'express';
import { debug } from 'firebase-functions/logger';
import path from 'path';

export const htmlLoginFunction = async (
  request: Request,
  response: Response
) => {
  debug('htmlLoginFunction');
  response.sendFile(path.join(__dirname, '../html-templates/login.html'));
};

export const htmlRegisterFunction = async (
  request: Request,
  response: Response
) => {
  debug('htmlRegisterFunction');
  response.sendFile(path.join(__dirname, '../html-templates/register.html'));
};
