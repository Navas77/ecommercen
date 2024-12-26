import React from 'react'
import './Hero.css'
import { assets } from '../assets/assets'

function Hero() {
    return (
        <div className='A'>
            {/* Hero left side */}
            <div className='B'>
                <div className='C'>
                    <div className='D'>
                        <p className='E'></p>
                        <p className='F'>OUR BESTSELLERS</p>
                         </div>
                         <h1 className='G prata-regular'>Latest Arrivals</h1>
                         <div className='H'>
                            <p className='I'>SHOP NOW</p>
                            <p className='J'></p>
                         </div>
                    </div>
                     </div>
                     {/*hero right side */}
                        
                     <img src={assets.hero_img} className='K' alt=""/>

        </div>
    )
}

export default Hero