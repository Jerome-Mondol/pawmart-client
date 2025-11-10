import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../axios/axios';
import PetCard from '../components/Home/PetCard';

const RecentListings = () => {
  const[pets, setPets] = useState(null);
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axiosInstance.get('/pets?count=6');
        setPets(res.data);
      }
      catch(err) {
        console.error(err)
      }
    }
    fetchPets();
  }, [])
  return (
    <>
        <div className='p-5 sm:p-20' >
            <h1 className='text-4xl text-orange-500' >Recent Listings</h1>
            <div className='grid justify-between items-center mt-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5' >
              {
                pets && 
                pets.map(({category, date, description, email, image, location, name, price, _id}) => (
                  <PetCard key={_id} category={category} description={description} date={date} email={email} image={image} location={location} name={name} price={price} id={_id} />
                ))
              }
            </div>
        </div>  
    </>
  )
}

export default RecentListings
