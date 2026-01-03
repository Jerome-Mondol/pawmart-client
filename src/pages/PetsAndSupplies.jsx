import React, { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import PetCard from "../components/Home/PetCard";

const PetsAndSupplies = () => {
  const pets = useLoaderData() || [];

  // filter/sort state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const categories = useMemo(() => ["all", ...new Set(pets.map((p) => p.category).filter(Boolean))], [pets]);
  const locations = useMemo(() => ["all", ...new Set(pets.map((p) => p.location).filter(Boolean))], [pets]);

  const normalizedMin = parseFloat(minPrice) || 0;
  const normalizedMax = maxPrice === "" ? Infinity : parseFloat(maxPrice) || Infinity;

  const filtered = useMemo(() => {
    let list = pets.slice();

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedLocation !== "all") {
      list = list.filter((p) => p.location === selectedLocation);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
      );
    }

    list = list.filter((p) => {
      const price = parseFloat(p.price) || 0;
      return price >= normalizedMin && price <= normalizedMax;
    });

    // sorting
    list.sort((a, b) => {
      if (sortBy === "price-asc") return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
      if (sortBy === "price-desc") return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
      if (sortBy === "oldest") return new Date(a.date || 0) - new Date(b.date || 0);
      // newest
      return new Date(b.date || 0) - new Date(a.date || 0);
    });

    return list;
  }, [pets, selectedCategory, searchQuery, normalizedMin, normalizedMax, selectedLocation, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // reset page when filters change
  React.useEffect(() => setPage(1), [selectedCategory, searchQuery, minPrice, maxPrice, selectedLocation, sortBy, pageSize]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-orange-600 my-10">
        Pets and Supplies
      </h1>

      {/* Controls */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex-1 flex gap-3">
            <input
              type="text"
              placeholder="Search by name or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex gap-3 mt-2 md:mt-0">
            <select
              className="select select-bordered"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <select className="select select-bordered" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 items-center mt-3">
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input input-bordered w-32"
          />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input input-bordered w-32"
          />

          <div className="ml-auto flex items-center gap-2">
            <label className="text-sm">Per page</label>
            <select className="select select-bordered w-24" value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value, 10))}>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listing grid */}
      <div className="grid justify-between items-center mt-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 px-10 my-5">
        {paginated && paginated.length > 0 ? (
          paginated.map(
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
          )
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500">No items match your search and filter criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      <div className="container mx-auto px-4 py-6 flex items-center justify-center">
        <div className="btn-group">
          <button className="btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} className={`btn ${page === i + 1 ? 'btn-active' : ''}`} onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button className="btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetsAndSupplies;
