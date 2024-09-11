module.exports = {
  // Other configurations...
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules\/wavesurfer.js/,
        use: ['source-map-loader'],
      },
    ],
  },
};
