// src/pages/SellerDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const res = await api.get("/seller/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch seller products:", err);
      }
    };
    fetchMyProducts();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>
      <Link
        to="/seller/add-product"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
      >
        + Add Product
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow bg-white flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">₹{product.price}</p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/seller/edit-product/${product._id}`}
                className="text-blue-500 text-sm"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
