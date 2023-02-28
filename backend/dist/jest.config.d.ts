declare const jestConfig: {
    preset: string;
    moduleFileExtensions: string[];
    rootDir: string;
    testRegex: string;
    transform: {
        '^.+\\.(t|j)s$': string;
    };
    collectCoverageFrom: string[];
    coverageDirectory: string;
    testEnvironment: string;
    transformIgnorePatterns: string[];
    moduleDirectories: string[];
    roots: string[];
    modulePaths: string[];
    moduleNameMapper: {
        [key: string]: string | string[];
    };
};
export default jestConfig;
