import React from "react";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Seller Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/seller/add-product"
          className="bg-green-600 text-white px-4 py-6 rounded-xl shadow hover:bg-green-700 text-center"
        >
           Add New Product
        </Link>

        <Link
          to="/seller/orders"
          className="bg-blue-600 text-white px-4 py-6 rounded-xl shadow hover:bg-blue-700 text-center"
        >
           View Orders
        </Link>

        <Link
          to="/products" 
          className="bg-purple-600 text-white px-4 py-6 rounded-xl shadow hover:bg-purple-700 text-center"
        >
           Manage Products
        </Link>
      </div>
    </div>
  );
};

export default SellerDashboard;
