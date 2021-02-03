export const getContent = (key) => {
  return data[key]
}

const data = {
  app: {
    govuk: 'GOV UK',
    portalName: 'DfE Developer Hub'
  },
  heading: {
    menu: 'Menu',
    menuA11y: 'Show or hide main menu',
    skipToMain: 'Skip to main content',
    navigationA11y: 'Top Level Navigation',
    navigation: [
      {
        title: 'Overview',
        url: '/documentation'
      },
      {
        title: 'APIs',
        url: '/apis'
      },
      {
        title: 'Applications',
        url: '/applications'
      },
      {
        title: 'Support',
        url: '/support'
      }
    ]
  },
  phasebanner: {
    phase: 'Alpha',
    body: `This is a new service - your <a class='govuk-link' href='https://forms.office.com/Pages/ResponsePage.aspx?id=yXfS-grGoU2187O4s0qC-YA4Qd_fewBHv2fn-gXg0b9UQU8yT1JaWU1GVFo1M0RXNlZDREJUWjZXRS4u' rel='noreferrer noopener' target='_blank'>feedback <span class='govuk-visually-hidden'>(opens in a new tab)</span></a> will help us to improve it.`
  },
  authWarning: {
    title: 'Warning',
    content: [
      {
        Type: 'DIV',
        Body: `<a href='/auth/register' class='govuk-button'>Create an account</a><p class='govuk-body'>or <a href='/auth/login' class='govuk-link govuk-!-margin-left-1'><strong>sign in</strong></a> to the DfE Developer Hub.</p>`
      }
    ]
  },
  support: {
    title: 'Support',
    url: '/support',
    buttons: {
      submit: 'Submit'
    },
    errors: {
      name: 'Enter your full name',
      email: 'Enter a valid email address',
      reason: 'Choose an option for your enquiry',
      api: 'Specify the API you are having an issue with',
      description: 'Describe the problem you are having'
    },
    form: {
      name: {
        label: 'Full name'
      },
      email: {
        label: 'Email address',
        hint: 'We only use your email to respond to you.'
      },
      reason: {
        label: 'What specifically do you need help with?',
        generalEnquiry: 'General enquiry',
        issueWebsite: 'Issue with website',
        issueApi: 'Issue with API - Please specify what API you are having an issue with',
        other: 'Other',
        issueWebsiteSelect: 'Which API are you having issues with'
      },
      description: {
        label: 'What do you need help with?',
        hint: 'Please provide as much information as possible. Do not provide any personal information.'
      }
    },
    content: [
      {
        Type: 'P',
        Body: "Complete this short form and our Support Team will get back to you within 2 working days. You can also check our <a href='/documentation/reference-guide' class='govuk-link'>reference guide</a> for answers."
      }
    ]
  },
  'support-submitted': {
    title: 'Thank you',
    url: '/support-submitted',
    content: [
      {
        Type: 'P',
        Body: 'We will get back to you within 2 working days.'
      },
      {
        Type: 'P',
        Body: "Continue to the <a href='/' class='govuk-link'>home page</a>."
      }
    ]
  },
  profile: {
    title: 'Profile',
    url: '/profile',
    content: {
      AccountDetails: {
        Heading: 'Account details',
        Button: 'Edit profile'
      },
      ChangePassword: {
        Heading: 'Change Password',
        Button: 'Change your password'
      },
      DeleteAccount: {
        Heading: 'Delete account',
        Copy: 'You can ask us to delete your account and we will respond within 2 working days.',
        Button: 'Request account deletion'
      }
    }
  },
  cookies: {
    title: 'Cookies',
    url: '/cookies',
    content: [
      {
        Type: 'P',
        Body: "The DfE Developer Hub puts small files (known as 'cookies') onto your computer to collect information about how you browse the site. Find out more about the cookies we use, what they're for and when they expire."
      },
      {
        Type: 'H2',
        Body: 'Cookies that measure website use'
      },
      {
        Type: 'P',
        Body: 'We use Microsoft Azure Application Insights analytics to help us understand how the Developer Hub is being used and how it is performing. Any details that could personally identify you are removed from this information.'
      },
      {
        Type: 'P',
        Body: 'This helps us to:'
      },
      {
        Type: 'UL',
        Body: [
          'understand how the application is being used to continuously improve the user journey',
          'detect and diagnose performance issues',
          'improve the site and Government Digital Services'
        ]
      },
      {
        Type: 'P',
        Body: 'Application Insights stores information about:'
      },
      {
        Type: 'UL',
        Body: [
          'how you got to the site',
          'the pages you visit on the Developer Hub and how long you spend on them',
          'what you click on while you’re visiting the site'
        ]
      },
      {
        Type: 'P',
        Body: 'We use 2 Application Insight cookies to count how many people visit the site:'
      },
      {
        Type: 'UL',
        Body: [
          'ai_session - keeps track of how many users are accessing the application over time. Expires after 24 hours',
          'ai_user - collects statistical usage and telemetry information. Expires after 1 year'
        ]
      },
      {
        Type: 'H2',
        Body: 'Essential cookies'
      },
      {
        Type: 'P',
        Body: 'These cookies are necessary for the website to function and cannot be switched off in our systems. They do not store any information that could identify you.'
      },
      {
        Type: 'P',
        Body: 'Essential cookies are usually only set if you request a service, for example setting your privacy preferences, logging in or filling in forms.'
      },
      {
        Type: 'P',
        Body: 'You can set your browser to block or alert you about these cookies, but then some parts of the site will not work.'
      },
      {
        Type: 'P',
        Body: 'We use one essential cookie, set by websites run on the Windows Azure cloud platform:'
      },
      {
        Type: 'UL',
        Body: [
          'ARRAffinity - used for load balancing to make sure your page requests are routed to the same server in any browsing session - expires when you close your browser'
        ]
      },
      {
        Type: 'P',
        Body: "You might see a message at the top of the website on your first visit. We store a cookie on your computer so it knows you've seen it and not to show it again."
      },
      {
        Type: 'UL',
        Body: [
          'seen_cookie_message - hides the cookie banner on your first visit to the website - expires in 1 month'
        ]
      },
      {
        Type: 'H3',
        Body: 'Cookies message'
      },
      {
        Type: 'P',
        Body: 'The cookies message banner will ask you to accept cookies or review your settings when you visit the Developer Hub.'
      },
      {
        Type: 'P',
        Body: 'We have 2 cookies that tell your computer you’ve seen the banner and not to show it again:'
      },
      {
        Type: 'UL',
        Body: [
          'cookies_policy - saves your cookie consent settings - expires after one year',
          'cookies_preferences_set - tells us you’ve saved your cookie consent settings - expires after one year'
        ]
      }
    ]
  },
  privacy: {
    title: 'Privacy policy',
    url: '/privacy-policy',
    content: [
      {
        Type: 'P',
        Body: "This privacy policy relates to the information we store about you as a Developer Hub user. It does not relate to the privacy of the end users of any application you develop; under our <a href='/documentation/terms-of-use' class='govuk-link'>terms of use</a> you are responsible for the information stored by your application."
      },
      {
        Type: 'P',
        Body: "We hold information about you as a software developer on the EU General Data Protection Regulation (GDPR) lawful basis of 'public task' so that we can run the Developer Hub as a service to you."
      },
      {
        Type: 'P',
        Body: 'We do not knowingly hold personal information on children under the age of 16. The Developer Hub is not for use by children under this age.'
      },
      {
        Type: 'P',
        Body: 'We will email you if we update our privacy policy.'
      },
      {
        Type: 'H2',
        Body: 'Your information'
      },
      {
        Type: 'P',
        Body: 'When you use the Developer Hub, we collect:'
      },
      {
        Type: 'UL',
        Body: [
          'your personal details including name, email address and sometimes the name of your organisation',
          'information about your applications and the email addresses of your colleagues who access them',
          "your IP address, and details of which version of <a href='https://www.gov.uk/help/browsers' class='govuk-link'>web browser</a> you use",
          "information on how you use our site, based on <a href='/cookies' class='govuk-link'>cookies</a> and page tagging techniques",
          'any questions, queries or feedback you leave, including your email address, if you contact our support team'
        ]
      },

      {
        Type: 'H2',
        Body: 'How we use your data'
      },
      {
        Type: 'P',
        Body: 'We use your personal information:'
      },
      {
        Type: 'UL',
        Body: [
          'to create your account on the Developer Hub',
          'to make sure your account works properly',
          'to send you service updates and notices',
          'in a customer relationship management tool to help us manage our obligations to you'
        ]
      },
      {
        Type: 'P',
        Body: 'We do not share your information with anyone else.'
      },
      {
        Type: 'P',
        Body: 'When you apply for an account, we check:'
      },
      {
        Type: 'UL',
        Body: [
          "<strong>Companies House</strong> - to make sure the status of the business is 'active'",
          "<strong>LinkedIn</strong> - to check the business's digital footprint",
          "<strong>Twitter</strong> - to check the business's digital footprint",
          '<strong>Company website</strong> - to check the business’s digital footprint and to make sure we’re dealing with a valid developer',
          "<strong>Sandbox testing</strong> - to make sure you've sufficiently tested the API before we give access to the live environment"
        ]
      },

      {
        Type: 'H2',
        Body: 'How we protect your data'
      },
      {
        Type: 'P',
        Body: 'We comply with the GDPR to protect your personal information.'
      },
      {
        Type: 'P',
        Body: 'We will:'
      },
      {
        Type: 'UL',
        Body: [
          'tell you why we need the information',
          'only ask for what we need',
          'make sure no one has access to it who should not',
          'only keep the information for as long as we need it',
          'not make it available for commercial use'
        ]
      },
      {
        Type: 'P',
        Body: 'Our staff are trained in handling information and understand how important it is to protect personal and other sensitive information.'
      },
      {
        Type: 'P',
        Body: 'When you close your account, we’ll:'
      },
      {
        Type: 'UL',
        Body: [
          'delete your personal information',
          'keep audit records of your user account activity for up to 6 years'
        ]
      },
      {
        Type: 'P',
        Body: "If you want us to delete all the information we hold about you, email our <a href='/support' class='govuk-link'>support team</a>."
      },
      {
        Type: 'H2',
        Body: 'Asking to see your information'
      },
      {
        Type: 'P',
        Body: 'If you want to see the personal information we hold about you:'
      },
      {
        Type: 'UL',
        Body: [
          "email our <a href='/support' class='govuk-link'>support team</a> to find out which DfE office to contact",
          'address your GDPR request to the data protection officer'
        ]
      },
      {
        Type: 'P',
        Body: 'There is no charge for this.'
      },
      {
        Type: 'P',
        Body: 'Sometimes we can withhold information, for example to protect national security.'
      },
      {
        Type: 'H2',
        Body: 'Third party integration'
      },
      {
        Type: 'P',
        Body: 'We use third party software to help us improve your experience on the Developer Hub, including Azure App Insights, Optimizely and SurveyMonkey.'
      },
      {
        Type: 'P',
        Body: 'We may collect your:'
      },
      {
        Type: 'UL',
        Body: [
          "device's IP address",
          'device screen resolution',
          'device type (unique device identifiers), operating system, and browser type',
          'geographic location (city and country only)',
          'preferred page display language',
          'referring domain',
          'pages visited',
          'preferred language used to display the webpage',
          'date and time when website pages were accessed',
          'mouse events (movements, location and clicks)',
          'key presses'
        ]
      },
      {
        Type: 'P',
        Body: 'We will store this information in a way that it cannot be used to identify you.'
      }
    ]
  },
  'terms-and-conditions': {
    title: 'Terms and conditions',
    url: '/terms-and-conditions',
    content: [
      {
        Type: 'H2',
        Body: 'Disclaimer'
      },
      {
        Type: 'P',
        Body: "Read this disclaimer in conjunction with our <a href='/privacy-policy' class='govuk-link'>privacy policy</a>."
      },
      {
        Type: 'P',
        Body: 'The Department for Education (DfE) Developer Hub website and material relating to government information, products and services (or to third party information, products and services) is provided ‘as is’.'
      },
      {
        Type: 'P',
        Body: 'We make no representation or endorsement and no warranty of any kind whether express or implied. This includes, but is not limited to, the implied warranties of:'
      },
      {
        Type: 'UL',
        Body: [
          'satisfactory quality',
          'fitness for a particular purpose',
          'non-infringement',
          'compatibility',
          'security',
          'accuracy'
        ]
      },
      {
        Type: 'P',
        Body: 'When you download materials from this website, it is your responsibility to keep them safe. We cannot accept any responsibility for any loss, liability, claim, demand or damages that happen when you download and use these materials.'
      },
      {
        Type: 'P',
        Body: 'We make no warranty that:'
      },
      {
        Type: 'UL',
        Body: [
          'the functions contained in the material on this website will be uninterrupted or free of errors',
          'defects will be corrected',
          'this site or the servers that make it available are free of viruses',
          'this site represents the full functionality, accuracy or reliability of the materials'
        ]
      },
      {
        Type: 'P',
        Body: 'In no event will we be liable for:'
      },
      {
        Type: 'UL',
        Body: [
          'any loss or damage arising out of or in connection with the use of this website',
          'any loss or damages whatsoever arising from the use, or loss of use, of data, or profits arising out of or in connection with the use of this website'
        ]
      },
      {
        Type: 'P',
        Body: 'We updated these terms and conditions in August 2020.'
      },
      {
        Type: 'H2',
        Body: 'Using our website'
      },
      {
        Type: 'P',
        Body: 'Our website is not for use by children under the age of 16.'
      },
      {
        Type: 'P',
        Body: 'We maintain our website for your personal use and viewing. When you access and use our site, you accept these terms and conditions and they take effect on the date you first use the site.'
      },
      {
        Type: 'P',
        Body: 'You should check the terms and conditions regularly as we may revise them at any time without notice. If you use the site after we’ve made a change, this means you accept the change.'
      },
      {
        Type: 'P',
        Body: 'You agree to use this site only for lawful purposes and in a way that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, this site by any third party. This includes, without limitation:'
      },
      {
        Type: 'UL',
        Body: [
          'unlawful conduct',
          'harassment',
          'causing distress or inconvenience',
          'transmitting obscene or offensive content',
          'disrupting the normal flow of dialogue within this site'
        ]
      },
      {
        Type: 'P',
        Body: 'We use the information we collect for internal review, to improve or customise the content or layout of the site, and to provide information services to the site users. We do not share it with other organisations for commercial purposes.'
      },
      {
        Type: 'P',
        Body: 'Our responsibilities and liabilities to you in providing this site and any associated services are limited as set out in our disclaimer.'
      },
      {
        Type: 'H2',
        Body: 'Copyright and intellectual property rights'
      },
      {
        Type: 'P',
        Body: "The material featured on this site is subject to crown copyright, third party copyright or both. For more details, read our <a href='https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/' class='govuk-link' target='_blank'>copyright notice (opens in a new tab)</a>."
      },
      {
        Type: 'P',
        Body: 'The names, images and logos identifying DfE are our proprietary marks. You are not allowed to copy our logos or any third party logos accessed through this site unless you have prior approval from the copyright owner.'
      },
      {
        Type: 'P',
        Body: 'We do not approve, accredit or endorse software developers or allow them to use our logo in their advertising.'
      },
      {
        Type: 'H2',
        Body: 'Linking to our website'
      },
      {
        Type: 'P',
        Body: 'You can link directly to pages hosted on Developer Hub without permission, but:'
      },
      {
        Type: 'UL',
        Body: [
          'our page must load into the user’s entire window',
          'you cannot load our pages into frames on your site'
        ]
      },
      {
        Type: 'H2',
        Body: 'Links to external websites'
      },
      {
        Type: 'P',
        Body: 'We are not responsible for the content or reliability of any external websites that we link to and we do not necessarily endorse their views. A listing is not an endorsement of any kind.'
      },
      {
        Type: 'P',
        Body: 'We cannot guarantee that the links will always work or if the pages will be available. We are not responsible for any privacy policies on external websites and we recommend you read the relevant statements on any other websites you visit.'
      },
      {
        Type: 'P',
        Body: 'We are not responsible for the direct or indirect results of you linking to any other website from this site.'
      },
      {
        Type: 'H2',
        Body: 'Virus protection'
      },
      {
        Type: 'P',
        Body: 'We make all reasonable attempts to check and test material at all stages of production, and to exclude viruses from this website.'
      },
      {
        Type: 'P',
        Body: 'You should always run an up to date anti-virus program on all the material you download from the internet.'
      },
      {
        Type: 'P',
        Body: 'We cannot accept any responsibility for any loss, disruption or damage to your data or your computer system while using material found on our site.'
      },
      {
        Type: 'H2',
        Body: 'Privacy policy'
      },
      {
        Type: 'P',
        Body: "Our <a href='/privacy-policy' class='govuk-link'>privacy policy</a> explains how we protect and respect the data we collect from you. When you use this site, you accept this policy."
      },
      {
        Type: 'H2',
        Body: 'Governing law'
      },
      {
        Type: 'P',
        Body: 'These terms and conditions shall be governed by and construed in accordance with the laws of England and Wales. Any dispute arising under these terms and conditions shall be subject to the exclusive jurisdiction of the courts of England and Wales.'
      }
    ]
  },
  'accessibility-statement': {
    title: 'Accessibility statement for DfE Developer Hub',
    url: '/accessibility-statement',
    content: [
      {
        Type: 'P',
        Body: 'This service is part of the wider GOV.UK website. There is a separate accessibility <a class="govuk-link" href="https://www.gov.uk/help/accessibility">statement for the main GOV.UK website</a>.'
      },
      {
        Type: 'P',
        Body: 'This page only contains information about the DfE Developer Hub service, available at https://dfe-developerhub.education.gov.uk/.'
      },
      {
        Type: 'H3',
        Body: 'Using this service'
      },
      {
        Type: 'P',
        Body: 'This website is run by the DfE Developer Hub. We want as many people as possible to be able to use this website. For example, that means you should be able to:'
      },
      {
        Type: 'UL',
        Body: [
          'zoom in up to 300% without the text spilling off the screen',
          'get from the start of the service to the end using just a keyboard',
          'get from the start of the service to the end using speech recognition software',
          'listen to the service using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)'
        ]
      },
      {
        Type: 'P',
        Body: "We've also made the website text as simple as possible to understand."
      },
      {
        Type: 'P',
        Body: '<a class="govuk-link" href="https://mcmw.abilitynet.org.uk/">AbilityNet</a> has advice on making your device easier to use if you have a disability.'
      },
      {
        Type: 'H3',
        Body: 'How accessible this website is'
      },
      {
        Type: 'P',
        Body: 'Some people may find parts of this service difficult to use.'
      },
      {
        Type: 'UL',
        Body: [
          'some documents are in PDF or Word format and are not accessible',
          'some documents are in JSON or YAML format and are not accessible'
        ]
      },
      {
        Type: 'H3',
        Body: 'Feedback and contact information'
      },
      {
        Type: 'P',
        Body: 'If you have difficulty using this service, contact us by using our <a class="govuk-link" href="/support">support page</a>.'
      },
      {
        Type: 'P',
        Body: 'If you need any part of this service in a different format like large print, audio recording or braille, contact us by using our <a class="govuk-link" href="/support">support page</a>.'
      },
      {
        Type: 'P',
        Body: 'We’ll consider your request and get back to you within two working days.'
      },
      {
        Type: 'H3',
        Body: 'Reporting accessibility problems with this website'
      },
      {
        Type: 'P',
        Body: 'We’re always looking to improve the accessibility of this website. If you find any problems not listed on this page or think we’re not meeting accessibility requirements, contact us via our <a class="govuk-link" href="/support">support page</a>.'
      },
      {
        Type: 'H3',
        Body: 'Enforcement procedure'
      },
      {
        Type: 'P',
        Body: 'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’). If you’re not happy with how we respond to your complaint, <a class="govuk-link" href="https://www.equalityadvisoryservice.com">contact the Equality Advisory and Support Service (EASS)</a>.'
      },
      {
        Type: 'H3',
        Body: 'Technical information about this website’s accessibility'
      },
      {
        Type: 'P',
        Body: 'Department for Education is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.'
      },
      {
        Type: 'H3',
        Body: 'Compliance status'
      },
      {
        Type: 'P',
        Body: 'This website is partially compliant with the <a class="govuk-link" href="https://www.w3.org/TR/WCAG21/">Web Content Accessibility Guidelines version 2.1</a> AA standard, due to the non-compliances listed below.'
      },
      {
        Type: 'H3',
        Body: 'Non-accessible content'
      },
      {
        Type: 'P',
        Body: 'The content listed below is non-accessible for the following reasons.'
      },
      {
        Type: 'H4',
        Body: 'Non-compliance with the accessibility regulations'
      },
      {
        Type: 'OL',
        Body: [
          'Some content inserted with CSS may not read by some screen readers, and will not be available to people who turn off style sheets. This fails WCAG 2.1 A F87 criterion.'
        ]
      },
      {
        Type: 'H3',
        Body: 'How we tested this website'
      },
      {
        Type: 'P',
        Body: 'We tested user journeys for both authenticated and non-authenticated users, including:'
      },
      {
        Type: 'UL',
        Body: [
          'creating an account',
          'logging in to an account',
          'registering an application',
          'deleting an application',
          'subscribing to an API',
          'unsubscribing to an API',
          'regenerating client keys',
          'copying client keys and secrets',
          'adding redirect URLs',
          'removing redirect URLs',
          'deleting an account',
          'updating a profile'
        ]
      },
      {
        Type: 'H3',
        Body: 'Preparation of this accessibility statement'
      },
      {
        Type: 'INSET',
        Body: 'This statement was prepared on 3 February 2021. It was last reviewed on 3 February 2021. This website was last tested on 2 February 2021. The test was carried out by the DfE Developer Hub.'
      }
    ]
  },
  'logged-out': {
    title: 'You are now signed out',
    url: '/logged-out',
    buttons: {
      home: 'Back to home page'
    },
    content: [
      {
        Type: 'H2',
        Body: 'Feedback survey'
      },
      {
        Type: 'P',
        Body: 'Before you leave, please give feedback to help us improve the Developer Hub.'
      },
      {
        Type: 'P',
        Body: "Leave your feedback <a target='_blank' href='https://forms.office.com/Pages/ResponsePage.aspx?id=yXfS-grGoU2187O4s0qC-YA4Qd_fewBHv2fn-gXg0b9UQU8yT1JaWU1GVFo1M0RXNlZDREJUWjZXRS4u' class='govuk-link'>here (opens in a new tab)</a>."
      }
    ]
  },
  'password-changed': {
    title: 'Password has been updated successfully.',
    content: [
      {
        Type: 'P',
        Body: `<a href='/auth/login' class='govuk-link'>Sign in</a> to the Developer Hub with your new password.`
      }
    ]
  },
  404: {
    title: 'Page not found',
    content: [
      {
        Type: 'P',
        Body: 'If you entered a web address please check it was correct.'
      },
      {
        Type: 'P',
        Body: 'If you pasted the web address, check you copied the entire address.'
      },
      {
        Type: 'P',
        Body: `<a href='/' class='govuk-link'>Go back to the homepage</a>`
      }
    ]
  },
  500: {
    title: 'Sorry, there is a problem with the service',
    content: [
      {
        Type: 'P',
        Body: 'Try again later.'
      },
      {
        Type: 'P',
        Body: `<a href='/support' class='govuk-link'>Contact us</a> if you are having issues with the Developer Hub.`
      }
    ]
  }
}
