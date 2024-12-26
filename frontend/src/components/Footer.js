import React from 'react'
import './Footer.css'
import { assets } from '../assets/assets'

function Footer() {
    return (
        <div >
            <div className='G1'>
                <div>
                    <img src={assets.logo} className='G2' alt="" />
                    <p className='G3'>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing h </p>
                </div>

                <div>
                    <p className='G4'>COMPANY</p>
                    <ul className='G5'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='G6'>GET IN TOUCH</p>
                    <ul className='G5'>
                        <li>9998887666</li>
                        <li>spacex@gmail.com</li>
                    </ul>
                </div>

            </div>
            <div>
              <hr/>
              <p className='G7'>Copyright 2024@ forever.com -All Right Reserved.</p>
            </div>

        </div>
    )
}

export default Footer