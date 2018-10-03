module.exports = {
    "roots": [
        "<rootDir>/src/tests"
    ],
    "testURL": "http://localhost",
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "testPathIgnorePatterns": ["<rootDir>/node_modules/"],
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@common/(.*)$": "<rootDir>/../common/bin/$1"
    },
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ]
}