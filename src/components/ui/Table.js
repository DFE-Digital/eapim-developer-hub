import { uniqueId } from 'lodash'

const Table = ({ title, dataKeys, headings = [], data = [] }) => {
  if (data.length === 0) return null

  return (
    <table className='govuk-table'>
      {title && (
        <caption className='govuk-table__caption'>
          <h2 className='govuk-heading-m'>{title}</h2>
        </caption>
      )}
      {headings.length > 0 && (
        <thead className='govuk-table__head'>
          <tr className='govuk-table__row'>
            {headings.map(item => (
              <th scope='col' className='govuk-table__header' key={item}>{item}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className='govuk-table__body'>
        {data.map(item => (
          <tr className='govuk-table__row' key={uniqueId('table_row_')}>
            {dataKeys.map(key => <td className='govuk-table__cell' key={uniqueId('table_data_')}>{item[key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
