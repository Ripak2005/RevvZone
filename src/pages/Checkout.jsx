import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

   const handleCheckout = async (e) => {
    e.preventDefault();
    if (!address) return alert("Please enter your address");

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://revvzone-backend-1.onrender.com/api/orders",
        {
          items: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total,
          address,
        },
        { headers: { "x-auth-token": token } }
      );
      alert("Order placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. Add items before checking out.</p>
      ) : (
        <form onSubmit={handleCheckout}>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Shipping Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>

          <div className="text-right mb-4 font-bold">
            Total Amount: ₹{total}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm Order
          </button>
        </form>
      )}
    </div>
  );
}
