import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const config = {
  instrumentationKey: process.env.NEXT_PUBLIC_INSTRUMENTATION_KEY,
  disableTelemetry: false
}

export default function useInsights (enabled = true) {
  const initialize = () => {
    config.disableTelemetry = !enabled
    const instance = new ApplicationInsights({ config })
    instance.loadAppInsights()
    return instance
  }

  const trackException = (error) => {
    const tracking = initialize()
    tracking.trackException({ exception: error })
  }

  const pageView = ({ name, url }) => {
    const tracking = initialize()

    const properties = {
      route: url
    }

    tracking.trackPageView({ name, properties })
  }

  return [pageView, trackException]
}
