import React, { useState } from "react";
import { useLoaderData } from "react-router";
import PetCard from "../components/Home/PetCard";

const PetsAndSupplies = () => {
  const pets = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(pets.map((p) => p.category))];

  const filteredPets =
    selectedCategory === "all"
      ? pets
      : pets.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-orange-600 my-10">
        Pets and Supplies
      </h1>

      <div className="flex justify-center mb-8 ">
        <select
          className="select select-bordered w-full max-w-xs text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid justify-between items-center mt-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 px-10 my-5">
        {filteredPets &&
          filteredPets.map(
            ({ category, date, description, email, image, location, name, price, _id }) => (
              <PetCard
                key={_id}
                category={category}
                description={description}
                date={date}
                email={email}
                image={image}
                location={location}
                name={name}
                price={price}
                id={_id}
              />
            )
          )}
      </div>
    </div>
  );
};

export default PetsAndSupplies;
