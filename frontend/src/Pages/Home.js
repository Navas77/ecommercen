import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'
import NewsLetterbox from '../components/NewsLetterbox'

function Home() {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSellers/>
      <OurPolicy/>
      <NewsLetterbox/>
    </div>
  )
}

export default Home