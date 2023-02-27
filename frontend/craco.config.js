// https://plusreturn.com/blog/how-to-configure-a-path-alias-in-a-react-typescript-app-for-cleaner-imports/
const path = require('path');
// https://github.com/mrsteele/dotenv-webpack
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
  ],
  webpack: {
    plugins: [new Dotenv()],
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@public': path.resolve(__dirname, 'public/')
    }
  }
};
