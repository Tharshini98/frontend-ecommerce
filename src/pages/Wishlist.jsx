import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl shadow p-4 flex flex-col justify-between hover:shadow-lg transition"
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                <p className="text-gray-700 font-semibold mb-1">₹{product.price}</p>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              </Link>

              <button
                onClick={() => removeFromWishlist(product._id)}
                className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 mt-auto"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
