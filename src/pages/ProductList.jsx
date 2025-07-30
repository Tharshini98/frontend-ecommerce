import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const fetchProducts = async () => {
    try {
      const params = { keyword, category, page };
      const res = await axios.get("https://backend-mrf6.onrender.com/api/products", { params });
      setProducts(res.data.products);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword, category, page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">All Products</h2>

     
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded w-full sm:w-1/3"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothes">Clothes</option>
          <option value="toys">Toys</option>
          <option value="home appliances">Home Appliances</option>
          <option value="gaming">Gaming</option>
        </select>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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
              <h3 className="text-lg font-medium mb-1">{product.name}</h3>
              <p className="text-gray-700 font-semibold mb-1">₹{product.price}</p>
              <p className="text-sm text-gray-600 mb-1">{product.category}</p>
              <p className="text-xs text-gray-500 mb-2">Sold by: {product.seller?.name}</p>
            </Link>

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="bg-pink-500 text-white text-sm px-3 py-1 rounded hover:bg-pink-600"
              >
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded border ${
              page === i + 1 ? "bg-gray-800 text-white" : "bg-white"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
