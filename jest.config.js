module.exports = {
  preset: 'react-native',
  testMatch: ['**/**.test.js'],
  moduleNameMapper: {
    'styled-components':
      '<rootDir>/node_modules/styled-components/dist/styled-components.native.cjs.js',
  },
  transformIgnorePatterns: ['node_modules/?!'],
  setupFiles: ['<rootDir>/__test__/setup.js'],
  cacheDirectory: '<rootDir>/.jestcache',
}
