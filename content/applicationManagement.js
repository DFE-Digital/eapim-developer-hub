export const getContent = (key) => {
  return data[key]
}

export const sidebar = (application) => {
  const { applicationId } = application

  const pages = Object.keys(data).filter(page => !data[page].nosidebar)

  return pages.map((page, index) => {
    const item = {
      title: data[page].title,
      url: `/applications/${applicationId}${data[page].url}`
    }

    if (index === pages.length - 1) item.className = 'warning'

    return item
  })
}

const data = {
  details: {
    title: 'Application details',
    url: '/details',
    buttons: {
      subscribe: 'Subscribe to APIs'
    },
    content: []
  },
  'api-subscriptions': {
    title: 'API subscriptions',
    url: '/api-subscriptions',
    forceRefresh: 'true',
    content: [
      {
        Type: 'P',
        Body: 'In order for your application to integrate with a DfE API you must first subscribe to the required API, so that you can get access to a subscription key.'
      },
      {
        Type: 'P',
        Body: 'Before any subscription keys are produced an internal process is carried out to grant access. Depending on the setup of the API this process can take up to a maximum of 3 working days.'
      },
      {
        Type: 'P',
        Body: 'You can subscribe to either the sandbox or production version of the API depending on where you are in your development process. It is advisable to subscribe to the sandbox API first to ensure your developed software is fully functional before moving it to production (utilising production subscription key).'
      }
    ]
  },
  'client-secrets': {
    title: 'Client secrets',
    url: '/client-secrets',
    buttons: {
      regenerate: 'Regenerate'
    },
    tableHeadings: {
      primarySecret: 'Primary secret',
      secondarySecret: 'Secondary secret',
      created: 'Created',
      expires: 'Expires',
      action: 'Action'
    },
    intro: [
      {
        Type: 'P',
        Body: 'The client secret is a secret known only to the application and the authorisation server. You must add the client secret to the request header whenever you make a request to an API.'
      },
      {
        Type: 'P',
        Body: 'Primary and secondary secrets are provided in case you need to switch between keys.'
      }
    ],
    content: [
      {
        Type: 'P',
        Body: 'We only show you a new client secret once to help keep your data secure.'
      },
      {
        Type: 'H4',
        Body: 'Rotate your client secret regularly'
      },
      {
        Type: 'P',
        Body: "Rotate your application's client secret to shorten the period an access key is active, reducing the impact to your business if it is compromised."
      },
      {
        Type: 'P',
        Body: 'To rotate your client secret:'
      },
      {
        Type: 'OL',
        Body: [
          'Regenerate one of your client secrets.',
          'Update your application to use the updated client secret.',
          'Check that your application is working with the updated client secret.'
        ]
      },
      {
        Type: 'P',
        Body: "Read more on <a href='/documentation/authorisation#credentials' class='govuk-link' target='_blank'>client secrets</a> for further details."
      }
    ]
  },
  'redirect-urls': {
    title: 'Redirect URLs',
    url: '/redirect-urls',
    a11y: {
      saving: 'Updating your redirect URL...'
    },
    buttons: {
      add: 'Add a redirect url',
      save: 'Save',
      cancel: 'Cancel',
      remove: 'Remove',
      change: 'Change'
    },
    messages: {
      maximum: 'You have reached the maximum number of redirect URLs. If you require further redirect URLs, please <a class="govuk-link" href="/support" target="_blank">raise a support request on our support page</a>.'
    },
    errors: {
      empty: 'Enter a redirect URL',
      invalid: 'Invalid URL. Redirect URL must contain https:// and be a valid URL. Localhost domains are allowed',
      duplicate: 'Duplicate redirect URL'
    },
    content: [
      {
        Type: 'P',
        Body: 'You can add and edit up to fifteen redirect URLs using the link below.'
      },
      {
        Type: 'P',
        Body: 'To protect your application from phishing attacks, the redirect URL you use for authorisation (in your call to DfE authorisation endpoint) must match one of those you specified when you registered your application.'
      },
      {
        Type: 'P',
        Body: "Read more on <a href='/documentation/reference-guide#redirect-urls' class='govuk-link' target='_blank'>redirect URLs</a> for further details."
      }
    ]
  },
  'delete-application': {
    title: 'Delete application',
    url: '/delete-application',
    buttons: {
      continue: 'Continue',
      cancel: 'Cancel'
    },
    content: [],
    pageConfirm: {
      title: 'Are you sure you want us to delete your application?',
      url: '/delete-confirm',
      buttons: {
        delete: 'Delete application',
        deleting: 'Deleting...',
        cancel: 'Cancel'
      },
      content: []
    },
    pageSuccess: {
      title: 'Application deleted',
      url: '/delete-success',
      buttons: {
        return: 'Return to applications list'
      },
      content: []
    }
  },
  'create-success': {
    nosidebar: 'true',
    title: 'Application added',
    url: '/success',
    buttons: {
      view: 'View application credentials'
    },
    content: [
      {
        Type: 'P',
        Body: 'You can now use its credentials to test with APIs.'
      }
    ]
  },
  credentials: {
    nosidebar: 'true',
    title: 'Credentials',
    url: '/credentials',
    tableHeadings: {
      name: 'Application name',
      clientId: 'Client Id',
      primarySecret: 'Primary secret',
      secondarySecret: 'Secondary secret'
    },
    buttons: {
      view: 'View application details',
      copy: 'Copy',
      copied: 'Copied'
    },
    inputs: {
      label: 'I confirm I have copied my client secrets'
    },
    content: [
      {
        Type: 'INSET',
        Body: 'We only show your client secrets once to help keep your data secure.<br /> Copy the client secrets immediately.'
      },
      {
        Type: 'P',
        Body: "Read more on <a href='/documentation/authorisation#credentials' class='govuk-link' target='_blank'>credentials</a> for further details."
      }
    ]
  },
  'client-secrets-confirm': {
    nosidebar: 'true',
    titles: {
      default: 'Confirm regeneration of client secret',
      confirm: 'Are you sure you want to regenerate your key?',
      confirmed: 'Your secret key has been regenerated successfully'
    },
    buttons: {
      back: 'Back to client secrets',
      continue: 'Continue',
      cancel: 'Cancel'
    },
    tableHeadings: {
      created: 'Created',
      expires: 'Expires',
      action: 'Action'
    },
    summaryListHeadings: {
      application: 'Application',
      secretName: 'Secret name',
      secretHint: 'Secret hint'
    },
    intro: [
      {
        Type: 'P',
        Body: 'Make sure to copy your new secret as we only show it to you once.'
      }
    ]
  },
  'api-subscriptions-unsubscribe': {
    nosidebar: 'true',
    title: 'Are you sure you want unsubscribe from',
    url: '/api-subscriptions',
    buttons: {
      confirm: 'Confirm unsubscription',
      cancel: 'Cancel'
    },
    summaryListHeadings: {
      application: 'Application',
      api: 'API',
      environment: 'Environment'
    },
    intro: [
      {
        Type: 'H1',
        Body: 'Are you sure you want unsubscribe from'
      }
    ]
  },
  'api-subscriptions-unsubscribe-confirmed': {
    nosidebar: 'true',
    title: 'You have successfully unsubscribed',
    buttons: {
      back: 'Back to subscriptions'
    }
  }
}
