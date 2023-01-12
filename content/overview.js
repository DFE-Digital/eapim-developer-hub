export const getContent = (key) => {
  return data[key]
}

export const sidebar = () => {
  const pages = Object.keys(data)
  return pages.map(page => ({ title: data[page].title, url: data[page].url, href: data[page].url }))
}

const data = {
  documentation: {
    title: 'Using the Find and Use an API service',
    url: '/documentation',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    content: [
      {
        Type: 'H2',
        Body: '1. Create an account'
      },
      {
        Type: 'P',
        Body: 'You will need to create an account with the Find and Use an API service to gain access to APIs and their subscription keys.'
      },
      {
        Type: 'P',
        Body: "Go to <a href='/auth/register' class='govuk-link'>create an account</a>."
      },
      {
        Type: 'H2',
        Body: '2. Register an application'
      },
      {
        Type: 'P',
        Body: 'You will need to register your application to help keep it and our data secure.'
      },
      {
        Type: 'P',
        Body: "To register an application, sign in to your account, go to <a href='/applications/registering-your-application' class='govuk-link'>registering your application</a> and follow the process."
      },
      {
        Type: 'P',
        Body: 'When you register you will receive a unique client ID and a client ‘secret’ - a kind of password. You will need these to call DfE APIs.'
      },
      {
        Type: 'H2',
        Body: '3. Subscribe to an API'
      },
      {
        Type: 'P',
        Body: 'To integrate with a DfE API, you need to subscribe to the API. When you subscribe you will receive a subscription key that is unique to each client for the API. If you need to connect to more than one API, you must subscribe to each one.'
      },
      {
        Type: 'P',
        Body: 'To subscribe to an API:'
      },
      {
        Type: 'OL',
        Body: [
          'Register your application.',
          'View your application details (you can save these).',
          "Click on 'Subscribe to APIs'.",
          'Select the API you want to integrate with.',
          "Choose 'sandbox' (when you’re building and testing your software) or 'production' (when you know your software works properly)."
        ]
      },
      {
        Type: 'H2',
        Body: '4. Get a subscription key'
      },
      {
        Type: 'P',
        Body: 'It can take up to 3 working days to receive a subscription key. When we have agreed your subscription request, we will email you at the address you registered with.'
      },
      {
        Type: 'P',
        Body: 'To see the status of your request, go to API subscriptions, select the API and the status will be shown.'
      },
      {
        Type: 'P',
        Body: 'The statuses are:'
      },
      {
        Type: 'UL',
        Body: [
          'pending approval - you have made a subscription request and are waiting for us to approve it',
          'active - the subscription is ready for you to use - a primary and secondary subscription key will be displayed with the URL',
          'rejected - we have reviewed and rejected your subscription request - the reason will be displayed',
          'cancelled - you have cancelled the subscription request and we will not progress any further unless you make a new request',
          "suspended - the subscription request has been suspended - to unsuspend it, fill in the form in the 'Support' tab"
        ]
      },
      {
        Type: 'H2',
        Body: '5. Redirect URLs'
      },
      {
        Type: 'P',
        Body: 'When you first register an application, you must provide a redirect URL. You can add and edit up to 15 redirect URLs.'
      },
      {
        Type: 'P',
        Body: "Redirect URLs send the user back to your application after successful (or unsuccessful) authorisation, before your application accesses <a href='/documentation/authorisation#user-restricted-endpoints' class='govuk-link'>user-restricted endpoints</a>."
      },
      {
        Type: 'P',
        Body: 'You must specify one redirect URL when you register your application and one when you send your user to our authorisation endpoint. You can add more redirect URLs later if you need to.'
      },
      {
        Type: 'P',
        Body: 'The redirect URL you use for authorisation in your call to the DfE authorisation endpoint must match one of those you specified when you registered your application. This will protect your application from phishing attacks.'
      },
      {
        Type: 'H2',
        Body: '6. Call an API'
      },
      {
        Type: 'P',
        Body: 'When you have subscribed to an API and received your subscription key, you’ll have everything you need to make an API call:'
      },
      {
        Type: 'OL',
        Body: [
          'The DfE API URL and endpoint.',
          'Your unique client ID and secret.',
          'Your unique API subscription key.',
          'registered redirect URL.',
          'OAuth 2.0 token endpoint (for an application-restricted endpoint).',
          'OAuth 2.0 authorisation URL (for a user-restricted endpoint).'
        ]
      },
      {
        Type: 'P',
        Body: "If you need help making an API call, see our <a href='/documentation/tutorials' class='govuk-link'>Tutorials</a>."
      }
    ]
  },
  authorisation: {
    title: 'Authorisation',
    url: '/documentation/authorisation',
    content: [
      {
        Type: 'H2',
        Body: 'Endpoint types'
      },
      {
        Type: 'P',
        Body: 'DfE APIs have 3 types of endpoint:'
      },
      {
        Type: 'UL',
        Body: [
          'open access',
          'application-restricted',
          'user-restricted'
        ]
      },
      {
        Type: 'P',
        Body: 'Each type of endpoint has a different level of authorisation.'
      },
      {
        Type: 'H2',
        Body: 'Open access endpoints'
      },
      {
        Type: 'P',
        Body: 'Open access endpoints are the least restricted type of endpoint and service general data held by DfE.'
      },
      {
        Type: 'P',
        Body: 'Open access endpoints:'
      },
      {
        Type: 'UL',
        Body: [
          'only need a valid API subscription key to be passed (no access token)',
          'usually allow self-approval for subscriptions'
        ]
      },
      {
        Type: 'P',
        Body: "For more information, see the open access endpoint in the <a href='/documentation/tutorials' class='govuk-link'>tutorials</a> section."
      },
      {
        Type: 'H2',
        Body: 'Application-restricted endpoints'
      },
      {
        Type: 'P',
        Body: 'Application-restricted endpoints do not need to be authorised by the end user. These endpoints do not give access to sensitive personal data.'
      },
      {
        Type: 'P',
        Body: 'To pass an application-restricted endpoint, you need:'
      },
      {
        Type: 'UL',
        Body: [
          'a valid API subscription key',
          'an access token'
        ]
      },
      {
        Type: 'P',
        Body: "Find out <a href='/documentation/tutorials#accessing-an-application-restricted-endpoint' class='govuk-link'>how to request an access token for application-restricted endpoints</a> in our tutorial."
      },
      {
        Type: 'P',
        Body: "We use the open standard <a href='https://oauth.net/2/' target='_blank' class='govuk-link'>OAuth 2.0</a> with the <a href='https://oauth.net/2/grant-types/client-credentials' target='_blank' class=''>client credentials grant (opens in a new tab)</a> to generate an access token. If the endpoint requires a <a href='https://oauth.net/2/scope/' target='_blank' class='govuk-link'>scope (opens in a new tab)</a>, your application must include this scope when creating the access token."
      },
      {
        Type: 'P',
        Body: 'The access token lasts for one hour. When it expires you must request a new one.'
      },
      {
        Type: 'P',
        Body: 'For the authorisation rules, read the specific API endpoint documentation.'
      },
      {
        Type: 'H2',
        Body: 'User-restricted endpoints'
      },
      {
        Type: 'P',
        Body: 'User-restricted endpoints need to be authorised by the end user (for example, academy trusts or school authorities). They generally give access to sensitive personal data.'
      },
      {
        Type: 'P',
        Body: 'To pass a user-restricted endpoint, you need:'
      },
      {
        Type: 'UL',
        Body: [
          'a valid API subscription key',
          'an access token'
        ]
      },
      {
        Type: 'P',
        Body: "Find out <a href='/documentation/tutorials#accessing-an-application-restricted-endpoint' class='govuk-link'>how to request an access token for application-restricted endpoints</a> in our tutorial."
      },
      {
        Type: 'P',
        Body: "We use the open standard <a href='https://oauth.net/2/' target='_blank' class='govuk-link'>OAuth 2.0 (opens in a new tab)</a> with the <a href='https://oauth.net/2/grant-types/client-credentials' target='_blank' class='govuk-link'>client credentials grant (opens in a new tab)</a> to generate an access token. This allows the end users to authorise your application to interact with DfE on their behalf without sharing their access credentials."
      },
      {
        Type: 'P',
        Body: 'The end user authenticates directly with us, using their IDAMS and DfE sign-in accounts, and authorises specific scopes.'
      },
      {
        Type: 'P',
        Body: 'We then issue an OAuth 2.0 access token that is specific to the end user. Your application passes the access token in subsequent API requests to user-restricted endpoints.'
      },
      {
        Type: 'P',
        Body: "Following the latest <a href='https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-3.4' class='govuk-link' target='_blank'>OAuth 2.0 security best current practice (opens in a new tab)</a>, DfE APIs do not support implicit and password OAuth grant types."
      },
      {
        Type: 'H2',
        Body: 'Credentials'
      },
      {
        Type: 'P',
        Body: 'Your credentials are your client ID and your client ‘secret’ - a kind of password. Find and Use an API supplies 2 active client secrets (primary and secondary) at any one time.'
      },
      {
        Type: 'P',
        Body: 'We use your credentials:'
      },
      {
        Type: 'UL',
        Body: [
          'to identify and authorise your application during each step of the process',
          'when you test your application with sandbox APIs or run against the production APIs'
        ]
      },
      {
        Type: 'H3',
        Body: 'Client ID'
      },
      {
        Type: 'P',
        Body: 'Your client ID is a unique identifier that we create when you register your application on the Find and Use an API service.'
      },
      {
        Type: 'H3',
        Body: 'Client secret'
      },
      {
        Type: 'P',
        Body: 'A client secret is a unique passphrase that you generate to authorise your application. It is known only to your application and the authorising server.'
      },
      {
        Type: 'P',
        Body: 'The client secret is the same as a password. You should not store it as plain text. You must encrypt your client secret before you store it so it is less likely to be compromised.'
      },
      {
        Type: 'H3',
        Body: 'Rotate your client secrets regularly'
      },
      {
        Type: 'P',
        Body: 'When you register your application, we assign your application 2 client secrets - primary and secondary. They are usually valid for 2 years.'
      },
      {
        Type: 'P',
        Body: 'You can rotate your primary and secondary secrets to shorten the time an access key is active. This will reduce the impact to your business if it is compromised.'
      },
      {
        Type: 'P',
        Body: 'To rotate your client secrets:'
      },
      {
        Type: 'OL',
        Body: [
          'Sign in to Find and Use an API.',
          'Check that your secondary secret for the application has a reasonable amount of time before it expires (for example, at least 6 months).',
          'Update your application to use the secondary secret.',
          'Check that your application is working with the secondary secret.',
          'Regenerate your primary secret.'
        ]
      }
    ]
  },
  tutorials: {
    title: 'Tutorials',
    url: '/documentation/tutorials',
    content: [
      {
        Type: 'H2',
        Body: 'Before you start'
      },
      {
        Type: 'P',
        Body: 'All base URLs in these tutorials use the test environment.'
      },
      {
        Type: 'P',
        Body: "All code snippets in these tutorials are in CSharp (C#). They use the <a class='govuk-link' href='https://restsharp.dev/' rel='noreferrer noopener' target='_blank'>RestSharp (opens in a new tab)</a> library to access HTTP resources."
      },
      {
        Type: 'P',
        Body: "You can find more code samples in our public GitHub repositories. They're available in:"
      },
      {
        Type: 'BL',
        Body: [
          "<a class='govuk-link' href='https://github.com/DFE-Digital/api-example-csharp-client' rel='noreferrer noopener' target='_blank'>CSharp (opens in a new tab)</a>",
          "<a class='govuk-link' href='https://github.com/DFE-Digital/api-example-java-client' rel='noreferrer noopener' target='_blank'>Java (opens in a new tab)</a>",
          "<a class='govuk-link' href='https://github.com/DFE-Digital/api-example-nodejs-client' rel='noreferrer noopener' target='_blank'>Node.js (opens in a new tab)</a>"
        ]
      },
      {
        Type: 'P',
        Body: 'These tutorials use a simple DfE Information (example) API that exposes 3 endpoints. The paths are:'
      },
      {
        Type: 'UL',
        Body: [
          '<code>/dfe/open-info</code>',
          '<code>/dfe/application-info</code> (application authorises it using OAuth 2.0 access token)',
          '<code>/dfe/user-info</code> (application authorises it using OAuth 2.0 authorisation grant flow)'
        ]
      },
      {
        Type: 'P',
        Body: "All 3 use the GET method and give the message 'DfE Information'"
      },
      {
        Type: 'H2',
        Body: 'Getting your subscription keys'
      },
      {
        Type: 'P',
        Body: "You'll need an API subscription key header for all 3 endpoints. Before running any of the examples, follow these steps:"
      },
      {
        Type: 'OL',
        Body: [
          'Create an account in the Find and Use an API service.',
          'Register your application that will integrate with the DfE APIs.',
          'Copy your client ID and secret details.',
          'Subscribe to the DfE Information API and choose the sandbox environment.',
          'Make sure you have a primary and secondary subscription key.',
          'Copy the primary key to use in the examples.'
        ]
      },
      {
        Type: 'H2',
        Body: 'Accessing an open endpoint'
      },
      {
        Type: 'P',
        Body: 'In this example, you will access the DfE Information API open-info endpoint.'
      },
      {
        Type: 'P',
        Body: 'You do not need an access token for this endpoint because it does not need an authorisation header. You do need to send a subscription key'
      },
      {
        Type: 'H4',
        Body: 'Issue a GET request to:'
      },
      {
        Type: 'INSET',
        Body: 'https://oat-api-customerengagement.platform.education.gov.uk/dfe/open-info'
      },
      {
        Type: 'CODE',
        Body: [
          '// construct the GET request for our DfE Information endpoint\n',
          "var client = new RestSharp.RestClient('https://dev-api-customerengagement.platform.education.gov.uk');\n",
          "var request = new RestSharp.RestRequest('dfe/open-info', RestSharp.Method.GET);\nrequest.AddHeader('Ocp-Apim-Subscription-Key', '992519688c7c43ef916add082ac49e33');\n\n",
          '// Add Subscription Key Header\n',
          'request.AddHeader("Ocp-Apim-Subscription-Key", "992519688c7c43ef916add082ac49e33");\n\n',
          '// Execute the query and retreive results\n',
          'var queryResult = client.Execute(request);\n\n',
          '// extract the HTTP status\n',
          'HttpStatusCode statusCode = queryResult.StatusCode; int numericStatusCode = (int)statusCode;\n'
        ]
      },
      {
        Type: 'H2',
        Body: 'Accessing an application-restricted endpoint'
      },
      {
        Type: 'P',
        Body: 'In this example, you will request an access token in your code (using your client ID and secret) and then use it to access the DfE Information API application-info endpoint.'
      },
      {
        Type: 'P',
        Body: "See the <a href='/documentation/authorisation#user-restricted-endpoints' class='govuk-link'>authorisation</a> section for information about requesting an access token."
      },
      {
        Type: 'H4',
        Body: '1. Go to the DfE Information API documentation page and copy the OAuth token endpoint URL'
      },
      {
        Type: 'H4',
        Body: '2. Request an OAuth 2.0 access token in your application code:'
      },
      {
        Type: 'CODE',
        Body: [
          'private string refresh_token { get; set; }\n',
          'private string token { get; set; }\n\n',
          '// construct the request for access token\n',
          'var client = new RestClient("<Paste token endpoint here>");\n',
          'var request = new RestRequest("dfe/application-info", Method.POST);\n',
          'request.AddHeader("content-type", "application/x-www-form-urlencoded");\n',
          'request.AddParameter("grant_type", "client_credentials");\n',
          'request.AddParameter("client_id", "<Paste-your-client-id-here>");\n',
          'request.AddParameter("client_secret", "<Paste-your-client-secret-here>");\n\n',
          '// make call to get token\n',
          'IRestResponse response = client.Execute(request);\n\n',
          '// Extract token\n',
          'token = JObject.Parse(response.Content).SelectToken("$..access_token").ToString();\n',
          'refresh_token = JObject.Parse(response.Content).SelectToken("$..refresh_token").ToString();'
        ]
      },
      {
        Type: 'H4',
        Body: '3. Make a GET request to the DfE Information API application-info endpoint:'
      },
      {
        Type: 'INSET',
        Body: 'https://oat-api-customerengagement.platform.education.gov.uk/dfe/application-info'
      },
      {
        Type: 'CODE',
        Body: [
          '// prepare and make an api call to application authenticated endpoint\n',
          'var client = new RestClient("https://oat-api-customerengagement.platform.education.gov.uk");\n',
          'var request = new RestRequest("dfe/application-info", Method.GET);\n',
          'request.AddHeader("authorisation", "Bearer " + token);\n',
          'request.AddHeader("ocp-apim-subscription-key", "992519688c7c43ef916add082ac49e33");\n',
          'request.AddHeader("accept", "application/json; charset=utf-8");\n',
          'response = client.Execute(request);'
        ]
      },
      {
        Type: 'P',
        Body: 'This should give you a DfE department high level information response.'
      },
      {
        Type: 'H2',
        Body: 'Accessing a user-restricted endpoint'
      },
      {
        Type: 'P',
        Body: 'In this example, you will request an OAuth 2.0 access token in your code (using your client ID and secret) and use it to access the DfE Information API user-info endpoint.'
      },
      {
        Type: 'P',
        Body: 'The user-restricted endpoints give details about their authorisation endpoint on the API page.'
      },
      {
        Type: 'H3',
        Body: 'Authorise user'
      },
      {
        Type: 'P',
        Body: "To begin the flow, you'll need to get the user's authorisation. This may include one or both of:"
      },
      {
        Type: 'UL',
        Body: [
          'authenticating the user',
          'obtaining user consent for the requested permission level (if you do not have it)'
        ]
      },
      {
        Type: 'P',
        Body: 'To authorise the user, your app must send the user to the authorisation URL provided on the user-restricted API page. The scope details would also be provided on the specific API page.'
      },
      {
        Type: 'H4',
        Body: '1. Request an OAuth 2.0 authorisation code with the required scope:'
      },
      {
        Type: 'CODE',
        Body: 'https://user-restricted-end-point -login/authorise?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=https://YOUR_APP/callback&scope=SCOPE&audience=API_AUDIENCE&state=STATE'
      },
      {
        Type: 'P',
        Body: 'As an example, your HTML snippet for your authorisation URL when adding login to your app might look like:'
      },
      {
        Type: 'CODE',
        Body: '<a href="https://user-restricted-end-point-login/authorise?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=https://YOUR_APP/callback&scope=SCOPE&audience=API_AUDIENCE&state=xyzABC123">Sign In</a>'
      },
      {
        Type: 'P',
        Body: "The user will be redirected to the DfE Identity login screen. When they've entered their credentials, they'll be asked to authorise the application to access the requested scope."
      },
      {
        Type: 'P',
        Body: "When the user has given the requested authority, we will return to the application via the redirect URL. We'll provide an authorisation code as a query string parameter."
      },
      {
        Type: 'P',
        Body: "This authorisation code can then be exchanged for an OAuth 2.0 <code class='code--slim'>access_token</code> and a <code class='code--slim'>refresh_token</code>."
      },
      {
        Type: 'H4',
        Body: '2. Exchange the OAuth 2.0 authorisation code for an access token'
      },
      {
        Type: 'CODE',
        Body: [
          '// make a call to token endpoint to get access token\n',
          "var client = new RestClient('<Paste OAuth Token URL Here>');\n",
          'var request = new RestRequest(Method.POST);\n',
          'request.AddHeader("content-type", "application/x-www-form-urlencoded");\n',
          'request.AddParameter("grant_type", "authorisation_code");\n',
          'request.AddParameter("code", "<Paste-authorisation-code-here>");\n',
          'request.AddParameter("client_id", "<Paste-your-client-id-here>");\n',
          'request.AddParameter("client_secret", "<Paste-your-client-secret-here>");\n',
          'request.AddParameter("redirect_url", "<Paste-your-redirect-url-here>");\n',
          'IRestResponse response = client.Execute(request);\n\n',
          '// Extract token\n',
          'token = JObject.Parse(response.Content).SelectToken("$..access_token").ToString();\n',
          'refresh_token = JObject.Parse(response.Content).SelectToken("$..refresh_token").ToString();'
        ]
      },
      {
        Type: 'H4',
        Body: '3. Make a GET request to the ‘DfE Information’ API user-info endpoint:'
      },
      {
        Type: 'INSET',
        Body: 'https://oat-api-customerengagement.platform.education.gov.uk/dfe/user-info'
      },
      {
        Type: 'CODE',
        Body: [
          '// prepare and make an API call to application authenticated endpoint\n',
          'var client = new RestClient("https://oat-api-customerengagement.platform.education.gov.uk");\n',
          'var request = new RestRequest("dfe/user-info", Method.GET);\n',
          'request.AddHeader("authorisation", "Bearer " + token);\n',
          'request.AddHeader("ocp-apim-subscription-key", "992519688c7c43ef916add082ac49e33");\n',
          'request.AddHeader("accept", "application/json; charset=utf-8");\n',
          'response = client.Execute(request);'
        ]
      },
      {
        Type: 'H4',
        Body: '4. Refresh an expired OAuth 2.0 access_token:'
      },
      {
        Type: 'P',
        Body: "This exchanges a refresh_token for a new <code class='code--slim'>access_token</code> (and a new <code class='code--slim'>refresh_token</code>)."
      },
      {
        Type: 'CODE',
        Body: [
          '// construct the GET request for refresh token\n',
          'var client = new RestClient("<Paste token endpoint here>");\n',
          'var request = new RestRequest(Method.POST);\n',
          'request.AddHeader("content-type", "application/x-www-form-urlencoded");\n',
          'request.AddParameter("grant_type", "refresh_token");\n',
          'request.AddParameter("refresh_token", "<Paste refresh token here>");\n',
          'request.AddParameter("client_id", "<Paste your client id here>");\n',
          'request.AddParameter("client_secret", "<Paste your client secret here>");\n',
          '// make a call to get refresh token\n',
          'IRestResponse response = client.Execute(request);\n\n',
          '// Extract token\n',
          'token = JObject.Parse(response.Content).SelectToken("$..access_token").ToString();\n'
        ]
      }
    ]
  },
  'reference-guide': {
    title: 'Reference guide',
    url: '/documentation/reference-guide',
    content: [
      {
        Type: 'P',
        Body: 'Follow this reference guide to make sure your application integrates with DfE.'
      },
      {
        Type: 'P',
        Body: 'To avoid your application failing without warning when DfE makes changes, read best practice.'
      },
      {
        Type: 'H2',
        Body: 'Browser support for OAuth 2.0'
      },
      {
        Type: 'P',
        Body: "The OAuth 2.0 <a href='/documentation/authorisation' class='govuk-link'>authorisation</a> journey is designed to work with most modern browsers as per the list specified on <a href='https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices#browsers-to-test-in' class='govuk-link'>Designing for different browsers and devices</a>. The exception being Internet Explorer 11 which we are looking to release soon."
      },
      {
        Type: 'H2',
        Body: 'Coding in the open'
      },
      {
        Type: 'P',
        Body: "Find and Use an API, the underlying API Platform and some of the APIs are coded in the open, as per the <a href='https://www.gov.uk/service-manual/service-standard/make-all-new-source-code-open' class='govuk-link' target='_blank'>GOV.UK Digital Service Standard (opens in a new tab)</a>."
      },
      {
        Type: 'P',
        Body: "The source code is available at <a href='https://github.com/DFE-Digital' class='govuk-link' target='_blank'>https://github.com/DFE-Digital (opens in a new tab)</a>. For more details, <a href='/support' class='govuk-link'>contact us</a>."
      },
      {
        Type: 'H2',
        Body: 'Redirect URLs'
      },
      {
        Type: 'P',
        Body: 'Redirect URLs send the user back to your application after successful (or unsuccessful) authorisation, before your application accesses user-restricted endpoints.'
      },
      {
        Type: 'P',
        Body: 'You must specify:'
      },
      {
        Type: 'UL',
        Body: [
          'one or more redirect URLs when you register your application',
          'one redirect URL when you send your user to our authorisation endpoint'
        ]
      },
      {
        Type: 'P',
        Body: "To protect your application from phishing attacks, your redirect URL for authorisation (in your call to <code class='code--slim'>/oauth/authorize</code>) must be the same as:"
      },
      {
        Type: 'UL',
        Body: [
          'one you used when you created your application',
          "the one for exchanging your authorisation code for an access token (in your call to <code class='code--slim'>/oauth/token</code>)"
        ]
      },

      {
        Type: 'H3',
        Body: 'Creating your URLs'
      },
      {
        Type: 'P',
        Body: 'When registering your application, you can:'
      },
      {
        Type: 'UL',
        Body: [
          "use the full redirect URL - for example <code class='code--slim'>https://www.example.com/auth-redirect</code>",
          "use a partial URL - for example <code class='code--slim'>https://www.example.com</code>",
          "include a port number - for example <code class='code--slim'>https://www.example.com:8080/auth-redirect</code>",
          "include a query component - for example <code class='code--slim'>https://www.example.com:8080/auth-redirect?some_parameter=some_value</code>"
        ]
      },
      {
        Type: 'P',
        Body: "When calling our authorisation endpoint, your redirect URL must include a percent-encode - for example <code class='code--slim'>https%3A%2F%2Fwww.example.com%2Fauth-redirect</code>"
      },
      {
        Type: 'P',
        Body: 'Your redirect URL must not:'
      },
      {
        Type: 'UL',
        Body: [
          "use http (except for installed applications) - for example <code class='code--slim'>http://www.example.com:8080/auth-redirect</code>",
          "use an IP address instead of a DNS name - for example <code class='code--slim'>https://203.0.113.11/auth-redirect</code>",
          "include a fragment component - for example <code class='code--slim'>https://www.example.com:8080/auth-redirect#some_fragment</code>",
          "be a relative URL - for example <code class='code--slim'>/auth-redirect</code>"
        ]
      },
      {
        Type: 'H2',
        Body: 'TLS standards'
      },
      {
        Type: 'P',
        Body: 'DfE APIs are only accessible over Transport Layer Security (TLS) 1.2 or higher.'
      }
    ]
  },
  'best-practices': {
    title: 'Best Practices',
    url: '/documentation/development-practices',
    content: [
      {
        Type: 'P',
        Body: 'Follow best practice to make sure your application does not fail when changes are made to the production environment.'
      },
      {
        Type: 'H2',
        Body: 'Coupling to DfE'
      },
      {
        Type: 'P',
        Body: 'Avoid tightly coupling your application to DfE. The systems will be dependent on one another so a change to one will affect both.'
      },
      {
        Type: 'P',
        Body: 'Use loose coupling - this reduces dependencies so that non-breaking changes will not affect your application.'
      },
      {
        Type: 'H2',
        Body: 'HTTPS certificates'
      },
      {
        Type: 'P',
        Body: 'Use a global root CA keystore and do not pin DfE specific certificates.'
      },
      {
        Type: 'P',
        Body: 'Find and Use an API’s HTTPS certificates can change - this includes the leaf, intermediary and root certificates.'
      },
      {
        Type: 'P',
        Body: 'If you import any DfE specific certificates into your keystore or load balancer, your application may fail to connect when changes are made to the certificate.'
      },
      {
        Type: 'H2',
        Body: 'IP addresses'
      },
      {
        Type: 'P',
        Body: 'IP addresses can change because we cannot supply static addresses.'
      },
      {
        Type: 'P',
        Body: 'To access our API platform and token generation with your application:'
      },
      {
        Type: 'UL',
        Body: [
          'you might need to configure your network',
          'any end users might need to configure their own network'
        ]
      },
      {
        Type: 'P',
        Body: 'You need to configure your network access in your proxy, not your firewall.'
      },
      {
        Type: 'H2',
        Body: 'Cross-origin resource sharing (CORS)'
      },
      {
        Type: 'P',
        Body: "The Find and Use an API service does not support <a href='https://fetch.spec.whatwg.org/#http-cors-protocol' class='govuk-link' target='_blank'>CORS (opens in a new tab)</a>. It is not possible to call our APIs from client-side code within a web browser, for example using Ajax."
      },
      {
        Type: 'H2',
        Body: 'Changes will affect your application'
      },
      {
        Type: 'P',
        Body: 'A breaking change is a change to the DfE API platform that requires you to make changes to your application so it continues to work.'
      },
      {
        Type: 'P',
        Body: 'Breaking changes can be:'
      },
      {
        Type: 'UL',
        Body: [
          'API specific',
          'Platform wide (for example TLS version and cipher suite changes)'
        ]
      },
      {
        Type: 'P',
        Body: 'The breaking change will be published to the sandbox initially and we recommend you run your automated test pack against the sandbox on a regular basis.'
      },
      {
        Type: 'P',
        Body: "See the <a href='/documentation/reference-guide' class='govuk-body'>reference guide</a> for further detail."
      }
    ]
  },
  'terms-of-use': {
    title: 'Terms of use',
    url: '/documentation/terms-of-use',
    content: [
      {
        Type: 'P',
        Body: 'Version 1 issued 18 August 2020'
      },
      {
        Type: 'P',
        Body: 'These terms of use explain what you can expect from us and what we expect from you when you create and operate software services on the Find and Use an API service. This is not a legal relationship between DfE and any software developer.'
      },
      {
        Type: 'P',
        Body: 'We reserve the right to remove your access to the Find and Use an API service and its application programming interfaces (APIs) temporarily or permanently.'
      },
      {
        Type: 'P',
        Body: 'These terms may change from time to time and we will let you know when this happens. If the changes are minor, we will assume you agree to them unless we hear from you. If they are major, you may need to re-accept these terms of use.'
      },
      {
        Type: 'P',
        Body: "If you have any questions <a class='govuk-link' href='/support'>contact us</a>."
      },
      {
        Type: 'H2',
        Body: 'Background checks'
      },
      {
        Type: 'P',
        Body: 'We may carry out basic background checks on your organisation, including:'
      },
      {
        Type: 'UL',
        Body: [
          'information held by Companies House',
          'your website'
        ]
      },
      {
        Type: 'H2',
        Body: 'What you can expect from us'
      },
      {
        Type: 'P',
        Body: 'We will:'
      },
      {
        Type: 'UL',
        Body: [
          "give you at least 6 months' notice of changes affecting any stable APIs",
          'make sure any minor changes made to stable APIs are backwards compatible',
          'provide reasonable notice of changes affecting beta APIs, which can change fairly frequently',
          'warn you before we retire an API'
        ]
      },
      {
        Type: 'H2',
        Body: 'What we expect from you'
      },
      {
        Type: 'P',
        Body: "Your software must take into account the <a href='https://www.gov.uk/service-manual/service-standard' class='govuk-link' target='_blank'>Digital Service Standard (opens in a new tab)</a>."
      },
      {
        Type: 'P',
        Body: 'We take the protection of customer data seriously and we expect you to do the same.'
      },
      {
        Type: 'P',
        Body: 'You will need to follow:'
      },
      {
        Type: 'UL',
        Body: [
          "<a href='https://www.ncsc.gov.uk/collection/digital-service-security' class='govuk-link' target='_blank'>National Cyber Security Centre's Digital Service Security (opens in a new tab)</a>",
          "<a href='https://www.ncsc.gov.uk/blog-post/secure-development-and-deployment' class='govuk-link' target='_blank'>National Cyber Security Centre's Guidance for secure development and deployment (opens in a new tab)</a>",
          "<a href='https://www.ncsc.gov.uk/guidance/tls-external-facing-services' class='govuk-link' target='_blank'>Transport Layer Security principles for protecting data (opens in a new tab)</a>",
          "<a href='https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr' class='govuk-link' target='_blank'>General Data Protection Regulation - GDPR (opens in a new tab)</a>",
          "<a href='https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/privacy-and-electronic-communications-regulations/' class='govuk-link' target='_blank'>Privacy and Electronic Communications (EC Directive) Regulations 2003 - as amended (opens in a new tab)</a>",
          "<a href='https://www.legislation.gov.uk/ukpga/2010/15/contents' class='govuk-link' target='_blank'>Equality Act 2010 (opens in a new tab)</a>",
          "<a href='https://ico.org.uk/for-organisations/' class='govuk-link' target='_blank'>Information Commissioner's Office (opens in a new tab)</a>",
          "<a href='https://ico.org.uk/for-organisations/guide-to-data-protection/introduction-to-data-protection/about-the-dpa-2018/' class='govuk-link' target='_blank'>Data Protection Act 2018 (opens in a new tab)</a>"
        ]
      },
      {
        Type: 'P',
        Body: 'You must continue to follow these acts and regulations if they change or are replaced.'
      },
      {
        Type: 'H3',
        Body: 'Accessing data'
      },
      {
        Type: 'P',
        Body: 'You must give your users access to their data. We may also ask to access their data if we open an investigation.'
      },
      {
        Type: 'P',
        Body: 'If you withdraw a piece of software or a user stops using it, you must let them retrieve and export all their data so they can meet their obligations to us.'
      },
      {
        Type: 'P',
        Body: 'We recommend you use multi-factor authentication to protect personal data.'
      },
      {
        Type: 'H3',
        Body: 'Processing data'
      },
      {
        Type: 'P',
        Body: "If your software processes personal data, you may need to pay a <a href='https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/guide-to-the-data-protection-fee/' class='govuk-link' target='_blank'>data protection fee (opens in a new tab)</a>."
      },
      {
        Type: 'P',
        Body: 'Use your API’s HTTP headers to pass audit data to us. This will help us protect our users’ confidential data.'
      },
      {
        Type: 'P',
        Body: "To find out if header information is compulsory for your API, that you use, read its' <a href='/apis' class='govuk-link'>API documentation</a>. All headers will become compulsory so you should start using them now."
      },
      {
        Type: 'H3',
        Body: 'Storing data'
      },
      {
        Type: 'P',
        Body: 'If you store and process personal data, you must tell users:'
      },
      {
        Type: 'UL',
        Body: [
          'what personal data you’ll be processing and what you’ll use it for',
          'that you’re responsible for protecting their data',
          'if you intend to store their data outside the European Economic Area (EEA)',
          "your <a href='https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/' class='govuk-link' target='_blank'>lawful basis (opens in a new tab)</a> for processing their personal data"
        ]
      },
      {
        Type: 'P',
        Body: "Follow <a href='https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/consent/' class='govuk-link' target='_blank'>GDPR rules on obtaining consent (opens in a new tab)</a>, if you need users' consent to store and process their personal data."
      },
      {
        Type: 'P',
        Body: "If you store or process data outside the EEA, you must follow GDPR guidance on <a href='https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr/international-transfers/' class='govuk-link' target='_blank'>international transfers (opens in a new tab)</a>."
      },
      {
        Type: 'H3',
        Body: 'Accessibility'
      },
      {
        Type: 'P',
        Body: 'You must:'
      },
      {
        Type: 'UL',
        Body: [
          "meet <a href='https://www.w3.org/TR/WCAG21/' class='govuk-link' target='_blank'>W3C's Web Content Accessibility Guidelines (opens in a new tab)</a> at a minimum level of AA if your software's web-based, or <a href='https://www.w3.org/TR/mobile-accessibility-mapping/' class='govuk-link' target='_blank'>W3C's guidelines for mobile software (opens in a new tab)</a>",
          'give us evidence that your software meets the guidelines if we ask for it',
          "<a href='/support' class='govuk-link'>contact us</a> if you have any concerns meeting these guidelines"
        ]
      },
      {
        Type: 'H3',
        Body: 'Advertising and marketing'
      },
      {
        Type: 'P',
        Body: 'Any advertising that appears in your software must follow both:'
      },
      {
        Type: 'UL',
        Body: [
          "<a href='https://www.asa.org.uk/codes-and-rulings/advertising-codes.html' class='govuk-link' target='_blank'>Advertising Standards Authority Codes (opens in a new tab)</a>",
          "<a href='https://www.gov.uk/marketing-advertising-law/regulations-that-affect-advertising' class='govuk-link' target='_blank'>UK marketing and advertising laws (opens in a new tab)</a>"
        ]
      },
      {
        Type: 'P',
        Body: 'You must not use advertising that promotes:'
      },
      {
        Type: 'UL',
        Body: [
          'adult themes',
          'dating',
          'gaming'
        ]
      },
      {
        Type: 'P',
        Body: "You cannot share personal data for marketing without users' consent, as defined in the <a href='https://ico.org.uk/media/1555/direct-marketing-guidance.pdf' class='govuk-link' target='_blank'>Information Commissioner's Office (opens in a new tab)</a>."
      },
      {
        Type: 'H3',
        Body: 'Licence agreements'
      },
      {
        Type: 'P',
        Body: 'You must make the terms of the licence agreement between you and your users clear to them.'
      },
      {
        Type: 'H3',
        Body: 'Security'
      },
      {
        Type: 'P',
        Body: 'You must:'
      },
      {
        Type: 'UL',
        Body: [
          'check software for vulnerabilities through secure development and pre-release testing',
          "check open source or reused proprietary code using resources like the <a href='https://cve.mitre.org/' class='govuk-link' target='_blank'>Common Vulnerabilities and Exposures (opens in a new tab)</a> database",
          'react quickly if you find vulnerabilities in your code',
          'have a patching policy in place'
        ]
      },
      {
        Type: 'P',
        Body: 'Your re-releases and upgrades should also follow secure development practices and pre-release testing.'
      },
      {
        Type: 'P',
        Body: 'We recommend following the security principles of:'
      },
      {
        Type: 'UL',
        Body: [
          "the <a href='https://www.ncsc.gov.uk/' class='govuk-link' target='_blank'>National Cyber Security Centre (opens in a new tab)</a>",
          "<a href='https://www.ncsc.gov.uk/blog-post/secure-development-and-deployment' class='govuk-link' target='_blank'>National Cyber Security Centre's Guidance for secure development and deployment (opens in a new tab)</a>",
          "the <a href='https://www.owasp.org/index.php/Main_Page' class='govuk-link' target='_blank'>Open Web Application Security Project (opens in a new tab)</a>",
          "<a href='https://www.cyberessentials.ncsc.gov.uk/' class='govuk-link' target='_blank'>Cyber Essentials or Cyber Essentials Plus certification (opens in a new tab)</a>"
        ]
      },
      {
        Type: 'P',
        Body: 'You should look out for and block suspicious attempts to access or manipulate user accounts.'
      },
      {
        Type: 'H2',
        Body: 'Support'
      },
      {
        Type: 'P',
        Body: "You must give software support to your users. If you need help <a href='/support' class='govuk-link'>contact us</a>."
      }
    ]
  }
}
