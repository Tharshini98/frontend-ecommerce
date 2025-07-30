import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-lg shadow p-4"
            >
              <div className="mb-2">
                <span className="font-semibold">Order ID:</span>{" "}
                <span className="text-sm">{order._id}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-green-600 capitalize">
                  {order.status}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Total:</span> ₹{order.total}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Items:</h4>
                <ul className="list-disc ml-5 text-sm">
                  {order.items.map((item) => (
                    <li key={item.product._id}>
                      {item.product.name} × {item.qty} = ₹
                      {item.product.price * item.qty}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <p>Ordered at: {new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
