import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import toast from "react-hot-toast";
import { axiosInstance, secureAxios } from "../axios/axios";
import { useAuth } from "../hooks/useAuth";

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState({
    address: "",
    phone: "",
    additionalNotes: "",
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axiosInstance.get(`/listings/${id}`);
        if (!res.data) throw new Error("Listing not found");
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
        toast.error("Failed to load listing details.");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const orderInfo = {
      productId: listing._id,
      productName: listing.name,
      buyerName: user?.displayName || "Anonymous",
      email: user?.email,
      quantity: listing.category === "Pets" ? 1 : 1,
      price: listing.price,
      address: orderData.address,
      phone: orderData.phone,
      date: new Date().toISOString().split("T")[0],
      additionalNotes: orderData.additionalNotes,
    };

    try {
      await secureAxios.post("/orders", orderInfo);
      toast.success("Order placed successfully!");
      setShowOrderForm(false);
      setOrderData({ address: "", phone: "", additionalNotes: "" });
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Failed to place order.");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500 text-lg">Loading details...</div>
    );

  if (!listing)
    return (
      <div className="text-center py-10 text-red-500 text-lg"> Listing not found or deleted. </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="relative">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-[400px] object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
          <h1 className="text-5xl font-bold mb-2">{listing.name}</h1>
          <p className="text-xl">{listing.category}</p>
        </div>
      </div>

      <section className="max-w-5xl mx-auto py-10 px-6 md:px-0">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">{listing.name}</h2>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>

            <div className="mt-4 space-y-2 text-gray-600">
              <p><span className="font-semibold">Location:</span> {listing.location}</p>
              <p>
                <span className="font-semibold">Price:</span>{" "}
                {listing.price === 0 ? (
                  <span className="text-green-600 font-medium">Free for Adoption</span>
                ) : (
                  <span className="text-orange-600 font-medium">${listing.price}</span>
                )}
              </p>
              <p>
                <span className="font-semibold">Posted On:</span>{" "}
                {new Date(listing.date).toLocaleDateString()}
              </p>
              <p><span className="font-semibold">Owner Email:</span> {listing.email}</p>
            </div>

            {user ? (
              <button
                onClick={() => setShowOrderForm(true)}
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                {listing.category === "Pets" ? "Adopt Now" : "Order Now"}
              </button>
            ) : (
              <p className="mt-6 text-red-500 font-medium">
                Please log in to place an order.
              </p>
            )}

            <Link to="/" className="block mt-3 text-sm text-orange-500 hover:underline" >← Back to Listings </Link>
          </div>
        </div>
      </section>

      {showOrderForm && user && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {listing.category === "Pets" ? "Adoption Request" : "Place Order"}
            </h2>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Buyer Name</label>
                <input type="text" value={user.displayName} readOnly className="w-full border rounded-md p-2 bg-gray-100" />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" value={user.email} readOnly className="w-full border rounded-md p-2 bg-gray-100" />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <input type="text" required value={orderData.address} onChange={(e) =>
                    setOrderData({ ...orderData, address: e.target.value })
                  } className="w-full border rounded-md p-2" placeholder="Your address"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input type="text" required
                  value={orderData.phone} onChange={(e) =>
                    setOrderData({ ...orderData, phone: e.target.value })
                  } className="w-full border rounded-md p-2" placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-700">Additional Notes</label>
                <textarea rows="3" value={orderData.additionalNotes} onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      additionalNotes: e.target.value,
                    })
                  } className="w-full border rounded-md p-2" placeholder="Any special instructions..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowOrderForm(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md" >Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold">Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
