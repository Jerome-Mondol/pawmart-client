import React, { useState, useEffect, useMemo } from 'react'
import { axiosInstance } from '../axios/axios';
import PetCard from '../components/Home/PetCard';

const RecentListings = () => {
  const[pets, setPets] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axiosInstance.get('/listings?count=50');
        setPets(res.data || []);
      }
      catch(err) {
        console.error(err)
      }
    }
    fetchPets();
  }, [])

  const categories = useMemo(() => ['all', ...new Set(pets.map(p => p.category).filter(Boolean))], [pets]);

  const filtered = useMemo(() => {
    let list = pets.slice();
    if (category !== 'all') list = list.filter(p => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => (p.name || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
    }
    list = list.filter(p => !!p.price);
    if (sortBy === 'price-asc') list.sort((a,b) => (parseFloat(a.price)||0) - (parseFloat(b.price)||0));
    else if (sortBy === 'price-desc') list.sort((a,b) => (parseFloat(b.price)||0) - (parseFloat(a.price)||0));
    else if (sortBy === 'oldest') list.sort((a,b) => new Date(a.date||0) - new Date(b.date||0));
    else list.sort((a,b) => new Date(b.date||0) - new Date(a.date||0));
    return list;
  }, [pets, category, query, sortBy]);

  const visible = filtered.slice(0, limit);

  return (
    <>
        <div className='p-5 sm:p-20' >
            <div className="flex items-center justify-between">
              <h1 className='text-4xl text-orange-500' >Recent Listings</h1>
              <div className="flex gap-2 items-center">
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" className="input input-bordered" />
                <select value={category} onChange={e => setCategory(e.target.value)} className="select select-bordered">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="select select-bordered">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <select value={limit} onChange={e => setLimit(parseInt(e.target.value,10))} className="select select-bordered">
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                </select>
              </div>
            </div>
            <div className='grid justify-between items-center mt-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5' >
              {
                visible && 
                visible.map(({category, date, description, email, image, location, name, price, _id}) => (
                  <PetCard key={_id} category={category} description={description} date={date} email={email} image={image} location={location} name={name} price={price} id={_id} />
                ))
              }
            </div>
        </div>  
    </>
  )
}

export default RecentListings
