import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { useAuth } from '../context/AuthContext';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/orders/seller/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch seller orders', err);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Seller Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow">
              <p className="font-semibold">Order ID: {order._id}</p>
              <p>Buyer: {order.user.name}</p>
              <p>Email: {order.user.email}</p>
              <p>Status: {order.status}</p>
              <div className="mt-2 space-y-1">
                {order.items
                  .filter((item) => item.seller === order.user._id) 
                  .map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <p>{item.product.name}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
