import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist. <Link to="/shop" className="text-blue-600">Explore</Link></p>
      ) : (
        wishlist.map(item => (
          <div key={item._id} className="mb-4 border-b pb-2 flex justify-between items-center">
            <div>{item.name}</div>
            <button className="text-red-500" onClick={() => toggleWishlist(item)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}
