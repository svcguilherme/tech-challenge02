export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.js'],
  testEnvironment: 'node',
};