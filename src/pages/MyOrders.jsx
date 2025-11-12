import React, { useEffect, useState } from "react";
import { axiosInstance, secureAxios } from "../axios/axios";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await secureAxios.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading your orders...
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Please log in to view your orders.
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-gray-600">
        <h2 className="text-2xl font-semibold mb-2">No Orders Found</h2>
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        My Orders
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {order.productName}
            </h2>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Price:</span>{" "}
              {order.price === 0 ? (
                <span className="text-green-600">Free for Adoption</span>
              ) : (
                <span className="text-orange-600">${order.price}</span>
              )}
            </p>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Quantity:</span> {order.quantity}
            </p>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Address:</span> {order.address}
            </p>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Phone:</span> {order.phone}
            </p>

            {order.additionalNotes && (
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Notes:</span>{" "}
                {order.additionalNotes}
              </p>
            )}

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.date).toLocaleDateString()}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>

              <button
                onClick={() => toast("Order details coming soon")}
                className="text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
