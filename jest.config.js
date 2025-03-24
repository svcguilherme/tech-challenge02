export default {
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['js', 'ts'],
};