import React from 'react'
import Carousel from '../components/Carousel'
import Category from './Category'
import RecentListings from './RecentListings'
import WhyAdopt from './WhyAdopt'

const Home = () => {
  return (
    <>
      <div>
        <Carousel />
        <Category />
        <RecentListings />
        <WhyAdopt />
      </div>
    </>
  )
}

export default Home
