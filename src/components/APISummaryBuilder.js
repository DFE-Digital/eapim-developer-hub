import React from 'react'
import ReactHtmlParser from 'html-react-parser'
import Highlight from 'react-highlight'
import Details from './Details'

const builder = (item) => {
  // For item bodys that are sent as arrays rather than strings, join the array
  let itembody = ''
  if (Array.isArray(item.body)) {
    itembody = item.body.join(' ')
  } else {
    itembody = item.body
  }

  switch (item.type) {
    case 'H3': return <h3 className='govuk-heading-m'>{ReactHtmlParser(itembody)}</h3>
    case 'H4': return <h4 className='govuk-heading-s'>{ReactHtmlParser(itembody)}</h4>
    case 'HR': return <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-6 govuk-!-margin-bottom-6' />
    case 'P':
      return <p className='govuk-body'>{ReactHtmlParser(itembody)} </p>
    case 'CODE':
      return (
        <Highlight className='json'>
          <div>{itembody}</div>
        </Highlight>
      )
    case 'UL':
    case 'OL': {
      const hasInner = !!item.body[0].body

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
        <Details
          tag={ReactHtmlParser(item.body.tag)}
          title={ReactHtmlParser(item.body.title)}
          content={item.body.body.map((item, index) => <div key={`${item.body.title}-${index}`}>{builder(item)}</div>)}
        />
      )
    }

    default:
      return null
  }
}

const APISummaryBuilder = ({ summary }) => {
  const { sections } = summary

  return (
    <>
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
    </>
  )
}

export default APISummaryBuilder
