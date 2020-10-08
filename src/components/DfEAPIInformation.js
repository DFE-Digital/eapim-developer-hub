import React from 'react'

const DfEAPIInformation = ({ selectedApi }) => {
  return (
    <div className='api-information-page'>
      <h1 className='govuk-heading-xl govuk-!-margin-bottom-3'>{(selectedApi ? selectedApi.properties.displayName : '')}</h1>
      <p className='govuk-body govuk-!-margin-top-6'>{(selectedApi ? selectedApi.properties.description : '')}</p>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Lifecycle stage</th>
            <td className='govuk-table__cell govuk-!-width-one-half'>{selectedApi.tags.lifecycleStage}</td>
          </tr>
          {selectedApi.tags.swaggerFile && (
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Swagger file</th>
              <td className='govuk-table__cell govuk-!-width-one-half'>
                <a className='govuk-link' href={selectedApi.tags.swaggerFile} download='dfe-information-api.json' target='_blank'>View swagger file</a>
              </td>
            </tr>
          )}
          {selectedApi.tags.guideline && (
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Guideline</th>
              <td className='govuk-table__cell govuk-!-width-one-half'>
                <a className='govuk-link' href={selectedApi.tags.guideline} download='dfe-information-api-guideline'>Download guideline</a>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ol className='govuk-list govuk-list--number'>
        <li>
          <a className='govuk-link' href='#overview'>Overview</a>
        </li>
        <li>
          <a className='govuk-link' href='#versioning'>Versioning</a>
        </li>
        <li>
          <a className='govuk-link' href='#api-browser-and-swagger-file'>API browser and swagger file</a>
        </li>
        <li>
          <a className='govuk-link' href='#http-status-codes'>HTTP status codes</a>
        </li>
        <li>
          <a className='govuk-link' href='#api-error-codes'>API error codes</a>
        </li>
        <li>
          <a className='govuk-link' href='#rait-limiting'>Rate Limiting</a>
        </li>
        <li>
          <a className='govuk-link' href='#endpoints'>Endpoints</a>
        </li>
      </ol>

      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-9' />

      <h2 className='govuk-heading-l' id='overview'>1. Overview</h2>
      <p className='govuk-body'>
        The DfE Information API has been created as an example to demonstrate the
        capabilities of the DfE Developer Hub. It allows software developers to connect
        with the DfE Developer Hub and access some basic information about the Department
        to prove access to:
      </p>
      <ul className='govuk-list govuk-list--bullet'>
        <li>
          Low restricted endpoint APIs
          <ul className='govuk-list govuk-list--bullet'>
            <li>Open-info endpoint is an example of least restricted endpoint</li>
          </ul>
        </li>
        <li>
          Application restricted endpoint APIs
          <ul className='govuk-list govuk-list--bullet'>
            <li>Application-info endpoint is an example of application restricted endpoint</li>
          </ul>
        </li>
        <li>
          User restricted endpoint APIs
          <ul className='govuk-list govuk-list--bullet'>
            <li>User-info is an example of a user-restricted endpoin</li>
          </ul>
        </li>
      </ul>
      <p className='govuk-body'>
        Further details of the different access levels are given on the <a href='/documentation/authorisation' className='govuk-link'>Authorisation</a> page.
      </p>
      <p className='govuk-body'>
        For more information about how to develop your own client applications, including example clients for this API, see <a href='/documentation/tutorials' className='govuk-link'>Tutorials</a>.
      </p>

      <h2 className='govuk-heading-l' id='versioning'>2. Versioning</h2>
      <p className='govuk-body'>
        When an API changes, we will strive to make backwards compatible changes were possible.
        When this is not possible, we will provide a notice on deprecated endpoints and make a
        new endpoint available. The current live version of the DfE Information API is 1.0.
      </p>

      <h2 className='govuk-heading-l' id='api-browser-and-swagger-file'>3. API browser and swagger file</h2>
      <p className='govuk-body'>
        For more detailed schema information on the DfE Information API, you can:
      </p>
      <ul className='govuk-list govuk-list--bullet'>
        <li>Open an API browser like <a href='https://editor.swagger.io/' className='govuk-link' target='_blank'>Swagger Editor</a></li>
        <li>Copy the swagger file content in to the Swagger Editor</li>
        <li>You can also generate a client library from the swagger file using Swagger Editor</li>
      </ul>

      <h2 className='govuk-heading-l' id='http-status-codes'>4. HTTP status codes</h2>
      <p className='govuk-body'>The DfE Information API uses standard HTTP response code conventions:</p>
      <ul className='govuk-list govuk-list--bullet'>
        <li>100 codes are informational</li>
        <li>200 codes indicate success</li>
        <li>300 codes indicate a redirection</li>
        <li>400 codes indicate a client-side error</li>
        <li>500 codes indicate a server-side error</li>
      </ul>
      <p className='govuk-body'>Common status codes are:</p>

      <table className='govuk-table'>
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            <th scope='col' className='govuk-table__header govuk-!-width-one-quarter'>HTTP Status code</th>
            <th scope='col' className='govuk-table__header govuk-!-width-one-quarter'>Message</th>
            <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Comments</th>
          </tr>
        </thead>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <td className='govuk-table__cell'>200</td>
            <td className='govuk-table__cell'>OK</td>
            <td className='govuk-table__cell'>This status code indicates that the request has been processed successfully</td>
          </tr>
          <tr className='govuk-table__row'>
            <td className='govuk-table__cell'>400</td>
            <td className='govuk-table__cell'>Bad Request</td>
            <td className='govuk-table__cell'>This status code indicates that the
              incoming request body or parameters
              do not conform with the
              OpenAPI/Swagger document which
              describes the API</td>
          </tr>
          <tr className='govuk-table__row'>
            <td className='govuk-table__cell'>403</td>
            <td className='govuk-table__cell'>Service Unavailable</td>
            <td className='govuk-table__cell'>This status code indicates that the service is currently unavailable</td>
          </tr>
          <tr className='govuk-table__row'>
            <td className='govuk-table__cell'>429</td>
            <td className='govuk-table__cell'>Too Many Requests</td>
            <td className='govuk-table__cell'>This status code indicates that the
              throttling limit of a client has be
              exceeded</td>
          </tr>
          <tr className='govuk-table__row'>
            <td className='govuk-table__cell'>504</td>
            <td className='govuk-table__cell'>Gateway Timeout</td>
            <td className='govuk-table__cell'>This status code indicates that there is
              a network connection problem within
              the layers of the API fulfilment stack</td>
          </tr>
        </tbody>
      </table>

      <h2 className='govuk-heading-l' id='api-error-codes'>5. API error codes</h2>
      <p className='govuk-body'>
        There are no specific API error codes for the DfE Information API.
      </p>

      <h2 className='govuk-heading-l' id='rate-limiting'>6. Rate Limiting</h2>
      <p className='govuk-body'>We have introduced limits on API usage rates in terms of requests per minute.</p>
      <p className='govuk-body'>If you exceed this limit, you will receive a 429 Too Many Requests HTTP status
      code for each request made within the remainder of the time.</p>
      <p className='govuk-body'>Per minute, you can make:</p>
      <ul className='govuk-list govuk-list--bullet'>
        <li>Up to 10 GET requests per endpoint</li>
      </ul>

      <h2 className='govuk-heading-l' id='endpoints'>7. Endpoints</h2>

      <details className='govuk-details' data-module='govuk-details'>
        <summary className='govuk-details__summary'>
          <div className='api-information-endpoint-title'>
            <span className='govuk-details__summary-text'>
              /dfe/<strong>open-info</strong>
            </span>
          </div>
          <div className='api-information-endpoint-tag'>
            <strong className={`govuk-tag govuk-tag-round govuk-tag--blue`}>GET</strong>
          </div>
        </summary>
        <div className='govuk-details__text'>
          <h4 className='govuk-heading'>Description</h4>
          <p className='govuk-body'>
            A simple example for integrating with a low restriction DfE APIs.
          </p>
          <p className='govuk-body'>
            Any request to this endpoint returns a text paragraph providing high level information
            about the department.
          </p>
          <h4 className='govuk-heading'>Authorisation</h4>
          <p className='govuk-body'>
            This endpoint is least restricted and requires no Authorisation header.
            You would however need to send DfE Information API Subscription key in a
            header. This key can be retrieved by Subscribing to the API.
          </p>
          <h4 className='govuk-heading'>Request headers</h4>
          <table className='govuk-table'>
            <thead className='govuk-table__head'>
              <tr className='govuk-table__row'>
                <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Name</th>
                <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Description</th>
              </tr>
            </thead>
            <tbody className='govuk-table__body'>
              <tr className='govuk-table__row'>
                <td className='govuk-table__cell'>Ocp-Apim-Subscription-Key</td>
                <td className='govuk-table__cell'>DfE Information API subscription key</td>
              </tr>
            </tbody>
          </table>

          <h4 className='govuk-heading'>Response</h4>
          <p className='govuk-body'>HTTP status: <code className='code--slim'>200 (OK)</code></p>
          <code className='code--block'>
            {`{
  "Open Information: The Department for Education is responsible for children’s services and education, including early years, schools, higher and further education policy, apprenticeships and wider skills in England."
}`}
          </code>
        </div>
      </details>

      <details className='govuk-details' data-module='govuk-details'>
        <summary className='govuk-details__summary'>
          <div className='api-information-endpoint-title'>
            <span className='govuk-details__summary-text'>
              /dfe/<strong>application-info</strong>
            </span>
          </div>
          <div className='api-information-endpoint-tag'>
            <strong className={`govuk-tag govuk-tag-round govuk-tag--blue`}>GET</strong>
          </div>
        </summary>
        <div className='govuk-details__text'>
          <h4 className='govuk-heading'>Description</h4>
          <p className='govuk-body'>
            A simple example for integrating with an application restricted endpoint.
          </p>
          <p className='govuk-body'>
            Any request to this endpoint returns a text paragraph providing high level
            information about the department.
          </p>
          <h4 className='govuk-heading'>Authorisation</h4>
          <p className='govuk-body'>
            This endpoint is application restricted and requires an access token to be sent
            in the Authorisation header.  You also need to send a DfE Information API Subscription
            key in a header. This key can be retrieved by Subscribing to the API.
          </p>
          <h4 className='govuk-heading'>Request headers</h4>
          <table className='govuk-table'>
            <thead className='govuk-table__head'>
              <tr className='govuk-table__row'>
                <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Name</th>
                <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Description</th>
              </tr>
            </thead>
            <tbody className='govuk-table__body'>
              <tr className='govuk-table__row'>
                <td className='govuk-table__cell'>Ocp-Apim-Subscription-Key</td>
                <td className='govuk-table__cell'>DfE Information API subscription key</td>
              </tr>
              <tr className='govuk-table__row'>
                <td className='govuk-table__cell'>Authorisation</td>
                <td className='govuk-table__cell'>An OAuth 2.0 Bearer token. For example: <code className='code--slim'>Bearer d3931854e4f440138f8e2e9dc007635a</code></td>
              </tr>
            </tbody>
          </table>

          <h4 className='govuk-heading'>Response</h4>
          <p className='govuk-body'>HTTP status: <code className='code--slim'>200 (OK)</code></p>
          <code className='code--block'>
            {`{
  "Open Information: The Department for Education is responsible for children’s services and education, including early years, schools, higher and further education policy, apprenticeships and wider skills in England."
}`}
          </code>
        </div>
      </details>

      <details className='govuk-details' data-module='govuk-details'>
        <summary className='govuk-details__summary'>
          <div className='api-information-endpoint-title'>
            <span className='govuk-details__summary-text'>
              /dfe/<strong>user-info</strong>
            </span>
          </div>
          <div className='api-information-endpoint-tag'>
            <strong className={`govuk-tag govuk-tag-round govuk-tag--blue`}>GET</strong>
          </div>
        </summary>
        <div className='govuk-details__text'>
          <h4 className='govuk-heading'>Description</h4>
          <p className='govuk-body'>
            A simple example for integrating with a user restricted endpoint.
          </p>
          <p className='govuk-body'>
            Any request to this endpoint returns a text paragraph providing high level
            information about the department.
          </p>
          <h4 className='govuk-heading'>Authorisation</h4>
          <p className='govuk-body'>
            This endpoint is user restricted and requires an access token to be sent in
            the Authorisation header. Read about user-restricted endpoints in the tutorial
            section to understand more about these type of endpoints. You also need to send
            a DfE Information API Subscription key in a header. This key can be retrieved by
            Subscribing to the API.
          </p>
          <h4 className='govuk-heading'>Request headers</h4>
          <table className='govuk-table'>
            <thead className='govuk-table__head'>
              <tr className='govuk-table__row'>
                <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Name</th>
                <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Description</th>
              </tr>
            </thead>
            <tbody className='govuk-table__body'>
              <tr className='govuk-table__row'>
                <td className='govuk-table__cell'>Ocp-Apim-Subscription-Key</td>
                <td className='govuk-table__cell'>DfE Information API subscription key</td>
              </tr>
              <tr className='govuk-table__row'>
                <td className='govuk-table__cell'>Authorisation</td>
                <td className='govuk-table__cell'>An OAuth 2.0 Bearer token. For example: <code className='code--slim'>Bearer d3931854e4f440138f8e2e9dc007635a</code></td>
              </tr>
            </tbody>
          </table>

          <h4 className='govuk-heading'>Response</h4>
          <p className='govuk-body'>HTTP status: <code className='code--slim'>200 (OK)</code></p>
          <code className='code--block'>
            {`{
  "User Information: The Department for Education is responsible for children’s services and education, including early years, schools, higher and further education policy, apprenticeships and wider skills in England."
}`}
          </code>
        </div>
      </details>

    </div>
  )
}

export default DfEAPIInformation
