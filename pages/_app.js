import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import styledNormalize from 'styled-normalize'
import App from 'next/app'
import theme from 'theme'
import { AuthProvider } from '../providers/AuthProvider'
import { ApplicationProvider } from '../providers/ApplicationProvider'
import { ClientCredentialsProvider } from '../providers/ClientCredentialsProvider'
import { getContent } from '../content/site'

import '../scss/main.scss'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
`

const content = getContent('app')

class DeveloperHub extends App {
  componentDidMount () {
    document.body.classList.add('js-enabled')
  }

  render () {
    const { Component, pageProps } = this.props
    const title = content.portalName

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
          <ClientCredentialsProvider>
            <AuthProvider>
              <ApplicationProvider>
                <GlobalStyle />
                <Component {...pageProps} />
              </ApplicationProvider>
            </AuthProvider>
          </ClientCredentialsProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default DeveloperHub
