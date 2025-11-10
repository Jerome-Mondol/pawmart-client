import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { secureAxios } from '../axios/axios';

const AddListing = () => {
    const { user } = useAuth();

    const handleAddListing = async(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries())
        console.log(data);

        try {
            const res = await secureAxios.post('/add-listing', JSON.stringify(data));
            console.log("successfully added listing")
        }
        catch(err) {
            console.log(err)
        }
    }

  return (
    <>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
  <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
    <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center tracking-wider">
      Add New Listing
    </h1>

    <form className="grid grid-cols-1 md:grid-cols-2 gap-5 " onSubmit={handleAddListing}>
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">Name</label>
        <input name='name' type="text" placeholder="Pet or Product Name"
          className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-gray-500 text-gray-500"/>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1 ">Category</label>
        <select name='category' className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none text-gray-500">
          <option  >Pets</option>
          <option  >Food</option>
          <option  >Accessories</option>
          <option >Care Products</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">Price</label>
        <input name='price' type="number" placeholder="0 for pets"
          className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-gray-500 text-gray-500"/>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">Location</label>
        <input name='location' type="text" placeholder="Dhaka, Bangladesh"
          className="border rounded-lg p-2 focus:ring-2   focus:ring-orange-500 outline-none placeholder:text-gray-500 text-gray-500"/>
      </div>

      <div className="flex flex-col md:col-span-2">
        <label className="font-medium text-gray-700 mb-1">Description</label>
        <textarea name='description' rows="3" placeholder="Describe the listing..."
          className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-gray-500 text-gray-500"></textarea>
      </div>

      <div className="flex flex-col md:col-span-2">
        <label className="font-medium text-gray-700 mb-1">Image URL</label>
        <input name='image' type="url" placeholder="https://example.com/image.jpg"
          className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-gray-500 text-gray-500"/>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">Pick Up Date</label>
        <input name='date' type="date" className="border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none placeholder:text-gray-500 text-gray-500"/>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-1">Email</label>
        <input type="email" name='email' value={user?.email} readOnly
          className="border rounded-lg p-2 bg-gray-100  placeholder:text-gray-500 text-gray-500"/>
      </div>

      <div className="md:col-span-2 mt-4">
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg text-lg font-semibold transition">
          Submit Listing
        </button>
      </div>
    </form>
  </div>
</div>

    </>
  )
}

export default AddListing
