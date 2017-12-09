module.exports = {
    entry: './app.js',
    output: {
      filename: './bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js?$/, 
          loader: 'babel-loader', 
          exclude: /node_modules/ ,
          options: {
            presets: ['stage-2', 'react']
          }
        }
      ]
    }
  };