import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { token } = useAuth();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddToWishlist = async () => {
    try {
      await api.post(`/wishlist`, { productId: id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Added to wishlist!");
    } catch (error) {
      alert("Failed to add to wishlist");
    }
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 flex gap-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-1/2 rounded shadow"
      />
      <div className="w-1/2">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-600">{product.category}</p>
        <p className="text-lg mt-2">{product.description}</p>
        <p className="text-xl font-semibold text-blue-600 mt-4">₹{product.price}</p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="bg-pink-600 text-white px-4 py-2 rounded"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
