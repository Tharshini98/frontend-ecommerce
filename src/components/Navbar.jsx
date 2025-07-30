// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaHeart, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopZone
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium">
            Products
          </Link>

          {user?.role === "buyer" && (
            <>
              <Link to="/wishlist" className="relative text-gray-700 hover:text-blue-600">
                <FaHeart size={20} />
              </Link>

              <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                <FaShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </>
          )}

          {user ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                <FaUserCircle size={20} />
              </Link>
              {user.role === "seller" && (
                <Link to="/seller/dashboard" className="text-sm font-medium text-blue-600 border px-2 py-1 rounded hover:bg-blue-50">
                  Seller Dashboard
                </Link>
              )}
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <FaSignOutAlt size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
