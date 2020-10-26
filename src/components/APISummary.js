import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import APISummaryBuilder from 'components/APISummaryBuilder'

const APISummary = ({ api, summary }) => {
  if (!summary) return null

  const sectionTitles = summary.sections.map(section => section.title)

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
              <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Swagger file</th>
              <td className='govuk-table__cell govuk-!-width-one-half'>
                <a className='govuk-link' href={api.tags.swaggerFile} download={api.tags.swaggerFile} target='_blank'>View swagger file</a>
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
          {summary.meta.map(item => {
            let component = ReactHtmlParser(item.body)

            if (item.type === 'download') {
              component = <a className='govuk-link' href={item.link} download={item.link} target='_blank'>{ReactHtmlParser(item.body)}</a>
            } else if (item.type !== 'download' && item.link) {
              component = <a className='govuk-link' href={item.link} target='_blank'>{ReactHtmlParser(item.body)}</a>
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
            <a className='govuk-link' href={`#${title.replace(/ /gi, '-')}`}>{title}</a>
          </li>
        ))}
      </ol>

      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-9' />

      <APISummaryBuilder summary={summary} />
    </div>
  )
}

export default APISummary
