# Upload-Sourcemap-Plugin
Upload the sourcemap files after your project is packaged

## Installation
```
yarn add --dev upload-my-sourcemap-plugin
```
## Basic Usage
```javascript
// webpack.prod.config.js
const UploadSourceMapPlugin = require('upload-source-map-plugin')

module.exports = merge(baseConfig, {
  //..
  plugins: [
    ...baseConfig.plugins,
    new UploadSourceMapPlugin({
      targetUrl: 'https://xxx/api/upload', // upload api url
      buildPath: path.join(process.cwd(), 'dist') // The folder path of the packaged product
    })
  ]
})

```

