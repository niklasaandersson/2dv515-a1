import React, { useEffect, useState } from 'react'
import { getMatchingUsers, getRecommendedMovies, getRecommendationsItemBased } from '../apiCalls'

function AppTable ({ state }) {
  const [result, setResult] = useState([])

  useEffect(() => {
    const getTableContent = async () => {
      if (state.resultType === 1) {
        const response = await getMatchingUsers(state.user.id, state.method, state.noOfResults, state.dataSet)
        console.log(response)
        setResult(response.data)
      }
      if (state.resultType === 2) getRecommendedMovies(state.user.id, state.method, state.noOfResults, state.dataSet)
      if (state.resultType === 3) getRecommendationsItemBased(state.user.id, state.method, state.noOfResults, state.dataSet)
    }
    getTableContent()
  }, [])

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
                <td>{row.score}</td>
              </tr>
            )}
          </tbody>
        </table>
        : null}
    </>

  )
}

export default AppTable
