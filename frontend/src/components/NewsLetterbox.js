import React from 'react'
import './NewsLetterbox.css'

function NewsLetterbox() {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }
  return (
    <div className='F1'>
        <p className='F2'>Subscribe now & get 20% off</p>
        <p className='F3'>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing h</p>
        <form onSubmit={onSubmitHandler} className='F6'>
           <input  className="F4"  type="email" placeholder='Enter your email' required/> 
           <button type="submit" className='F5'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterbox