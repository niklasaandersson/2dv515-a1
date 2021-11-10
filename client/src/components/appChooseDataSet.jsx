import React from 'react'

function AppChooseDataSet ({ state, onSelectDataSet }) {
  return (
    <>

      <div className='mb-3' style={{ textAlign: 'start' }}>
        <a href='/#'>
          <span
            className={state.dataSet === 'small' ? 'badge rounded-pill bg-primary me-1' : 'badge rounded-pill bg-secondary  px-2'}
            onClick={() => onSelectDataSet('small')}
          >
                  Small dataset
          </span>
        </a>
        <a href='/#'>
          <span
            className={state.dataSet === 'large' ? 'badge rounded-pill bg-primary ms-1' : 'badge rounded-pill bg-secondary  px-2'}
            onClick={() => onSelectDataSet('large')}
          >
                  Large dataset
          </span>
        </a>
      </div>
    </>
  )
}

export default AppChooseDataSet
