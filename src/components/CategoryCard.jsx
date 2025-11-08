import React from 'react'

const CategoryCard = ({ title, image, icon, description, btn, bgColor }) => {
  return (
    <div className={`card shadow-sm ${bgColor} rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300`}>
      <figure className="h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg sm:text-xl font-semibold">{title}</h2>
        <p className="text-sm sm:text-base mt-2">{icon} {description}</p>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary text-sm sm:text-base">{btn}</button>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
