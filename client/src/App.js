import React, { useEffect, useState } from 'react'
import './App.css'
import UserForm from './components/userForm'
import MovieForm from './components/movieForm'
import AppChooseDataSet from './components/appChooseDataSet'
import { getUsersCall, getMoviesCall, getMatchingUsers, getRecommendedMovies, getRecommendationsItemBased, getMatchingMovies } from './apiCalls'
import ResultType from './components/resultType'
import AppTable from './components/appTable'

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
        newState.result = response.data
        return newState
      })
    }

    const getTableContentRecommendedMovies = async () => {
      console.log('called?')
      const response = await getRecommendedMovies(state.user.id, state.method, state.noOfResults, state.dataSet)
      setState((state) => {
        const newState = { ...state }
        newState.result = response.data
        return newState
      })
    }

    const getTableContentItemBased = async () => {
      const response = await getRecommendationsItemBased(state.user.id, state.method, state.noOfResults, state.dataSet)
      setState((state) => {
        const newState = { ...state }
        newState.result = response.data
        return newState
      })
    }

    const getTableContentMatchingMovies = async () => {
      const response = await getMatchingMovies(state.movie.id, state.method, state.noOfResults, state.dataSet)
      setState((state) => {
        const newState = { ...state }
        newState.result = response.data
        return newState
      })
    }

    if (state.resultType === 1 && state.user !== '' && state.noOfResults !== '' && state.method !== '') {
      console.log('executing 1')
      getTableContentMatchingUsers()
    }
    if (state.resultType === 2 && state.movie !== '' && state.noOfResults !== '') {
      console.log('executing 2')
      getTableContentMatchingMovies()
    }
    if (state.resultType === 3 && state.user !== '' && state.noOfResults !== '' && state.method !== '') {
      console.log('executing 3 ')
      getTableContentItemBased()
    }
    if (state.resultType === 4 && state.user !== '' && state.noOfResults !== '' && state.method !== '') {
      console.log('executing 4')
      getTableContentRecommendedMovies()
    }
  }, [state.resultType, state.user, state.movie, state.method, state.noOfResults, state.dataSet])

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

      <div className='d-flex justify-content-center align-items-top' style={{ height: '90vh' }}>
        <div>
          <h1 className='mt-5 mb-4'>Assignment 1</h1>

          <AppChooseDataSet
            state={state}
            onSelectDataSet={handleSelectDataSet}
          />

          {state.resultType === 1 || state.resultType === 3 || state.resultType === 4
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

          {state.resultType === 1 && state.result.length > 0 && state.user !== '' && state.method !== '' && state.noOfResults > 0
            ? <AppTable state={state} />
            : null}

          {state.resultType === 2 && state.result.length > 0 && state.movie !== '' && state.noOfResults > 0
            ? <AppTable state={state} />
            : null}

          {state.resultType === 3 && state.result.length > 0 && state.user !== '' && state.method !== '' && state.noOfResults > 0
            ? <AppTable state={state} />
            : null}

          {state.resultType === 4 && state.result.length > 0 && state.user !== '' && state.method !== '' && state.noOfResults > 0
            ? <AppTable state={state} />
            : null}

        </div>
      </div>

    </div>
  )
}

export default App
