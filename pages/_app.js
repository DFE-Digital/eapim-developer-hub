import 'react-app-polyfill/ie11'
import 'core-js/features/regexp'

import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import Content from '../content.json'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import styledNormalize from 'styled-normalize'
import { withRouter } from 'next/router'
import App from 'next/app'
import { withApplicationInsights } from '../src/components/withApplicationInsights'
import createStore from 'store/createStore'
import Layout from 'components/Layout'
import IdleTimer from 'components/common/IdleTimer'
import theme from 'theme'
import '../scss/main.scss'

import { msalConfig } from '../src/auth/config'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
`

class MyApp extends App {
  componentDidMount () {
    document.body.classList.add('js-enabled')
  }

  render () {
    const { Component, pageProps, router, store } = this.props
    const title = Content.PortalName

    const msalAuthConfig = {
      authority: publicRuntimeConfig.B2C_SIGNIN_URL,
      redirectUri: publicRuntimeConfig.REDIRECT_URL,
      postLogoutRedirectUri: publicRuntimeConfig.ROOT_URL,
      clientId: publicRuntimeConfig.CLIENT_ID
    }

    const msalRegisterConfig = {
      authority: publicRuntimeConfig.B2C_SIGNUP_URL,
      redirectUri: publicRuntimeConfig.REDIRECT_URL,
      clientId: publicRuntimeConfig.CLIENT_ID
    }

    const msalEditProfileConfig = {
      authority: publicRuntimeConfig.B2C_PROFILE_EDIT_URL,
      redirectUri: publicRuntimeConfig.EDIT_PROFILE_REDIRECT_URL,
      clientId: publicRuntimeConfig.CLIENT_ID
    }

    const msalForgotPasswordConfig = {
      authority: publicRuntimeConfig.B2C_PASSWORD_RESET_URL,
      redirectUri: publicRuntimeConfig.REDIRECT_URL,
      clientId: publicRuntimeConfig.CLIENT_ID
    }

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <link rel='shortcut icon' sizes='16x16 32x32 48x48' href='/assets/images/favicon.ico' type='image/x-icon' />
          <link rel='mask-icon' href='/assets/images/govuk-mask-icon.svg' color='#0b0c0c' />
          <link rel='apple-touch-icon' sizes='180x180' href='/assets/images/govuk-apple-touch-icon-180x180.png' />
          <link rel='apple-touch-icon' sizes='167x167' href='/assets/images/govuk-apple-touch-icon-167x167.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/assets/images/govuk-apple-touch-icon-152x152.png' />
          <link rel='apple-touch-icon' href='/assets/images/govuk-apple-touch-icon.png' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta property='og:title' content={title} />
          <script src='/assets/js/govuk-frontend.js' />
        </Helmet>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <GlobalStyle />
            <IdleTimer msalConfig={msalConfig(msalAuthConfig)} />
            <Layout msalConfig={msalConfig(msalAuthConfig)} msalRegisterConfig={msalConfig(msalRegisterConfig)}>
              <Component
                {...pageProps}
                store={store}
                router={router}
                msalConfig={msalConfig(msalAuthConfig)}
                msalEditProfileConfig={msalConfig(msalEditProfileConfig)}
                msalForgotPasswordConfig={msalConfig(msalForgotPasswordConfig)}
                msalRegisterConfig={msalConfig(msalRegisterConfig)}
              />
            </Layout>
          </Provider>
        </ThemeProvider>
      </>
    )
  }
}

export default withRedux(createStore)(
  withRouter(withApplicationInsights({
    instrumentationKey: publicRuntimeConfig.INSTRUMENTATION_KEY,
    isEnabled: true
  })(MyApp)))
