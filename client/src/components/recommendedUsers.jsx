import React from 'react'

function RecommendedUsers ({ result }) {
  return (
    <>
      {result.length !== 0
        ? <table className='table mt-4'>
          <thead>
            <tr>
              {Object.keys(result[0]).map(item => <th key={item} scope='col' style={{ textTransform: 'capitalize' }}>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {result.map(row =>
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.id}</td>
                <td>{row.score.toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>
        : null}
    </>
  )
}

export default RecommendedUsers
