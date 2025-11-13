import React from "react";
import { useLoaderData, useParams } from "react-router";
import PetCard from "../components/Home/PetCard";

const FilteredProducts = () => {
  const products = useLoaderData();
  const { category } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-10">
        {category} Listings
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No products found for this category.
        </p>
      ) : (
        <div className="grid justify-between items-center mt-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 px-4">
          {products.map(
            ({ category, description, date, email, image, location, name, price, _id }) => (
              <PetCard key={_id} category={category} description={description} date={date} email={email} image={image} location={location} name={name} price={price} id={_id} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FilteredProducts;
