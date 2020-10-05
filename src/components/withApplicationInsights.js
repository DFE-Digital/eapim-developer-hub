import * as React from 'react'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const IS_BROWSER = typeof window !== 'undefined'

let appInsights = null

export const withApplicationInsights = (config) => {
  return (App) => {
    return class WithApplicationInsights extends React.Component {
      static getInitialProps = async (appCtx) => {
        let appProps = { pageProps: {} }
        if (App.getInitialProps) {
          appProps = { ...appProps, ...await App.getInitialProps(appCtx) }
        }
        return {
          ...appProps
        }
      }

      componentDidMount () {
        this.initializeAppInsights()
        this.trackPageView()
      }

      componentDidCatch (error) {
        if (appInsights) {
          appInsights.trackException({ exception: error })
        }
      }

      initializeAppInsights () {
        if (IS_BROWSER && config.isEnabled && !appInsights) {
          appInsights = new ApplicationInsights({ config })
          appInsights.loadAppInsights()
          window.appInsights = appInsights
        }
      }

      trackPageView () {
        if (appInsights) {
          const name = (this.props.Component.WrappedComponent && this.props.Component.WrappedComponent.name) || this.props.Component.displayName || this.props.Component.name

          const properties = {
            route: this.props.router.asPath
          }

          if (this.props.router.query) {
            for (const key in this.props.router.query) {
              properties[`query.${key}`] = this.props.router.query[key]
            }
          }

          appInsights.trackPageView({ name, properties })
        }
      }

      render () {
        this.trackPageView()
        return React.createElement(App, this.props)
      }
    }
  }
}
