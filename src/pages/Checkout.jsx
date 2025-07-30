import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { token } = useAuth();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePayment = async () => {
    try {
    
      const { data } = await api.post(
        "/orders/razorpay",
        { amount: total * 100 }, // in paise
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "E-Commerce",
        description: "Order Payment",
        order_id: data.id,
        handler: async (response) => {
          await api.post(
            "/orders/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: cart,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          clearCart();
          alert("Payment Successful! Order Placed.");
        },
        prefill: {
          name: "Your Name",
          email: "your@email.com",
        },
        theme: { color: "#0f172a" },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p className="mb-4">Total: ₹{total}</p>
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Checkout;
