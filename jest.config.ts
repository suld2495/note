export default {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(png|pdf|svg|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|styl|less|sass|scss|svg)$': 'identity-obj-proxy', // 해당 설정
  },
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  testMatch: ['<rootDir>/**/*.test.(js|jsx|ts|tsx)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/', 'dist', 'build'],
};
