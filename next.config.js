const { ASSET_HOST } = process.env

// for those who using CDN
const assetPrefix = ASSET_HOST || ''

const withSass = require('@zeit/next-sass')

module.exports = withSass({
  assetPrefix,
  target: 'serverless',
  env: {
    PLATFORM_API_URL: '#{PLATFORM_API_URL}#',
    REDIRECT_URL: '#{REDIRECT_URL}#',
    EDIT_PROFILE_REDIRECT_URL: '#{EDIT_PROFILE_REDIRECT_URL}#',
    OCP_APIM_SUBSCRIPTION_KEY: '#{OCP_APIM_SUBSCRIPTION_KEY}#',
    SERVICE_NOW_EMAIL: '#{SERVICE_NOW_EMAIL}#'
  },
  publicRuntimeConfig: {
    ROOT_URL: '#{ROOT_URL}#',
    REDIRECT_URL: '#{REDIRECT_URL}#',
    EDIT_PROFILE_REDIRECT_URL: '#{EDIT_PROFILE_REDIRECT_URL}#',
    B2C_SIGNIN_URL: '#{B2C_SIGNIN_URL}#',
    B2C_SIGNUP_URL: '#{B2C_SIGNUP_URL}#',
    B2C_PASSWORD_RESET_URL: '#{B2C_PASSWORD_RESET_URL}#',
    B2C_PASSWORD_CHANGE_URL: '#{B2C_PASSWORD_CHANGE_URL}#',
    B2C_PROFILE_EDIT_URL: '#{B2C_PROFILE_EDIT_URL}#',
    B2C_SIGNIN_VERIFY_URL: '#{B2C_SIGNIN_VERIFY_URL}#',
    APPID_URL: '#{APPID_URL}#',
    CLIENT_ID: '#{CLIENT_ID}#',
    INSTRUMENTATION_KEY: '#{INSTRUMENTATION_KEY}#'
  },
  webpack: (config, { dev }) => {
    config.output.publicPath = `${assetPrefix}${config.output.publicPath}`

    return config
  }
})
