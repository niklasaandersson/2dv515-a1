import React from 'react'

function MovieForm ({ state, onSelectMovie, onSelectNoOfResults }) {
  return (
    <>
      <div className='row'>
        <div className='col'>
          <select
            className='form-control'
            name='movie'
            placeholder='Movie'
            autoComplete='off'
            required
            onChange={onSelectMovie}
          >

            <option value=''>--Choose a movie--</option>

            {state.movies.map(movie =>
              <option key={movie.id} value={JSON.stringify({ id: movie.id, title: movie.title })}>
                {movie.id}: {movie.title}
              </option>)}
          </select>
        </div>

        <div className='col'>
          <input
            type='number'
            className='form-control'
            placeholder='No. of Results'
            defaultValue=''
            min='1'
            max={state.movies.length - 1}
            required
            onChange={onSelectNoOfResults}
          />
        </div>

        <div className='col' />
      </div>
    </>

  )
}

export default MovieForm
