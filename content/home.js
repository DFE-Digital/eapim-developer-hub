export const getContent = (key) => {
  return data[key]
}

const data = {
  home: {
    title: 'DfE Developer Hub',
    url: '/',
    intro: 'Connect to the Department for Education digital services through our APIs.',
    buttons: {
      register: 'Create an account',
      signin: 'sign in'
    },
    sections: [
      {
        title: 'Browse DfE APIs',
        body: [
          {
            Type: 'P',
            Body: `You can browse <a href='/apis' class='govuk-link'>public APIs</a> from different sectors including schools, finance and corporate entities.`
          }
        ],
        svg: '/assets/images/hp-apis.svg',
        img: '/assets/images/hp-apis.jpg',
        imgAlt: 'Browse Department for Education APIs',
        a11y: 'A user-facing page showing a list of public APIs.'
      },
      {
        title: 'Integrate your application',
        body: [
          {
            Type: 'P',
            Body: `Connect your application to an API sandbox environment to begin building your software. When you're ready to go live, ask for production access.`
          },
          {
            Type: 'P',
            Body: `To get started, read <a href='/documentation' class='govuk-link'>using the Developer Hub</a>.`
          }
        ],
        svg: '/assets/images/hp-int.svg',
        img: '/assets/images/hp-int.jpg',
        imagAlt: 'Integrate your application',
        a11y: 'A user-facing page showing an application that has subscribed to an API.'
      }
    ],
    columns: [
      {
        heading: 'Getting started',
        links: [
          {
            title: 'Using the Developer Hub',
            url: '/documentation'
          },
          {
            title: 'Create an account',
            url: '/auth/register'
          },
          {
            title: 'Authorisation',
            url: '/documentation/authorisation'
          },
          {
            title: 'Tutorials',
            url: '/documentation/tutorials'
          },
          {
            title: 'Terms of use',
            url: '/documentation/terms-of-use'
          }
        ]
      },
      {
        heading: 'Explore our APIs',
        links: [
          {
            title: 'API documentation',
            url: '/apis'
          },
          {
            title: 'Reference guide',
            url: '/documentation/reference-guide'
          }
        ]
      },
      {
        heading: 'Applications',
        links: [
          {
            title: 'Registering your application',
            url: '/applications'
          },
          {
            title: 'Application list',
            url: '/applications'
          },
          {
            title: 'How to develop your application',
            url: '/applications/how-to-develop-your-application'
          }
        ]
      }
    ]
  }
}
