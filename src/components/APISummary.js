import React, { useEffect } from 'react'
import ReactHtmlParser from 'html-react-parser'

import APISummaryBuilder from './APISummaryBuilder'

const APISummary = ({ api, summary }) => {
  if (!summary) return null

  const sectionTitles = summary.sections.map(section => section.title)

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="https://editor.swagger.io"]')

    if (links) {
      for (let i = 0; i < links.length; i++) {
        const href = `${links[i].getAttribute('href')}?url=${api.tags.swaggerFile}`
        links[i].setAttribute('href', href)
      }
    }
  }, [])

  return (
    <div className='api-information-page'>
      <h1 className='govuk-heading-xl govuk-!-margin-bottom-3'>
        {api.properties.displayName}
      </h1>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Lifecycle stage</th>
            <td className='govuk-table__cell govuk-!-width-one-half'>{api.tags.lifecycleStage}</td>
          </tr>
          {api.tags.swaggerFile && (
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Open API file</th>
              <td className='govuk-table__cell govuk-!-width-one-half'>
                <a className='govuk-link' href={api.tags.swaggerFile} download={api.tags.swaggerFile} target='_blank' rel='noreferrer'>View Open API file</a>
              </td>
            </tr>
          )}
          {api.tags.guideline && (
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Guideline</th>
              <td className='govuk-table__cell govuk-!-width-one-half'>
                <a className='govuk-link' href={api.tags.guideline} download='dfe-information-api-guideline'>Download guideline</a>
              </td>
            </tr>
          )}
          {api.tags.authType && (
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Supported Authorisation types</th>
              <td className='govuk-table__cell govuk-!-width-one-half'>
                <ul className='govuk-list govuk-!-margin-bottom-0'>
                  {api.tags.authType.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
          {summary.meta.map(item => {
            let component = ReactHtmlParser(item.body)

            if (item.type === 'download') {
              component = <a className='govuk-link' href={item.link} download={item.link} target='_blank' rel='noreferrer'>{ReactHtmlParser(item.body)}</a>
            } else if (item.type !== 'download' && item.link) {
              component = <a className='govuk-link' href={item.link} target='_blank' rel='noreferrer'>{ReactHtmlParser(item.body)}</a>
            }

            return (
              <tr className='govuk-table__row' key={item.title}>
                <th scope='row' className='govuk-table__header govuk-!-width-one-half'>{ReactHtmlParser(item.title)}</th>
                <td className='govuk-table__cell govuk-!-width-one-half'>
                  {component}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <ol className='govuk-list govuk-list--number'>
        {sectionTitles.map(title => (
          <li key={title}>
            <a className='govuk-link' href={`#${title.replace(/ /gi, '-')}`} aria-label={`${api.properties.displayName} ${title}`}>{title}</a>
          </li>
        ))}
      </ol>

      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-9' />

      <APISummaryBuilder swaggerFile={api.tags.swaggerFile} summary={summary} />
    </div>
  )
}

export default APISummary
