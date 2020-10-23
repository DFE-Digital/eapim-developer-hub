import React, { Fragment } from 'react'
import AuthWarning from 'components/common/AuthWarning'

import Content from '../../content.json'

const AttendanceAPIInformation = ({ selectedApi, isLoggedIn, msalConfig, msalRegisterConfig }) => {
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
        The Attendance API has been developed to provide the ability to submit attendance
        data of schools. It allows MIS software developers of schools to connect with the
        DfE Developer Hub and submit the summarised attendance data on the behalf of schools
        securely to a restricted endpoint.
      </p>

      {
        !isLoggedIn
          ? <AuthWarning msalConfig={msalConfig} msalRegisterConfig={msalRegisterConfig} warning={Content.Apis['APIs'].Content.Auth.Warning} />
          : (
            <Fragment>
              <h2 className='govuk-heading-l' id='versioning'>2. Versioning</h2>
              <p className='govuk-body'>
                When an API changes, we will strive to make backwards compatible changes were possible.
                When this is not possible, we will provide a notice on deprecated endpoints and make a new
                endpoint available.
              </p>

              <h2 className='govuk-heading-l' id='api-browser-and-swagger-file'>3. API browser and swagger file</h2>
              <p className='govuk-body'>
                For more detailed information on each API action, you can:
              </p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>open the API browser</li>
                <li>look at the API Swagger file: <a className='govuk-link' href='/static/dfe-attendance-api.openapi+json.json' download='dfe-information-api.json'>download</a></li>
                <li>You can also generate a client library from the Swagger file using the Swagger
                editor.</li>
              </ul>

              <h2 className='govuk-heading-l' id='authentication'>4. Authentication</h2>
              <p className='govuk-body'>
                Usage of the DfE Attendance API require authentication. You need to register an application
                through the Developer hub portal and request to subscribe to our Api. Once your Api
                subscription request has been approved by the attendance api team, you can use your
                application details and secrets to initiate the OAuth Client credential flow and call our
                api by sending the JWT token in the header. Remember to send the api subscription key in
                header along with the JWT token.
              </p>

              <h2 className='govuk-heading-l' id='consent-process'>5. Consent process</h2>
              <p className='govuk-body'>
                Access to the DfE Attendance API does not utilise a consent process
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
                    <td className='govuk-table__cell'>
                      <p className='govuk-body'>This status code indicates that the
                        incoming request body or parameters
                        do not conform with the
                        OpenAPI/Swagger document which
                        describes the API
                      </p>
                      <p className='govuk-body'>
                            This error code could also include specific message to indicate the problem in the
                            requested payload (e.g. Unexpected URN).
                      </p>
                      <p className='govuk-body'>example: Invalid or Empty URN</p>
                    </td>
                  </tr>
                  <tr className='govuk-table__row'>
                    <td className='govuk-table__cell'>401</td>
                    <td className='govuk-table__cell'>Unauthorised</td>
                    <td className='govuk-table__cell'>
                        This status code indicates authentication or authorisation error. This could be sent
                        due to various reason such as missing JWT header, Invalid claims, Invalid subscription
                        key etc. For security reasons, error responses for this status code will not include
                        reason.
                    </td>
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
                There are no specific API error codes for the DfE Attendance API. We are using http status code
                to indicate a successful call to API or any failure. In case of validation failure or malformed
                payload HTTP error code 400 will be sent with reason of failure.
              </p>

              <h2 className='govuk-heading-l' id='rate-limiting'>8. Rate Limiting</h2>
              <p className='govuk-body'>We have introduced limits on API usage rates in terms of requests per minute.</p>
              <p className='govuk-body'>If you exceed this limit, you will receive a 429 Too Many Requests HTTP status
              code for each request made within the remainder of the time.</p>
              <p className='govuk-body'>For example, per minute, you can make:</p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>Up to 1000 requests per endpoint for the same api client/IP address</li>
              </ul>
              <p className='govuk-body'>Rate limiting threshold is subject to change based on the further engagement with API client developer.</p>

              <h2 className='govuk-heading-l' id='endpoints'>9. Endpoints</h2>

              <p className='govuk-body'>
                <code className='code--slim'>/data/<strong>attendances</strong></code>
              </p>
            </Fragment>
          )
      }
    </div>
  )
}

export default AttendanceAPIInformation
