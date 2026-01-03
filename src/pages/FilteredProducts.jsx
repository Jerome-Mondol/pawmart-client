import React, { useMemo, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import PetCard from "../components/Home/PetCard";

const FilteredProducts = () => {
  const products = useLoaderData() || [];
  const { category } = useParams();

  // filter & sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const normalizedMin = parseFloat(minPrice) || 0;
  const normalizedMax = maxPrice === "" ? Infinity : parseFloat(maxPrice) || Infinity;

  const filtered = useMemo(() => {
    let list = products.slice();

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.location || "").toLowerCase().includes(q)
      );
    }

    list = list.filter((p) => {
      const price = parseFloat(p.price) || 0;
      return price >= normalizedMin && price <= normalizedMax;
    });

    // sort
    list.sort((a, b) => {
      if (sortBy === "price-asc") return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
      if (sortBy === "price-desc") return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
      if (sortBy === "oldest") return new Date(a.date || 0) - new Date(b.date || 0);
      return new Date(b.date || 0) - new Date(a.date || 0);
    });

    return list;
  }, [products, searchQuery, normalizedMin, normalizedMax, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  React.useEffect(() => setPage(1), [searchQuery, minPrice, maxPrice, sortBy, pageSize]);

  return (
    <div className="min-h-screen bg-base-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">{category} Listings</h1>

      <div className="container mx-auto px-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <input
            type="text"
            placeholder="Search by name, description or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full md:w-1/2"
          />

          <div className="flex gap-3 mt-2 md:mt-0">
            <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="input input-bordered w-24" />
            <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="input input-bordered w-24" />
            <select className="select select-bordered" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end items-center gap-2 mt-3">
          <label className="text-sm">Per page</label>
          <select className="select select-bordered w-24" value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value, 10))}>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted">No products found for this category.</p>
      ) : (
        <>
          <div className="grid justify-between items-center mt-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 px-4">
            {paginated.map(({ category, description, date, email, image, location, name, price, _id }) => (
              <PetCard key={_id} category={category} description={description} date={date} email={email} image={image} location={location} name={name} price={price} id={_id} />
            ))}
          </div>

          <div className="container mx-auto px-4 py-6 flex items-center justify-center">
            <div className="btn-group">
              <button className="btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} className={`btn ${page === i + 1 ? 'btn-active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className="btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilteredProducts;
