import React from 'react'
import AppTable from './appTable'

function content ({ state }) {
  return (
    <>
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
    </>
  )
}

export default content
