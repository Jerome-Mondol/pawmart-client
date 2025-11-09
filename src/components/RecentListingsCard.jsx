import React from 'react'

const RecentListingsCard = ({category, description, date, email, image, location, name, price, id}) => {
  return (  
    <>
      <div className={`card shadow-sm bg-orange-400/50 rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 h-full`}>
      <figure className="h-60 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg sm:text-xl font-semibold text-purple-600 tracking-wider">{name}</h2>
        <p className="text-sm sm:text-base mt-2 text-orange-900">{description}</p>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary text-sm sm:text-base">Adopt Now</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default RecentListingsCard
