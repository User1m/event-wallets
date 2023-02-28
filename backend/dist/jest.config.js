"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("ts-jest");
const tsconfig_json_1 = require("./tsconfig.json");
const jestConfig = {
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    transformIgnorePatterns: ['node_modules'],
    moduleDirectories: ['node_modules', '<rootDir>'],
    roots: ['<rootDir>'],
    modulePaths: [tsconfig_json_1.compilerOptions.baseUrl],
    moduleNameMapper: ts_jest_1.pathsToModuleNameMapper(tsconfig_json_1.compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
};
exports.default = jestConfig;
//# sourceMappingURL=jest.config.js.map