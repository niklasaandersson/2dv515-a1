import React from 'react'

function MovieTable ({ state }) {
  return (
    <>
      {state.resultType === 1 && state.result.length !== 0
        ? <table className='table mt-4'>
          <thead>
            <tr>
              {Object.keys(state.result[0]).map(item => <th key={item} scope='col' style={{ textTransform: 'capitalize' }}>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {state.result.map(row =>
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.id}</td>
                <td>{row.score.toFixed(4)}</td>
              </tr>
            )}
          </tbody>
        </table>
        : null}
    </>

  )
}

export default MovieTable
