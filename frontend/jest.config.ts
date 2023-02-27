import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
};

export default jestConfig;

// https://github.com/kulshekhar/ts-jest/issues/269#issuecomment-608245812
// https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/

// moduleNameMapper: {
//     "^@src/(.*)$": "<rootDir>/src/$1",
//     "^@common/(.*)$": "<rootDir>/src/common/$1",
//     "^@modules/(.*)$": "<rootDir>/src/modules/$1"
// },
