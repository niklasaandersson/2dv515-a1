import React from 'react'

function AppTable ({ state }) {
  return (
    <>
      {state.result.length === 0
        ? <p className='mt-4'>No results for {state.resultType === 2 ? state.movie.title : state.user.name}</p>
        : <table className='table mt-4'>
          <thead>
            <tr>
              {Object.keys(state.result[0]).map(item => <th key={item} scope='col' style={{ textTransform: 'capitalize' }}>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {state.result.map(row =>
              <tr key={row.id}>
                {state.resultType === 1 ? <td>{row.name}</td> : <td>{row.movie}</td>}
                <td>{row.id}</td>
                <td>{row.score.toFixed(4)}</td>
              </tr>
            )}
          </tbody>
          </table>}
    </>

  )
}

export default AppTable
