import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  // ✅ use hooks INSIDE the component
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();

  useEffect(() => {
    axios
      .get(`https://revvzone-backend-1.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
      <div>
        <img
          src={product.images[0] || "https://via.placeholder.com/400"}
          alt={product.name}
          className="rounded shadow"
        />
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="text-xl font-semibold text-blue-600 mb-4">
          ₹{product.price}
        </div>

        <div className="space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={() => toggleWishlist(product)}
          >
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
