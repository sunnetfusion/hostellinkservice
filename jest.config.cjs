module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }]
  },
  moduleNameMapper: {
    '\\.(css|less|scss|svg)$': 'identity-obj-proxy'
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/']
};