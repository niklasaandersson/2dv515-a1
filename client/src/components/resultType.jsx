import React from 'react'

function ResultType ({ state, onSelectResultType }) {
  return (
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
          className={state.resultType === 4 ? 'badge rounded-pill bg-primary  me-1' : 'badge rounded-pill bg-secondary  me-1'}
          onClick={() => onSelectResultType(4)}
        >
          Find recommended movies
        </span>
      </a>

      <a href='/#'>
        <span
          className={state.resultType === 2 ? 'badge rounded-pill bg-primary  me-1' : 'badge rounded-pill bg-secondary  me-1'}
          onClick={() => onSelectResultType(2)}
        >
          Find top matching movies
        </span>
      </a>

      <a href='/#'>
        <span
          className={state.resultType === 3 ? 'badge rounded-pill bg-primary' : 'badge rounded-pill bg-secondary'}
          onClick={() => onSelectResultType(3)}
        >
          ßFind recommendations, item-based
        </span>
      </a>

    </div>
  )
}

export default ResultType
