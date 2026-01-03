import React, { useEffect, useState } from "react";
import { secureAxios } from "../axios/axios";
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
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary text-3xl"></span>
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

      <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="min-w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4 font-medium text-gray-800">
                  {order.productName}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {order.price === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${order.price}`
                  )}
                </td>
                <td className="py-3 px-4 text-gray-600">{order.quantity}</td>
                <td className="py-3 px-4 text-gray-600">{order.address}</td>
                <td className="py-3 px-4 text-gray-600">{order.phone}</td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toast("Order details coming soon")}
                    className="text-orange-500 hover:text-orange-600 font-medium text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
