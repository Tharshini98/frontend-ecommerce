import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white border rounded shadow p-4 flex flex-col"
              >
                <Link to={`/products/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                </Link>
                <p className="text-sm text-gray-600 mb-1">
                  Price: ₹{item.price}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Quantity: {item.qty}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 text-sm self-start"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-white border rounded shadow-md">
            <h3 className="text-xl font-bold">Total: ₹{totalAmount}</h3>
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
