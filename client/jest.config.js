export const testEnvironment = "jsdom";
export const setupFilesAfterEnv = ["<rootDir>/jest.setup.js"];
export const transform = {
    "^.+\\.(js|jsx)$": "babel-jest",
};
export const moduleNameMapper = {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|svg)$": "<rootDir>/__mocks__/fileMock.js",
};