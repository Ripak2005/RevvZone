import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");
  const categoryQuery = new URLSearchParams(location.search).get("category");
  const [activeCat, setActiveCat] = useState(categoryQuery || "");

  useEffect(() => {
    axios.get("https://revvzone-backend-1.onrender.com/api/products").then((res) => {
      const data = res.data;
      let filteredData = data;

      if (searchQuery) {
        filteredData = filteredData.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (categoryQuery) {
        filteredData = filteredData.filter(
          (p) => p.category === categoryQuery
        );
      }

      setProducts(filteredData);
    });
  }, [searchQuery, categoryQuery]);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = activeCat
    ? products.filter((p) => p.category === activeCat)
    : products;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {searchQuery
          ? `Search results for "${searchQuery}"`
          : categoryQuery
          ? `Category: ${categoryQuery}`
          : "All Products"}
      </h2>

      {/* Category filter buttons */}
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => setActiveCat("")}
          className={`px-4 py-1 rounded border ${
            activeCat === "" ? "bg-blue-600 text-white" : "bg-white"}
        `}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-1 rounded border ${
              activeCat === cat ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`}>
            <div className="bg-white shadow rounded overflow-hidden h-[310px] flex flex-col">
              <div className="h-[200px] flex items-center justify-center p-4 bg-white">
                <img
                  src={product.images[0] || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="max-h-full object-contain"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-base line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-800 font-semibold mt-2">
                  ₹{product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
