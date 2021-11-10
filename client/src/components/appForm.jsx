import React from 'react'

function AppForm ({ state, onSelectUser, onSelectMethod, onSelectNoOfResults, onSelectResultType }) {
  return (
    <>
      <div className='row'>
        <div className='col'>
          <select
            className='form-control'
            name='user'
            placeholder='User'
            autoComplete='off'
            required
            onChange={onSelectUser}
          >
            <option value=''>--Choose a user--</option>
            {state.users.map(user =>
              <option key={user.id} value={JSON.stringify({ id: user.id, name: user.name })}>
                {user.id}: {user.name}
              </option>)}
          </select>
        </div>

        <div className='col'>
          <select
            className='form-control'
            name='method'
            placeholder='Similarity'
            autoComplete='off'
            required
            value={state.method}
            onChange={onSelectMethod}
          >
            <option value=''>--Choose a method--</option>
            <option value='euclidean'>Euclidean</option>
            <option value='pearson'>Pearson</option>
          </select>
        </div>

        <div className='col'>
          <input
            type='number'
            className='form-control'
            placeholder='No. of Results'
            min='1'
            max='10'
            required
            onChange={onSelectNoOfResults}
          />
        </div>
      </div>

      <div className='mt-3' style={{ textAlign: 'start' }}>

        <a href='/#'>
          <span
            className={state.resultType === 1 ? 'badge rounded-pill bg-primary  me-1' : 'badge rounded-pill bg-secondary  me-1'}
            onClick={() => onSelectResultType(1)}
          >
                  Find top matching users
          </span>
        </a>

        <a href='/#'>
          <span
            className={state.resultType === 2 ? 'badge rounded-pill bg-primary  me-1' : 'badge rounded-pill bg-secondary  me-1'}
            onClick={() => onSelectResultType(2)}
          >
                  Find recommended movies
          </span>
        </a>

        <a href='/#'>
          <span
            className={state.resultType === 3 ? 'badge rounded-pill bg-primary' : 'badge rounded-pill bg-secondary'}
            onClick={() => onSelectResultType(3)}
          >
                  Find recommendations, item-based
          </span>
        </a>

      </div>

    </>

  )
}

export default AppForm
