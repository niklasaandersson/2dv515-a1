import React, { useEffect, useState } from 'react'
import './App.css'
import { getUsersCall } from './apiCalls'
import AppForm from './components/appForm'
import AppTable from './components/appTable'
import AppChooseDataSet from './components/appChooseDataSet'

function App () {
  const [state, setState] = useState({
    dataSet: 'small',
    users: [],
    user: '',
    method: '',
    noOfResults: '',
    resultType: ''
  })

  useEffect(() => {
    const getUsers = async (dataSet) => {
      if (dataSet !== '') {
        const users = await getUsersCall(dataSet)

        setState((state) => {
          const newState = { ...state }
          newState.users = users
          return newState
        })
      }
    }

    getUsers(state.dataSet)
  }, [state.dataSet])

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

      <div className='d-flex justify-content-center align-items-top mt-5' style={{ height: '100vh' }}>
        <div>
          <h1 className='mt-5 mb-4'>Assignment 1</h1>

          <AppChooseDataSet
            state={state}
            onSelectDataSet={handleSelectDataSet}
          />

          {state.dataSet !== ''
            ? <AppForm
              state={state}
              onSelectUser={handleSelectUser}
              onSelectMethod={handleSelectMethod}
              onSelectNoOfResults={handleSelectNoOfResults}
              onSelectResultType={handleResultType}
            />
            : null}

          {state.user !== '' && state.method !== '' && state.noOfResults !== '' && state.resultType !== ''
            ? <AppTable state={state} />
            : null}

        </div>
      </div>

    </div>
  )
}

export default App
