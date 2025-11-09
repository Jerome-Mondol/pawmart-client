import React from 'react'
import Carousel from '../components/Carousel'
import Category from './Category'
import RecentListings from './RecentListings'

const Home = () => {
  return (
    <>
      <div>
        <Carousel />
        <Category />
        <RecentListings />
      </div>
    </>
  )
}

export default Home
