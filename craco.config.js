const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        fs: false,
        path: require.resolve('path-browserify'),
        child_process: false,
        util: require.resolve('util/'),
        stream: require.resolve('stream-browserify'),
      };
      return webpackConfig;
    },
  },
};
