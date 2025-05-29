import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [listening, setListening] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleVoiceSearch = () => {
    const recognition =
      new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setListening(false);
      navigate(`/shop?search=${speechResult}`);
    };

    recognition.onerror = (err) => {
      console.error("Voice error:", err);
      alert("Voice recognition failed. Try again.");
      setListening(false);
    };
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center dark:bg-gray-900 dark:text-white">
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 dark:text-blue-400"
      >
        RevvZone
      </Link>

      <div className="space-x-4 flex items-center">
        <Link to="/shop" className="hover:text-blue-600">Shop</Link>
        <Link to="/cart" className="hover:text-blue-600">Cart</Link>
        <Link to="/wishlist" className="hover:text-blue-600">Wishlist</Link>

        <button
          onClick={handleVoiceSearch}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          title="Voice Search"
        >
          🎤 {listening ? "Listening..." : "Voice Search"}
        </button>

        {!token ? (
          <>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
            <Link to="/signup" className="text-green-500 hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            {user?.isAdmin && (
              <Link to="/admin" className="text-purple-500 hover:underline">
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
            <Link to="/orders" className="hover:text-blue-600">Orders</Link>
          </>
        )}
      </div>
    </nav>
  );
}
