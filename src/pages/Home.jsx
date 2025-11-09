import React from 'react'
import Carousel from '../components/Home/Carousel'
import Category from '../sections/Category'
import RecentListings from '../sections/RecentListings'
import WhyAdopt from '../sections/WhyAdopt'
import MeetOurPetHeroes from '../sections/PetHeros'


const Home = () => {
  return (
    <>
      <div>
        <Carousel />
        <Category />
        <RecentListings />
        <WhyAdopt />
        <MeetOurPetHeroes />
      </div>
    </>
  )
}

export default Home
