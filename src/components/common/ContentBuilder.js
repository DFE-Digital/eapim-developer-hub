import React, { Fragment } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Details from 'components/common/Details'

const ContentBuilder = ({ data, sectionNav }) => {
  return (
    <Fragment>
      {sectionNav && (
        <Fragment>
          <ul className={'govuk-list'}>
            {data.map((item, q) => {
              if (item.Type === 'H2') {
                const link = `#${item.Body.replace(/\s+/g, '-').toLowerCase()}`
                return (
                  <li key={q}>
                    <a className='govuk-link' href={link}>{ ReactHtmlParser(item.Body) }</a>
                  </li>
                )
              }
              return null
            })}
          </ul>
          <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-9' />
        </Fragment>
      )}
      {data.map((item, i) => {
        if (item.Type === 'H2') {
          const anchor = item.Body.replace(/\s+/g, '-').toLowerCase()
          return <h2 className='govuk-heading-l' key={i} id={anchor}>{ ReactHtmlParser(item.Body) }</h2>
        }
        if (item.Type === 'H3') return <h3 className='govuk-heading-m' key={i}>{ ReactHtmlParser(item.Body) }</h3>
        if (item.Type === 'H4') return <h4 className='govuk-heading-s' key={i}>{ ReactHtmlParser(item.Body) }</h4>
        if (item.Type === 'P') return <p className='govuk-body' key={i}>{ ReactHtmlParser(item.Body) }</p>
        if (item.Type === 'UL' || item.Type === 'BL' || item.Type === 'OL') {
          return (
            <ul
              key={i}
              className={'govuk-list' + (item.Type === 'BL' || item.Type === 'UL' ? ' govuk-list--bullet' : '') + (item.Type === 'OL' ? ' govuk-list--number' : '')}
            >
              {item.Body.map((li, x) => {
                return (
                  <li key={x}>{ ReactHtmlParser(li) }</li>
                )
              })}
            </ul>
          )
        }
        if (item.Type === 'TABLE') {
          return (
            <table className='govuk-table govuk-!-margin-top-7' key={i}>
              <caption className='govuk-table__caption'>{ ReactHtmlParser(item.Body.Caption) }</caption>
              <thead className='govuk-table__head'>
                <tr className='govuk-table__row'>
                  {item.Body.Headers.map((header, x) => {
                    return (
                      <th scope='col' className='govuk-table__header' key={x}>{ ReactHtmlParser(header) }</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className='govuk-table__body'>
                {item.Body.Rows.map((row, y) => {
                  return (
                    <tr className='govuk-table__row' key={y}>
                      {row.Data.map((data, z) => {
                        if (z === 0) return <th scope='row' className='govuk-table__header' key={z}>{ ReactHtmlParser(data) }</th>
                        return <td className='govuk-table__cell' key={z}>{ ReactHtmlParser(data) }</td>
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
                { ReactHtmlParser(item.Body) }
              </strong>
            </div>
          )
        }
        if (item.Type === 'INSET') {
          return (
            <div className='govuk-inset-text' key={i}>
              { ReactHtmlParser(item.Body) }
            </div>
          )
        }
        if (item.Type === 'DETAILS') return <Details title={item.Title} details={item.Description} key={i} />

        if (item.Type === 'CODE') return <code key={i} className='code--block'>{item.Body}</code>

        return null
      })}
    </Fragment>
  )
}

export default ContentBuilder
