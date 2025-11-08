import React from 'react'
import CategoryCard from '../components/CategoryCard'
import { Link } from 'react-router';

const Category = () => {
    const categories = [
        {
            id: 1,
            title: "Pets (Adoption)",
            image: "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            icon: "🐾",
            description:
                "Find adorable pets waiting for a loving home. Adopt, don’t shop — give a furry friend a new life.",
            route: "/category-filtered-product/pets",
            bgColor: "bg-orange-900/50",
            btn: "Adopt Now"
        },
        {
            id: 2,
            title: "Pet Food",
            image: "https://www.shutterstock.com/image-photo/dry-pet-food-natural-ingredients-600nw-2527826927.jpg",
            icon: "🍖",
            description:
                "Nutritious and tasty meals for your pets. Discover trusted brands and keep your buddy healthy.",
            route: "/category-filtered-product/pet-food",
            bgColor: "bg-green-900/50",
            btn: "Buy Now"
        },
        {
            id: 3,
            title: "Accessories",
            image: "https://img.freepik.com/free-photo/pet-accessories-still-life-concept-with-colorful-objects_23-2148949578.jpg?semt=ais_hybrid&w=740&q=80",
            icon: "🦴",
            description:
                "Leashes, collars, toys, and more — everything your pet needs to look stylish and stay playful.",
            route: "/category-filtered-product/accessories",
            bgColor: "bg-blue-900/50",
            btn: "Buy Now"
        },
        {
            id: 4,
            title: "Pet Care Products",
            image: "https://fragranceinnovation.com.au/wp-content/uploads/2022/07/puppy-and-kitten-posing-with-pet-care-products.jpg",
            icon: "🧴",
            description:
                "Shampoos, grooming tools, and health essentials to keep your pets clean, comfy, and happy.",
            route: "/category-filtered-product/pet-care-products",
            bgColor: "bg-yellow-900/50",
            btn: "Buy Now"
        },
    ];
  return (
    <>
        <div className='p-20' >
            <h1 className='text-4xl text-orange-500' >Categories</h1>
            <div className='grid justify-between items-center mt-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10' >
                {
                    categories.map(({id, title, image, icon, description, route, bgColor, btn}) => (
                        <Link to={route} ><CategoryCard key={id} id={id} title={title} image={image} icon={icon} description={description} route={route} bgColor={bgColor} btn={btn}/></Link>
                    ))
                }
            </div>
        </div> 
    </>
  )
}

export default Category
