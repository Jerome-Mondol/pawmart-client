import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { secureAxios } from "../axios/axios";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const auth = getAuth();

  // fetch user-specific listings
  const fetchListings = async () => {
    try {
      const email = auth.currentUser?.email;
      const res = await secureAxios.get(`/user/listings/${email}`);
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching listings:", err);
      toast.error("Failed to load your listings.");
    } finally {
      setLoading(false);
    }
  };

  // delete listing
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await secureAxios.delete(`/listings/${id}`);
      toast.success("Listing deleted.");
      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete listing.");
    }
  };

  // open modal + set selected listing
  const handleUpdateClick = (listing) => {
    setSelected(listing);
    const modal = document.getElementById("update_modal");
    if (modal) modal.showModal();
  };

  // update listing form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await secureAxios.put(`/listings/${selected._id}`, selected);
      toast.success(res.data.message || "Listing updated!");
      document.getElementById("update_modal").close();
      fetchListings(); // refresh the list
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading your listings...</div>;

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
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                    onClick={() => handleUpdateClick(listing)}
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

      <dialog id="update_modal" className="modal">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 text-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-lg mx-auto"
        >
          <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
            Update Listing
          </h1>

          <div className="space-y-4">
            <input type="text" placeholder="Listing Name" value={selected?.name || ""} onChange={(e) => setSelected({ ...selected, name: e.target.value })} className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" required
            />
            <input type="number" placeholder="Price" value={selected?.price || ""} onChange={(e) => setSelected({ ...selected, price: e.target.value })} className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <select
              value={selected?.category || ""}
              onChange={(e) =>
                setSelected({ ...selected, category: e.target.value })
              }
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Category</option>
              <option value="pet">Pet</option>
              <option value="product">Product</option>
            </select>
            <textarea
              placeholder="Description"
              value={selected?.description || ""}
              onChange={(e) =>
                setSelected({ ...selected, description: e.target.value })
              }
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              rows="4"
              required
            ></textarea>

            <div className="flex gap-4 mt-6">
              <button
                type="submit" className="w-full bg-orange-500 hover:bg-orange-600 transition font-semibold py-3 rounded-md"
              >
                Save Changes
              </button>
              <button type="button" onClick={() => document.getElementById("update_modal").close()}
                className="w-full bg-gray-600 hover:bg-gray-700 transition font-semibold py-3 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </section>
  );
};

export default MyListings;
