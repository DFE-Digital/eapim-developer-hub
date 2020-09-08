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
          <a className='govuk-link' href='#authentication'>Authentication</a>
        </li>
        <li>
          <a className='govuk-link' href='#consent-process'>Consent Process</a>
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
        with the DfE Developer Hub and access some basic information about the
        Department to prove access to an unrestricted endpoint.
      </p>
      <h2 className='govuk-heading-l' id='versioning'>2. Versioning</h2>
      <p className='govuk-body'>
        When an API changes, we will strive to make backwards compatible changes
        were possible. When this is not possible, we will provide a notice on deprecated
        endpoints and make a new endpoint available.
      </p>

      <h2 className='govuk-heading-l' id='api-browser-and-swagger-file'>3. API browser and swagger file</h2>
      <p className='govuk-body'>
        For more detailed information on each API action, you can:
      </p>
      <ul className='govuk-list govuk-list--bullet'>
        <li>open the API browser</li>
        <li>look at the API Swagger file: <a className='govuk-link' href='/static/dfe-information-api.openapi+json.json' download='dfe-information-api.json'>download</a></li>
        <li>You can also generate a client library from the Swagger file using the Swagger
        editor.</li>
      </ul>

      <h2 className='govuk-heading-l' id='authentication'>4. Authentication</h2>
      <p className='govuk-body'>
        Usage of the DfE Information API does not require authentication – no API keys
        are required, so you can start using it immediately.
      </p>

      <h2 className='govuk-heading-l' id='consent-process'>5. Consent process</h2>
      <p className='govuk-body'>
        Access to the DfE Information API does not utilise a consent process.
      </p>

      <h2 className='govuk-heading-l' id='http-status-codes'>6. HTTP status codes</h2>
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

      <h2 className='govuk-heading-l' id='api-error-codes'>7. API error codes</h2>
      <p className='govuk-body'>
        There are no specific API error codes for the DfE Information API.
      </p>

      <h2 className='govuk-heading-l' id='rate-limiting'>8. Rate Limiting</h2>
      <p className='govuk-body'>We have introduced limits on API usage rates in terms of requests per minute.</p>
      <p className='govuk-body'>If you exceed this limit, you will receive a 429 Too Many Requests HTTP status
      code for each request made within the remainder of the time.</p>
      <p className='govuk-body'>Per minute, you can make:</p>
      <ul className='govuk-list govuk-list--bullet'>
        <li>Up to 10 GET requests per endpoint</li>
      </ul>

      <h2 className='govuk-heading-l' id='endpoints'>9. Endpoints</h2>

      <p className='govuk-body'>
        <code className='code--slim'>/dfe/<strong>information</strong></code>
      </p>
      <details className='govuk-details' data-module='govuk-details'>
        <summary className='govuk-details__summary'>
          <div className='api-information-endpoint-title'>
            <span className='govuk-details__summary-text'>
              Retrieve information about the Department for Education
            </span>
          </div>
          <div className='api-information-endpoint-tag'>
            <strong className={`govuk-tag govuk-tag-round govuk-tag--blue`}>GET</strong>
          </div>
        </summary>
        <div className='govuk-details__text'>
          <table className='govuk-table'>
            <thead className='govuk-table__head'>
              <tr className='govuk-table__row'>
                <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Description</th>
              </tr>
            </thead>
            <tbody className='govuk-table__body'>
              <tr className='govuk-table__row'>
                <td className='govuk-table__cell'>Returns information about the Department for Education.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

    </div>
  )
}

export default DfEAPIInformation
