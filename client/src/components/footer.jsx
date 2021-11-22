import React from 'react'

function footer () {
  const styles = {
    backgroundColor: 'black',
    fontSize: '10px',
    color: 'white',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: '10px',
    textAlign: 'left'
  }
  return (
    <div style={styles}>
      <p className='mb-0'>Niklas Andersson</p>
      <p className='mb-0'>na222sn</p>
      <p className='mb-0'>2dv515</p>
      <p className='mb-0'>2021</p>
    </div>

  )
}

export default footer
