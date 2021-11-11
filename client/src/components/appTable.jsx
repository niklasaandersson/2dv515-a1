import React, { useEffect } from 'react'
import { getMatchingUsers, getRecommendedMovies, getRecommendationsItemBased } from '../apiCalls'

function AppTable ({ state }) {
  useEffect(() => {
    if (state.resultType === 1) getMatchingUsers(state.user.id, state.method, state.noOfResults, state.dataSet)
    if (state.resultType === 2) getRecommendedMovies(state.user.id, state.method, state.noOfResults, state.dataSet)
    if (state.resultType === 3) getRecommendationsItemBased(state.user.id, state.method, state.noOfResults, state.dataSet)
  }, [])

  return (
    <table className='table mt-4'>
      <thead>
        <tr>
          <th scope='col'>Movie</th>
          <th scope='col'>ID</th>
          <th scope='col'>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>2</td>
          <td>9.43</td>
        </tr>
        <tr>
          <td>Mark</td>
          <td>2</td>
          <td>9.43</td>
        </tr>
        <tr>
          <td>Mark</td>
          <td>2</td>
          <td>9.43</td>
        </tr>
      </tbody>
    </table>
  )
}

export default AppTable
