import React from 'react'

function UserForm ({ state, onSelectUser, onSelectMethod, onSelectNoOfResults }) {
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
            defaultValue=''
            min='1'
            max={state.users.length - 1}
            required
            onChange={onSelectNoOfResults}
          />
        </div>
      </div>
    </>

  )
}

export default UserForm
