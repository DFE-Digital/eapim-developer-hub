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
import theme from 'theme'
import '../scss/main.scss'

import { msalConfig } from '../src/auth/config'
import AuthContext from '../src/auth/context'
import { signIn, signOut } from '../src/actions/authenticate'

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
      authority: process.env.NEXT_PUBLIC_B2C_SIGNIN_URL,
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
      postLogoutRedirectUri: `${process.env.NEXT_PUBLIC_ROOT_URL}/logged-out`,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID
    }

    const msalAuthVerfiyConfig = {
      authority: process.env.NEXT_PUBLIC_B2C_SIGNIN_VERIFY_URL,
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID
    }

    const msalRegisterConfig = {
      authority: process.env.NEXT_PUBLIC_B2C_SIGNUP_URL,
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID
    }

    const msalEditProfileConfig = {
      authority: process.env.NEXT_PUBLIC_B2C_PROFILE_EDIT_URL,
      redirectUri: process.env.NEXT_PUBLIC_EDIT_PROFILE_REDIRECT_URL,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID
    }

    const msalForgotPasswordConfig = {
      authority: process.env.NEXT_PUBLIC_B2C_PASSWORD_RESET_URL,
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID
    }

    const msalChangePasswordConfig = {
      authority: process.env.NEXT_PUBLIC_B2C_PASSWORD_CHANGE_URL,
      redirectUri: process.env.NEXT_PUBLIC_EDIT_PROFILE_REDIRECT_URL,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID
    }

    const msal = {
      login: msalConfig(msalAuthConfig),
      logout: msalConfig(msalAuthConfig),
      editProfile: msalConfig(msalEditProfileConfig)
    }

    const login = async () => {
      await signIn(msal.login)
    }

    const logout = async () => {
      await signOut(msal.login)
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
          <link rel='stylesheet' href='//highlightjs.org/static/demo/styles/github.css' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta property='og:title' content={title} />
          <script src='/assets/js/govuk-frontend.js' />
        </Helmet>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <AuthContext.Provider value={{ token: null, login, logout, msal }}>
              <GlobalStyle />
              <Component
                {...pageProps}
                store={store}
                router={router}
                msalConfig={msalConfig(msalAuthConfig)}
                msalEditProfileConfig={msalConfig(msalEditProfileConfig)}
                msalForgotPasswordConfig={msalConfig(msalForgotPasswordConfig)}
                msalRegisterConfig={msalConfig(msalRegisterConfig)}
                msalAuthVerfiyConfig={msalConfig(msalAuthVerfiyConfig)}
                msalChangePasswordConfig={msalConfig(msalChangePasswordConfig)}
              />
            </AuthContext.Provider>
          </Provider>
        </ThemeProvider>
      </>
    )
  }
}

export default withRedux(createStore)(
  withRouter(withApplicationInsights({
    instrumentationKey: process.env.NEXT_PUBLIC_INSTRUMENTATION_KEY,
    isEnabled: true
  })(MyApp)))
