import React from 'react'
import './Contact.css'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterbox from '../components/NewsLetterbox'
function Contact() {
  return (
    <div>
      <div className='T1'>
       <Title text1={"CONTACT"} text2={"US"}/>
      </div>
      <div className='T2'>
          <img src={assets.contact_img} className='T3' alt=""/>
          <div className='T4'>
            <p className='T5'>Our Store</p>
            <p className='T6'>Kollengode villa <br/>palakkad , world</p>
            <p className='T6'> Tel-9998887665  <br/> Email: navas@gmail.com</p>
            <p className='T7'> Carees at everever</p>
            <p className='T6'>Learn more our company</p>
            <button className='T8'>Explore Jobs</button>

          </div>
      </div>
      <NewsLetterbox/>
    </div>
  )
}

export default Contact