const path = require('path');

const webConfig =  {
  entry: './build/src/index.js',
  mode: "production",
  target: 'web',
  node: {
    // Prevent embedded winston to throw error with FS not existing.
    fs: 'empty',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'Dash',
    filename: 'dash.min.js',
    // fixes ReferenceError: window is not defined
    globalObject: "(typeof self !== 'undefined' ? self : this)"
  }
}

module.exports = webConfig;
