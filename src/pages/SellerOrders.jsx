import React, { useEffect, useState } from "react";
import axios from "../services/api"; 
import { useAuth } from "../context/AuthContext";

const SellerOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const response = await axios.get("/orders/seller", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching seller orders:", error);
      }
    };

    fetchSellerOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Seller Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow">
              <p className="font-semibold">Order ID: {order._id}</p>
              <p>Buyer: {order.buyer?.name || "N/A"}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <div>
                <h4 className="font-semibold">Products:</h4>
                <ul className="list-disc list-inside">
                  {order.products.map((product) => (
                    <li key={product._id}>
                      {product.name} - ₹{product.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
