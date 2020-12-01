export const getContent = (key) => {
  return data[key]
}

export const sidebar = () => {
  const pages = Object.keys(data).filter(page => !data[page].nosidebar)
  return pages.map(page => ({ title: data[page].title, url: data[page].url, href: data[page].url }))
}

const data = {
  applications: {
    title: 'Applications',
    url: '/applications',
    buttons: {
      addNew: 'Add new application',
      start: 'Register your first application'
    },
    authWarning: 'You need an account to view applications.',
    empty: "You don't have any applications"
  },
  'registering-your-application': {
    title: 'Before you register your application',
    url: '/applications/registering-your-application',
    buttons: {
      register: 'register application'
    },
    content: [
      {
        Type: 'P',
        Body: 'To start using our RESTful APIs with your application:'
      },
      {
        Type: 'OL',
        Body: [
          'Add the application to our test environment (sandbox).',
          'Choose which sandbox APIs you want to use.',
          'Get the credentials your application needs to interact with our APIs.'
        ]
      },
      {
        Type: 'INSET',
        Body: "Make sure your application complies with our <a class='govuk-link' href='/documentation/terms-of-use'>terms of use</a>."
      },
      {
        Type: 'P',
        Body: 'If you have not already done so:'
      },
      {
        Type: 'UL',
        Body: [
          "see which <a class='govuk-link' href='/apis'>public APIs</a> you can use",
          "read up on <a href='/documentation/authorisation' class='govuk-link'>authorisation</a>",
          "read the <a class='govuk-link' href='https://oauth.net/2/' rel='noreferrer noopener' target='_blank'>OAuth 2.0 specification</a>"
        ]
      }
    ]
  },
  'how-to-develop-your-application': {
    title: 'How to develop your application',
    url: '/applications/how-to-develop-your-application',
    content: [
      {
        Type: 'H2',
        Body: 'Naming your application'
      },
      {
        Type: 'P',
        Body: 'The name of your application cannot:'
      },
      {
        Type: 'UL',
        Body: [
          "use or refer to 'DfE'",
          'be the same or similar to an existing name on the Developer Hub',
          'be the same or similar to a trademarked name registered by another business outside the Developer Hub',
          'contain offensive words or phrases',
          'mislead users into believing it has special status or power - for example, associating your application with government, local authorities or institutions, like Royal Tax App'
        ]
      },
      {
        Type: 'P',
        Body: "'The same' means a name that is identical or where the only difference is punctuation or a special character."
      },
      {
        Type: 'P',
        Body: 'This does not apply if both:'
      },
      {
        Type: 'UL',
        Body: [
          'the name will be part of a group with an existing application with the same or similar name',
          'the administrators of the existing application give you permission to use the name'
        ]
      },
      {
        Type: 'P',
        Body: 'We have the right to delete your application at any point, for any reason.'
      }
    ]
  },
  'create-step-1': {
    nosidebar: 'true',
    title: "What's the name of your application?",
    url: '/applications/create/step1',
    buttons: {
      continue: 'Continue',
      cancel: 'Cancel'
    },
    inputs: {
      label: 'Application name',
      hint: 'Your application name must be between 2 and 50 characters. It can contain alphanumeric characters and spaces. Special characters are not allowed'
    },
    errors: {
      empty: 'Enter your application name',
      invalid: 'Application name must be between 2 and 50 characters and must not contain any special characters',
      duplicate: 'You have already have an application with this name'
    },
    content: []
  },
  'create-step-2': {
    nosidebar: 'true',
    title: 'What is your application for?',
    url: '/applications/create/step2',
    buttons: {
      continue: 'Continue',
      cancel: 'Cancel'
    },
    inputs: {
      label: 'Application name',
      hint: 'Your application name must be between 2 and 50 characters. It can contain alphanumeric characters and spaces. Special characters are not allowed'
    },
    errors: {
      empty: 'Enter your application description'
    },
    content: []
  },
  'create-step-3': {
    nosidebar: 'true',
    title: 'What is your redirect URL?',
    url: '/applications/create/step3',
    buttons: {
      continue: 'Continue',
      cancel: 'Cancel'
    },
    inputs: {
      label: 'Redirect URL',
      hint: 'This will be the URL that you want to redirect users back to. It must begin with https://'
    },
    errors: {
      empty: "'Enter your application redirect URL'",
      invalid: "'URL must contain https://. If you are using localhost, prefix it with http://'"
    },
    content: []
  },
  'create-summary': {
    nosidebar: 'true',
    title: 'Application summary',
    url: '/applications/create/summary',
    a11y: {
      registering: 'registering your application...'
    },
    headings: {
      name: 'Name',
      description: 'Description',
      redirectUrl: 'Redirect URL',
      owner: 'Application owner',
      email: 'Contact email'
    },
    buttons: {
      register: 'Register application',
      registering: 'Registering...',
      cancel: 'Cancel'
    },
    inputs: {
      label: 'Redirect URL',
      hint: 'This will be the URL that you want to redirect users back to. It must begin with https://'
    },
    errors: {
      empty: 'Enter your application redirect URL',
      invalid: 'URL must contain https://. If you are using localhost, prefix it with http://',
      name: 'Missing application name',
      description: 'Missing application description',
      redirectUrl: 'Missing application redirect URL',
      server: 'Something went wrong with registering your application'
    },
    content: []
  }
}
