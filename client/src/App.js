import React, { useEffect, useState } from 'react'
import './App.css'
import UserForm from './components/userForm'
import MovieForm from './components/movieForm'
import AppChooseDataSet from './components/appChooseDataSet'
import { getUsersCall, getMoviesCall, getMatchingUsers, getRecommendedMovies, getRecommendationsItemBased, getMatchingMovies } from './apiCalls'
import ResultType from './components/resultType'
import AppTable from './components/appTable'
import Footer from './components/footer'

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
    const getUsersAndMovies = async (dataSet, resultType) => {
      if (resultType === 1 || resultType === 3 || resultType === 4) {
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

    getUsersAndMovies(state.dataSet, state.resultType)
  }, [state.dataSet, state.resultType])

  useEffect(() => {
    setState((state) => {
      const newState = { ...state }
      newState.result = []
      return newState
    })

    const getResult = async no => {
      let response
      switch (no) {
        case 1:
          response = await getMatchingUsers(state.user.id, state.method, state.noOfResults, state.dataSet)
          break
        case 2:
          response = await getMatchingMovies(state.movie.id, state.method, state.noOfResults, state.dataSet)
          break
        case 3:
          response = await getRecommendationsItemBased(state.user.id, state.method, state.noOfResults, state.dataSet)
          break
        case 4:
          response = await getRecommendedMovies(state.user.id, state.method, state.noOfResults, state.dataSet)
          break
      }

      setState((state) => {
        const newState = { ...state }
        newState.result = response.data
        return newState
      })
    }

    if (state.resultType === 1 && state.user !== '' && state.noOfResults !== '' && state.method !== '') {
      getResult(state.resultType)
    }
    if (state.resultType === 2 && state.movie !== '' && state.noOfResults !== '' && state.method !== '') {
      getResult(state.resultType)
    }
    if (state.resultType === 3 && state.user !== '' && state.noOfResults !== '' && state.method !== '') {
      getResult(state.resultType)
    }
    if (state.resultType === 4 && state.user !== '' && state.noOfResults !== '' && state.method !== '') {
      getResult(state.resultType)
    }
  }, [state.resultType, state.user, state.movie, state.method, state.noOfResults, state.dataSet])

  const handleSelectDataSet = dataSet => {
    const newState = { ...state }
    newState.dataSet = dataSet
    newState.users = []
    newState.movies = []
    newState.user = ''
    newState.movie = ''
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
          {state.resultType === 1 && state.user !== '' && state.method !== '' && state.noOfResults > 0
            ? <AppTable state={state} />
            : null}

          {state.resultType === 2 && state.movie !== '' && state.noOfResults > 0
            ? <AppTable state={state} />
            : null}

          {state.resultType === 3 && state.user !== '' && state.method !== '' && state.noOfResults > 0
            ? <AppTable state={state} />
            : null}

          {state.resultType === 4 && state.user !== '' && state.method !== '' && state.noOfResults > 0
            ? <AppTable state={state} />
            : null}

        </div>
      </div>
      <div />
    </div>
  )
}

export default App
