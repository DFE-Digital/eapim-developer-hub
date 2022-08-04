const { ASSET_HOST } = process.env

// for those who using CDN
const assetPrefix = ASSET_HOST || ''

module.exports = {
  assetPrefix,
  target: 'serverless', // this needs removing but breaks the build - is this because of static files?
  webpack: (config, { dev }) => {
    config.output.publicPath = `${assetPrefix}${config.output.publicPath}`

    return config
  }
}
