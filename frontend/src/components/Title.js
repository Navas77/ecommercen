import React from 'react'
import './Title.css'

function Title({text1,text2}) {
  return (
    <div className='A1'>
        <p className='A2'>{text1}  <span className='A4'>{text2}</span></p>
        <p className='A3'></p>
    </div>
  )
}

export default Title