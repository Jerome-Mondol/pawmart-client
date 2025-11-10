import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router'
import PetCard from '../components/Home/PetCard';
 
const PetsAndSupplies = () => {
    const pets = useLoaderData();
  return (
    <>  
        <div>
            <h1 className='text-3xl font-bold text-center text-orange-600 my-10' >Pets and Supplies</h1>
            <div className='grid justify-between items-center mt-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 px-10 my-5' >
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

export default PetsAndSupplies
