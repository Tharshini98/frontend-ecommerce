import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const SellerOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/orders/seller", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders for Your Products</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded mb-4 shadow-sm bg-white"
          >
            <p className="text-gray-600">Order ID: {order._id}</p>
            <p className="font-semibold mt-2">Buyer: {order.buyer?.name}</p>
            <ul className="mt-2">
              {order.items.map((item) => (
                <li key={item._id} className="text-sm text-gray-700">
                  {item.name} x {item.qty} – ₹{item.price * item.qty}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerOrders;
