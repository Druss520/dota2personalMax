const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: './index.js'
  },
  module: {  
    rules: [
      {
        test:/\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.tsx?$/,
        loaders: ['ts-loader'],
        include: [
            path.resolve(__dirname, 'src')
        ]
      }
    ]  
  },  
  resolve: {  
      extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.tsx']  
  } ,
  plugins: [
    new WebpackPwaManifest({
      name: 'Manifest',
      short_name: 'Mnfst',
      description: 'An isomorphic progressive web blog built by React & Node',
      background_color: '#333',
      theme_color: '#333',
      filename: 'manifest.[hash:8].json',
      publicPath: '/',
      icons: [
        {
          src: path.resolve('./', 'icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: path.join('icons')
        }
      ],
      ios: {
        'apple-mobile-web-app-title': 'Manifest1',
        'apple-mobile-web-app-status-bar-style': '#000',
        'apple-mobile-web-app-capable': 'yes',
        'apple-touch-icon': 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3183691098,1018415343&fm=27&gp=0.jpg',
      },
    })
  ]
}