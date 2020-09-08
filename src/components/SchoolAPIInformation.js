import React, { Fragment } from 'react'
import AuthWarning from 'components/common/AuthWarning'

import Content from '../../content.json'

const SchoolAPIInformation = ({ selectedApi, isLoggedIn, msalConfig }) => {
  return (
    <div className='api-information-page'>
      <h1 className='govuk-heading-xl govuk-!-margin-bottom-3'>
        {(selectedApi ? selectedApi.properties.displayName : '')}
      </h1>
      <p className='govuk-body govuk-!-margin-top-6'>
        {(selectedApi ? selectedApi.properties.description : '')}
      </p>

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
        {isLoggedIn &&
          <Fragment>
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
          </Fragment>
        }
      </ol>

      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-9' />

      <h2 className='govuk-heading-l' id='overview'>1. Overview</h2>
      <p className='govuk-body'>
      The School Information API has been developed as an example to
      demonstrate the capabilities of the DfE Developer Hub. It allows software
      developers to connect with the DfE Developer Hub and access some basic
      information about schools to prove access to a restricted endpoint.
      </p>

      {
        !isLoggedIn
          ? <AuthWarning msalConfig={msalConfig} warning={Content.Apis['APIs'].Content.Auth.Warning} />
          : (
            <Fragment>
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
                <li>look at the API Swagger file: <a className='govuk-link' href='/static/schools-information-api.openapi+json.json' download='schools-information-api.json'>download</a></li>
                <li>You can also generate a client library from the Swagger file using the Swagger
              editor.</li>
              </ul>

              <h2 className='govuk-heading-l' id='authentication'>4. Authentication</h2>
              <p className='govuk-body'>
                This School Information API is user-restricted and requires an Authorization
                header containing an OAuth 2.0 Bearer Token
                When you make an API call, you must include request headers including the
                subscription-key header with your valid subscription key. To obtain a
                subscription key, request a key via API Subscriptions
              </p>
              <code className='code--block language-javascript'>
                Authorization: Bearer {`<YOUR-API-KEY-HERE>`}<br />
                Ocp-Apim-Subscription-Key: {`<YOUR-SUBSCRIPTION-KEY-HERE>`}
              </code>

              <h2 className='govuk-heading-l' id='consent-process'>5. Consent process</h2>
              <p className='govuk-body'>
                Access to the Schools Information API does not utilise a consent process.
              </p>

              <h2 className='govuk-heading-l' id='http-status-codes'>6. HTTP status codes</h2>
              <p className='govuk-body'>The School Information API uses standard HTTP response code conventions:</p>
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

              <table className='govuk-table'>
                <thead className='govuk-table__head'>
                  <tr className='govuk-table__row'>
                    <th scope='col' className='govuk-table__header govuk-!-width-one-quarter'>Request Type</th>
                    <th scope='col' className='govuk-table__header govuk-!-width-one-quarter'>Error Code</th>
                    <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Description</th>
                  </tr>
                </thead>
                <tbody className='govuk-table__body'>
                  <tr className='govuk-table__row'>
                    <td className='govuk-table__cell'>Get School Information by Establishment ID</td>
                    <td className='govuk-table__cell'>URN1</td>
                    <td className='govuk-table__cell'>The request provided does not contain
                    a valid Establishment ID</td>
                  </tr>
                  <tr className='govuk-table__row'>
                    <td className='govuk-table__cell'>Get School Information by MAT ID</td>
                    <td className='govuk-table__cell'>LA1</td>
                    <td className='govuk-table__cell'>The request provided does not contain
                    a valid MATS ID</td>
                  </tr>
                  <tr className='govuk-table__row'>
                    <td className='govuk-table__cell'>Get School Information by SAT ID</td>
                    <td className='govuk-table__cell'>POE1</td>
                    <td className='govuk-table__cell'>The request provided does not contain
                  a valid SATS ID</td>
                  </tr>
                </tbody>
              </table>

              <h2 className='govuk-heading-l' id='rate-limiting'>8. Rate Limiting</h2>
              <p className='govuk-body'>We have introduced limits on API usage rates in terms of requests per minute.</p>
              <p className='govuk-body'>If you exceed this limit, you will receive a 429 Too Many Requests HTTP status
            code for each request made within the remainder of the time.</p>
              <p className='govuk-body'>Per minute, you can make:</p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>Up to 100 GET requests to School Information by Establishment ID</li>
                <li>Up to 100 GET requests to School Information by MAT ID</li>
                <li>Up to 100 GET requests to School Information by SAT ID</li>
              </ul>

              <h2 className='govuk-heading-l' id='endpoints'>9. Endpoints</h2>

              <p className='govuk-body'>
                <code className='code--slim'>/schools/establishments/<strong>{`{establishmentId}`}</strong></code>
              </p>
              <details className='govuk-details' data-module='govuk-details'>
                <summary className='govuk-details__summary'>
                  <div className='api-information-endpoint-title'>
                    <span className='govuk-details__summary-text'>
                      Retrieve an establishment
                    </span>
                  </div>
                  <div className='api-information-endpoint-tag'>
                    <strong className={`govuk-tag govuk-tag-round govuk-tag--blue`}>GET</strong>
                  </div>
                </summary>
                <div className='govuk-details__text'>
                  <table className='govuk-table'>
                    <caption className='govuk-table__caption'>Path parameters</caption>
                    <thead className='govuk-table__head'>
                      <tr className='govuk-table__row'>
                        <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Name</th>
                        <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Description</th>
                      </tr>
                    </thead>
                    <tbody className='govuk-table__body'>
                      <tr className='govuk-table__row'>
                        <td className='govuk-table__cell'>Establishment ID</td>
                        <td className='govuk-table__cell'>Returns the list of establishments or an establishment filtered by its Identifier.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
              <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-4' />

              <p className='govuk-body'>
                <code className='code--slim'>/schools/mats/<strong>{`{matId}`}</strong></code>
              </p>
              <details className='govuk-details' data-module='govuk-details'>
                <summary className='govuk-details__summary'>
                  <div className='api-information-endpoint-title'>
                    <span className='govuk-details__summary-text'>
                      Retrieve a multi academy trust
                    </span>
                  </div>
                  <div className='api-information-endpoint-tag'>
                    <strong className={`govuk-tag govuk-tag-round govuk-tag--blue`}>GET</strong>
                  </div>
                </summary>
                <div className='govuk-details__text'>
                  <table className='govuk-table'>
                    <caption className='govuk-table__caption'>Path parameters</caption>
                    <thead className='govuk-table__head'>
                      <tr className='govuk-table__row'>
                        <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Name</th>
                        <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Description</th>
                      </tr>
                    </thead>
                    <tbody className='govuk-table__body'>
                      <tr className='govuk-table__row'>
                        <td className='govuk-table__cell'>MAT ID</td>
                        <td className='govuk-table__cell'>Returns the list of multi academy trusts or a single mat filtered by its Identifier.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
              <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-4' />

              <p className='govuk-body'>
                <code className='code--slim'>/schools/sats/<strong>{`{satId}`}</strong></code>
              </p>
              <details className='govuk-details' data-module='govuk-details'>
                <summary className='govuk-details__summary'>
                  <div className='api-information-endpoint-title'>
                    <span className='govuk-details__summary-text'>
                      Retrieve a single academy trust
                    </span>
                  </div>
                  <div className='api-information-endpoint-tag'>
                    <strong className={`govuk-tag govuk-tag-round govuk-tag--blue`}>GET</strong>
                  </div>
                </summary>
                <div className='govuk-details__text'>
                  <table className='govuk-table'>
                    <caption className='govuk-table__caption'>Path parameters</caption>
                    <thead className='govuk-table__head'>
                      <tr className='govuk-table__row'>
                        <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Name</th>
                        <th scope='col' className='govuk-table__header govuk-!-width-one-half'>Description</th>
                      </tr>
                    </thead>
                    <tbody className='govuk-table__body'>
                      <tr className='govuk-table__row'>
                        <td className='govuk-table__cell'>SAT ID</td>
                        <td className='govuk-table__cell'>Returns the list of single academy trusts or a single sat filtered by its Identifier.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </Fragment>
          )
      }
    </div>
  )
}

export default SchoolAPIInformation
