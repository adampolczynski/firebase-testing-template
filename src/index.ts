import { config } from '@dotenvx/dotenvx';
import { api } from './functions';
import './services/firebase-wrapper';

config();

// const { defineSecret } = require('firebase-functions/params');
// const apiKey = defineSecret('FB_API_KEY');
//  safe place to access a parameter's value.
// const { onInit } = require('firebase-functions/v2/core');

const env = process.env;

if (!env) {
  process.exit(1);
}

export default { api };
