import React, { useEffect, useState } from 'react'
import './App.css'
import UserForm from './components/userForm'
import MovieForm from './components/movieForm'
import AppChooseDataSet from './components/appChooseDataSet'
import { getUsersCall, getMoviesCall, getMatchingUsers } from './apiCalls'
import ResultType from './components/resultType'

function App () {
  const [state, setState] = useState({
    dataSet: 'small',
    users: [],
    movies: [],
    user: '',
    movie: '',
    method: '',
    noOfResults: '',
    resultType: 1,
    result: []
  })

  /*
  useEffect(() => {
    const getTableContent = async (userId, method, noOfResults, dataSet, resultType) => {
      if (state.resultType === 1) {
        const response = await getMatchingUsers(userId, method, noOfResults, dataSet)
        setState({ result: response.data })
      }
      // if (resultType === 2) getRecommendedMovies(userId, method, noOfResults, dataSet)
      // if (resultType === 3) getRecommendationsItemBased(userId, method, noOfResults, dataSet)
    }
    getTableContent(state.user.id, state.method, state.noOfResults, state.dataSet, state.resultType)
  }, [state.user.id, state.method, state.noOfResults, state.dataSet, state.resultType])
*/
  useEffect(() => {
    const getUsers = async (dataSet, resultType) => {
      if (resultType === 1 || resultType === 3) {
        const users = await getUsersCall(dataSet)

        setState((state) => {
          const newState = { ...state }
          newState.users = users
          return newState
        })
      }
      if (resultType === 2) {
        const movies = await getMoviesCall(dataSet)
        setState((state) => {
          const newState = { ...state }
          newState.movies = movies
          return newState
        })
      }
    }

    getUsers(state.dataSet, state.resultType)
  }, [state.dataSet, state.resultType])

  useEffect(() => {
    const getTableContentMatchingUsers = async () => {
      const response = await getMatchingUsers(state.user.id, state.method, state.noOfResults, state.dataSet)
      setState((state) => {
        const newState = { ...state }
        newState.result = response
        return newState
      })
    }
    if (state.resultType === 1 && state.user !== '' && state.noOfResults !== '' && state.method !== '') {
      // getTableContentMatchingUsers()
      // console.log(state.user, state.method, state.noOfResults)
    }

    if (state.resultType === 2 && state.movie !== '' && state.noOfResults !== '') {
      console.log(state.movie, state.noOfResults)
    }

    if (state.resultType === 3 && state.user !== '' && state.noOfResults !== '' && state.method !== '') {

    }
  })

  /*
  useEffect(() => {
    const getTableContent = async () => {
      if (state.resultType === 1) {
        const response = await getMatchingUsers(state.user.id, state.method, state.noOfResults, state.dataSet)
        console.log(response)
        setState({ results: response.data })
      }
      if (state.resultType === 2) getRecommendedMovies(state.user.id, state.method, state.noOfResults, state.dataSet)
      if (state.resultType === 3) getRecommendationsItemBased(state.user.id, state.method, state.noOfResults, state.dataSet)
    }
    getTableContent()
  }, [])
  */

  const handleSelectDataSet = dataSet => {
    const newState = { ...state }
    newState.dataSet = dataSet
    newState.users = []
    newState.user = ''
    setState(newState)
  }

  const handleSelectUser = (e) => {
    const user = JSON.parse(e.target.value)
    const newState = { ...state }
    newState.user = user
    setState(newState)
  }

  const handleSelectMovie = (e) => {
    const movie = JSON.parse(e.target.value)
    const newState = { ...state }
    newState.movie = movie
    setState(newState)
  }

  const handleSelectMethod = (e) => {
    const newState = { ...state }
    newState.method = e.target.value
    setState(newState)
  }

  const handleSelectNoOfResults = (e) => {
    const newState = { ...state }
    newState.noOfResults = e.target.value
    setState(newState)
  }

  const handleResultType = (no) => {
    const newState = { ...state }
    newState.resultType = no
    newState.noOfResults = ''
    setState(newState)
  }

  return (
    <div className='App'>

      <div className='d-flex justify-content-center align-items-top mt-5' style={{ height: '100vh' }}>
        <div>
          <h1 className='mt-5 mb-4'>Assignment 1</h1>

          <AppChooseDataSet
            state={state}
            onSelectDataSet={handleSelectDataSet}
          />

          {state.resultType === 1 || state.resultType === 3
            ? <UserForm
              state={state}
              onSelectUser={handleSelectUser}
              onSelectMethod={handleSelectMethod}
              onSelectNoOfResults={handleSelectNoOfResults}
              /> : null}

          {state.resultType === 2
            ? <MovieForm
              state={state}
              onSelectMovie={handleSelectMovie}
              onSelectMethod={handleSelectMethod}
              onSelectNoOfResults={handleSelectNoOfResults}
              /> : null}

          <ResultType state={state} onSelectResultType={handleResultType} />

          {state.user !== '' && state.method !== '' && state.noOfResults !== '' && state.resultType === 1
            ? <h1>1</h1>
            : null}

          {state.movie !== '' && state.noOfResults !== '' && state.resultType === 2
            ? <h1>2</h1>
            : null}

          {state.user !== '' && state.method !== '' && state.noOfResults !== '' && state.resultType === 3
            ? <h1>3</h1>
            : null}

        </div>
      </div>

    </div>
  )
}

export default App
