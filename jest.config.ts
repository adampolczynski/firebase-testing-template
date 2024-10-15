import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  collectCoverageFrom: ['src/functions/*.{ts,tsx}', 'src/lib/*.{ts,tsx}'],
};

export default config;
