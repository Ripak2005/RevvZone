import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/shop" className="text-blue-600">
            Shop now
          </Link>
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="mb-4 border-b pb-2">
              <div className="flex justify-between">
                <div>
                  <h3>{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p>₹{item.price * item.quantity}</p>
                  <button
                    className="text-red-500"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-right font-bold mt-4">Total: ₹{total}</div>
          <Link to="/checkout">
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>

          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
