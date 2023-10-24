import type { Config } from 'jest';

const config: Config = {
  // preset: "@shelf/jest-dynamodb",
  rootDir: './src',
  verbose: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^@libs/(.*)$': '<rootDir>/libs/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@api/(.*)$': '<rootDir>/api/$1',
    '^@dynamodb/(.*)$': '<rootDir>/dynamodb/$1',
    '^@interfaces/(.*)$': '<rootDir>/interfaces/$1',
    '^@resources/(.*)$': '<rootDir>/resources/$1',
    '^@functions/(.*)$': '<rootDir>/functions/$1',
  },
};

export default config;