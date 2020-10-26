import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const builder = (item) => {
  switch (item.type) {
    case 'H3': return <h3 className='govuk-heading-m'>{ReactHtmlParser(item.body)}</h3>
    case 'H4': return <h4 className='govuk-heading-s'>{ReactHtmlParser(item.body)}</h4>
    case 'HR': return <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-6 govuk-!-margin-bottom-6' />
    case 'P': return <p className='govuk-body'>{ReactHtmlParser(item.body)}</p>
    case 'CODE': return <code className='code--block'>{ReactHtmlParser(item.body)}</code>
    case 'UL':
    case 'OL': {
      const hasInner = typeof item.body[0] === 'object'

      const lis = item.body.map(li => {
        if (hasInner) {
          return (
            <li key={li.text}>
              {ReactHtmlParser(li.text)}
              <ul className='govuk-list govuk-list--bullet'>
                {li.body.map(inner => <li key={inner}>{ReactHtmlParser(inner)}</li>)}
              </ul>
            </li>
          )
        }

        return <li key={li}>{ReactHtmlParser(li)}</li>
      })

      if (item.type === 'OL') return <ol className='govuk-list govuk-list--number'>{lis}</ol>

      return <ul className='govuk-list govuk-list--bullet'>{lis}</ul>
    }
    case 'TABLE': {
      return (
        <table className='govuk-table govuk-!-margin-top-7'>
          {item.body.caption && <caption className='govuk-table__caption'>{ReactHtmlParser(item.body.caption)}</caption>}
          <thead className='govuk-table__head'>
            <tr className='govuk-table__row'>
              {item.body.headers.map((header, index) => {
                return (
                  <th scope='col' className='govuk-table__header' key={`${header}-${index}`}>{ReactHtmlParser(header)}</th>
                )
              })}
            </tr>
          </thead>
          <tbody className='govuk-table__body'>
            {item.body.rows.map((row, index) => {
              return (
                <tr className='govuk-table__row' key={`${row}-${index}`}>
                  {row.data.map((data, index) => {
                    if (index === 0) return <th scope='row' className='govuk-table__header' key={`${data}-${index}`}>{ReactHtmlParser(data)}</th>
                    return <td className='govuk-table__cell' key={`${data}-${index}`}>{ReactHtmlParser(data)}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }
    case 'DETAIL': {
      return (
        <details className='govuk-details' data-module='govuk-details'>
          <summary className='govuk-details__summary'>
            <div className='api-information-endpoint-title'>
              <span className='govuk-details__summary-text'>
                {ReactHtmlParser(item.body.title)}
              </span>
            </div>
            <div className='api-information-endpoint-tag'>
              <strong className={`govuk-tag govuk-tag-round govuk-tag--blue`}>
                {ReactHtmlParser(item.body.tag)}
              </strong>
            </div>
          </summary>
          <div className='govuk-details__text'>
            {item.body.body.map((item, index) => <div key={`${item.body.title}-${index}`}>{builder(item)}</div>)}
          </div>
        </details>
      )
    }

    default:
      return null
  }
}

const APIDocumentationBuilder = ({ api, summary }) => {
  const { sections } = summary

  console.log(api)

  const sectionTitles = sections.map(section => section.title)

  return (
    <div className='api-information-page'>
      <h1 className='govuk-heading-xl govuk-!-margin-bottom-3'>{api.properties.displayName}</h1>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <tr className='govuk-table__row'>
            <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Lifecycle stage</th>
            <td className='govuk-table__cell govuk-!-width-one-half'>{api.tags.lifecycleStage}</td>
          </tr>
          {api.tags.swaggerFile !== '' && (
            <tr className='govuk-table__row'>
              <th scope='row' className='govuk-table__header govuk-!-width-one-half'>Swagger file</th>
              <td className='govuk-table__cell govuk-!-width-one-half'>
                <a className='govuk-link' href={api.tags.swaggerFile} download={api.tags.swaggerFile} target='_blank'>View swagger file</a>
              </td>
            </tr>
          )}
          {api.tags.guideline !== '' && (
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

      {sections.map(section => {
        return (
          <div key={section.title} className='govuk-!-margin-bottom-6'>
            <h2 className='govuk-heading-l' id={section.title.replace(/ /gi, '-')}>{section.title}</h2>

            {section.content.map((item, index) => {
              return <div key={index}>{builder(item)}</div>
            })}
          </div>
        )
      })}

    </div>
  )
}

export default APIDocumentationBuilder
