import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  roots: ['src/', '__test__/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};

export default config;
