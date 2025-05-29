import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://revvzone-backend-1.onrender.com/api/auth/register', form);

      
      if ((res.status === 201 || res.data.token)) {
        alert('Signup successful');
        navigate('/login');
      } else {
        alert('Signup failed. Try again.');
      }
    } catch (err) {
      const msg = err.response?.data?.msg || 'Signup failed due to server error';
      alert(msg);            
      setError(msg);        
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={signupHandler} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          required
          className="w-full p-2 border mb-4"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 border mb-4"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 border mb-4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Signup
        </button>

        
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
    </div>
  );
}
