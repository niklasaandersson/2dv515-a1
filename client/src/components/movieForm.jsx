import React from 'react'

function MovieForm ({ state, onSelectMovie, onSelectMethod, onSelectNoOfResults }) {
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
            value={JSON.stringify(state.movie)}
          >

            <option value=''>--Choose a movie--</option>

            {state.movies.map(movie =>
              <option key={movie.id} value={JSON.stringify({ id: movie.id, title: movie.title })}>
                {movie.id}: {movie.title}
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
            value={state.noOfResults}
            min='1'
            max={state.movies.length - 1}
            required
            onChange={onSelectNoOfResults}
          />
        </div>

      </div>
    </>

  )
}

export default MovieForm
