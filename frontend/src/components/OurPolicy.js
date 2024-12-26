import React from 'react'
import { assets } from '../assets/assets'
import './OurPolicy.css'

function OurPolicy() {
  return (
    <div className='E1'>

        <div>
            <img src={assets.exchange_icon} className='E2' alt=""/>
            <p className='E3'>Easy Exchange Policy</p>
            <p className='E4'>We offer hassle free exchange Policy</p>
        </div>

        <div>
            <img src={assets.quality_icon} className='E2' alt=""/>
            <p className='E3'>7 Days Return Policy</p>
            <p className='E4'>We Provide 7 days free return policy</p>
        </div>

        <div>
            <img src={assets.support_img} className='E2' alt=""/>
            <p className='E3'>Best Customer Support</p>
            <p className='E4'>We Provide 24/7 Customer Support</p>
        </div>

    </div>
  )
}

export default OurPolicy