import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("https://revvzone-backend-1.onrender.com/api/orders/my", {
      headers: { "x-auth-token": token }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} className="border rounded p-4 mb-4 bg-white shadow">
            <div className="font-semibold mb-2">
              Ordered on: {new Date(order.createdAt).toLocaleDateString()}
            </div>
            <ul className="list-disc ml-6">
              {order.items.map((item, idx) => (
                <li key={idx}>{item.name} × {item.quantity} — ₹{item.price}</li>
              ))}
            </ul>
            <div className="mt-2 font-bold text-right">Total: ₹{order.total}</div>
            <div className="text-sm text-right text-gray-500">Status: {order.status}</div>
          </div>
        ))
      )}
    </div>
  );
}
