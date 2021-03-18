module.exports = {
    roots: ['<rootDir>'],

    coverageDirectory: 'coverage',
    collectCoverageFrom: ['<rootDir>/src/app/controllers/**/*.js'],

    testEnvironment: 'node',

    moduleFileExtensions: ['js', 'json'],

    transform: {
        '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin',
    },
};
