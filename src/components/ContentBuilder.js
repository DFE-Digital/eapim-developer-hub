import React, { Fragment } from 'react'
import ReactHtmlParser from 'html-react-parser'
import Highlight from 'react-highlight'
import Details from './Details'

const ContentBuilder = ({ data, sectionNav }) => {
  return (
    <>
      {sectionNav && (
        <>
          <ul className='govuk-list'>
            {data.map((item, q) => {
              if (item.Type === 'H2') {
                const link = `#${item.Body.replace(/\s+/g, '-').toLowerCase()}`
                return (
                  <li key={q}>
                    <a className='govuk-link' href={link}>{ReactHtmlParser(item.Body)}</a>
                  </li>
                )
              }
              return null
            })}
          </ul>
          <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-9' />
        </>
      )}
      {data.map((item, i) => {
        // For item bodys that are sent as arrays rather than strings, join the array
        let itembody = ''
        if (Array.isArray(item.Body)) {
          itembody = item.Body.join(' ')
        } else {
          itembody = item.Body
        }

        if (item.Type === 'DIV') return <div className='flex' key={i}>{ReactHtmlParser(itembody)}</div>
        if (item.Type === 'H2') {
          const anchor = itembody.replace(/\s+/g, '-').toLowerCase()
          return <h2 className='govuk-heading-l' key={i} id={anchor}>{ReactHtmlParser(itembody)}</h2>
        }
        if (item.Type === 'H3') return <h3 className='govuk-heading-m' key={i}>{ReactHtmlParser(itembody)}</h3>
        if (item.Type === 'H4') return <h4 className='govuk-heading-s' key={i}>{ReactHtmlParser(itembody)}</h4>
        if (item.Type === 'P') return <p className='govuk-body' key={i}>{ReactHtmlParser(itembody)}</p>
        if (item.Type === 'UL' || item.Type === 'BL' || item.Type === 'OL') {
          return (
            <ul
              key={i}
              className={'govuk-list' + (item.Type === 'BL' || item.Type === 'UL' ? ' govuk-list--bullet' : '') + (item.Type === 'OL' ? ' govuk-list--number' : '')}
            >
              {item.Body.map((li, x) => {
                return (
                  <li key={x}>{ReactHtmlParser(li)}</li>
                )
              })}
            </ul>
          )
        }
        if (item.Type === 'TABLE') {
          return (
            <table className='govuk-table govuk-!-margin-top-7' key={i}>
              <caption className='govuk-table__caption'>{ReactHtmlParser(item.Body.Caption)}</caption>
              <thead className='govuk-table__head'>
                <tr className='govuk-table__row'>
                  {item.Body.Headers.map((header, x) => {
                    return (
                      <th scope='col' className='govuk-table__header' key={x}>{ReactHtmlParser(header)}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className='govuk-table__body'>
                {item.Body.Rows.map((row, y) => {
                  return (
                    <tr className='govuk-table__row' key={y}>
                      {row.Data.map((data, z) => {
                        if (z === 0) return <th scope='row' className='govuk-table__header' key={z}>{ReactHtmlParser(data)}</th>
                        return <td className='govuk-table__cell' key={z}>{ReactHtmlParser(data)}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        }
        if (item.Type === 'WARNING') {
          return (
            <div className='govuk-warning-text' key={i}>
              <span className='govuk-warning-text__icon' aria-hidden='true'>!</span>
              <strong className='govuk-warning-text__text'>
                <span className='govuk-warning-text__assistive'>Warning</span>
                {ReactHtmlParser(itembody)}
              </strong>
            </div>
          )
        }
        if (item.Type === 'INSET') {
          return (
            <div className='govuk-inset-text' key={i}>
              {ReactHtmlParser(itembody)}
            </div>
          )
        }
        if (item.Type === 'DETAILS') return <Details title={item.Title} details={item.Description} key={i} />

        if (item.Type === 'CODE') {
          return (
            <Highlight className='csharp' key={i}>
              <div>{itembody}</div>
            </Highlight>
          )
        }

        return null
      })}
    </>
  )
}

export default ContentBuilder
