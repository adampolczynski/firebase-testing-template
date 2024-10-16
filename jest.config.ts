import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'node',
  roots: ['dist/', '__test__/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'dist/functions/*.{js,jsx}',
    'dist/services/*.{js,jsx}',
    'dist/storage/*.{js,jsx}',
  ],
};

export default config;
