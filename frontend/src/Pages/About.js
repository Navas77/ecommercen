import React from 'react'
import './About.css'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterbox from "../components/NewsLetterbox"
function About() {
  return (
    <div>
    <div className='S1'>
      <Title text1={"ABOUT"} text2={"US"}/>
      </div>
 <div className='S2'>
    <img src={assets.about_img} className='S3' alt=""/>
    <div className='S4'>
      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some</p>
      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some</p>
      <b className='S5'>Our Mission</b>
      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some</p>
    </div>
 </div>
 <div className='S6'>
<Title text1={"WHY"} text2={"CHOOSE US"}/>

 </div>
 <div className='S7'>
   <div className='S8'>
     <b>Quality Assurance:</b>
     <p className='S9'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some</p>
   </div>
   <div className='S8'>
     <b>Convenience:</b>
     <p className='S9'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some</p>
   </div>
   <div className='S8'>
     <b>Exceptional customer service:</b>
     <p className='S9'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some</p>
   </div>
 </div>
    <NewsLetterbox/>
    </div>
  )
}

export default About