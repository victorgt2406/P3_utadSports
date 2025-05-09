module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    transform: {
        '^.+\\.ts?$': ['ts-jest', { diagnostics: false }],
      },
};
