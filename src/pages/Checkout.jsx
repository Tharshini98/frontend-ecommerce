import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const loadRazorpay = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please try again later.");
      return;
    }

    try {
      const { data } =await axios.post(
  "https://backend-mrf6.onrender.com/api/payment/create-order",
  { amount: Math.round(totalAmount * 100) }
);


      const options = {
        key: "rzp_test_Hz0OoUQL65ZW7O", 
        amount: data.amount,
        currency: data.currency,
        name: "ShopZone",
        description: "Order Payment",
        order_id: data.id,
        handler: function (response) {
          alert("Payment successful!");
          setCartItems([]); 
          navigate("/orders");
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right font-medium text-gray-800">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}

          <div className="text-right text-xl font-bold">
            Total: ₹{totalAmount.toFixed(2)}
          </div>

          <button
            onClick={loadRazorpay}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Pay with Razorpay
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
