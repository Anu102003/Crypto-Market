import React from 'react'
const TableCard = (props) => {
  return (
    <div>
      <table >
      <tbody>
        <tr>
          <td>{props.name}</td>
          <td>{props.market_cap_rank}</td>
          <td>{props.current_price}</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default TableCard
