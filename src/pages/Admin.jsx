import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '', brand: '', price: '', category: '', description: '', stock: '', images: ['']
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchProducts = () => {
    axios.get('https://revvzone-backend-1.onrender.com/api/products')
      .then(res => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`https://revvzone-backend-1.onrender.com/api/products/${editId}`, form, {
          headers: { 'x-auth-token': token }
        });
        setEditId(null);
      } else {
        await axios.post('https://revvzone-backend-1.onrender.com/api/products', form, {
          headers: { 'x-auth-token': token }
        });
      }
      setForm({ name: '', brand: '', price: '', category: '', description: '', stock: '', images: [''] });
      fetchProducts();
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await axios.delete(`https://revvzone-backend-1.onrender.com/api/products/${id}`, {
      headers: { 'x-auth-token': token }
    });
    fetchProducts();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin – Product Management</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">{editId ? "Edit Product" : "Add Product"}</h3>
        <input className="block w-full p-2 border mb-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input className="block w-full p-2 border mb-2" placeholder="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
        <input className="block w-full p-2 border mb-2" placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
        <input className="block w-full p-2 border mb-2" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <textarea className="block w-full p-2 border mb-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input className="block w-full p-2 border mb-2" placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        <input className="block w-full p-2 border mb-2" placeholder="Image URL" value={form.images[0]} onChange={e => setForm({ ...form, images: [e.target.value] })} />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"} Product
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">All Products</h3>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">₹{p.price}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2 space-x-2">
                <button className="text-blue-600" onClick={() => handleEdit(p)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
