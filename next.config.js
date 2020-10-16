const { ASSET_HOST } = process.env

// for those who using CDN
const assetPrefix = ASSET_HOST || ''

const withSass = require('@zeit/next-sass')

module.exports = withSass({
  assetPrefix,
  target: 'serverless',
  webpack: (config, { dev }) => {
    config.output.publicPath = `${assetPrefix}${config.output.publicPath}`

    const _config = config.entry;

    config.entry = async () => {
      const entries = await _config()

      if (entries['main.js'] && !entries['main.js'].includes('./src/polyfills.js')) {
        entries['main.js'].unshift('./src/polyfills.js');
      }

      return entries
    }

    return config
  }
})
