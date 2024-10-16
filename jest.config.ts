import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  roots: ['src/', '__test__/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/functions/*.{js,jsx}',
    'src/services/*.{js,jsx}',
    'src/storage/*.{js,jsx}',
  ],
};

export default config;
