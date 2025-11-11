import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { secureAxios } from "../axios/axios";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const fetchListings = async () => {
    try {
      const email = auth.currentUser?.email;
      const res = await secureAxios.get(`/listings/${email}`);
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching listings:", err);
      toast.error("Failed to load your listings.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await secureAxios.delete(`/listings/${id}`);
      toast.success("Listing deleted.");
      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
        console.log(err)
      toast.error("Failed to delete listing.");
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  if (loading) return <div className="text-center py-10">Loading your listings...</div>;

  return (
    <section className="max-w-5xl mx-auto p-6 text-gray-700">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">My Listings 🐾</h2>

      {listings.length === 0 ? (
        <p className="text-gray-600 text-center">You have no listings yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-orange-100">
            <tr>
              <th className="border p-3">#</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, idx) => (
              <tr key={listing._id} className="hover:bg-orange-50 transition">
                <td className="border p-3 text-center">{idx + 1}</td>
                <td className="border p-3">{listing.name}</td>
                <td className="border p-3">{listing.category}</td>
                <td className="border p-3">${listing.price}</td>
                <td className="border p-3 flex justify-center gap-3">
                  <button
                    onClick={() => toast("Open edit modal here")}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default MyListings;
