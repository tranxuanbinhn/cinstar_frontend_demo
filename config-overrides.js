const { override, useBabelRc, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    '~': path.resolve(__dirname, 'src'),
    '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled'),
  })
);
