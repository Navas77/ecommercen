import React from 'react'
import {assets} from "../assets/assets"
import "./Navbar.css"
function Navbar({setToken}) {
  return (
    <div className='AA3'>
        <img src={assets.logo} className='AA1' alt=''/>
        <div>
        <button onClick={()=>setToken("")} className='AA2'>Logout</button>
        </div>

    </div>
    
  )
}

export default Navbar