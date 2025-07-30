import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // ✅ useCart here

  useEffect(() => {
    axios.get("https://backend-mrf6.onrender.com/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {products.map(product => (
        <div key={product._id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">₹{product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-3 py-1 mt-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
