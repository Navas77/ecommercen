import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

function Sidebar() {
  return (
    <div className='BB5'>
        <div className='BB4' >
            <NavLink className="BB1" to="/add">
                 <img src={assets.add_icon} className='BB2' alt=''/>
                 <p className='BB3'>Add Items</p>
            </NavLink>
            <NavLink className="BB1" to="/list">
                 <img src={assets.order_icon} className='BB2' alt=''/>
                 <p className='BB3'>List Items</p>
            </NavLink>
            <NavLink className="BB1" to="/orders">
                 <img src={assets.order_icon} className='BB2' alt=''/>
                 <p className='BB3'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar