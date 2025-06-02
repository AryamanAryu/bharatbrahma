import { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: '', interests: '', budget: '', duration: '' });
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/itinerary', {
      ...formData,
      interests: formData.interests.split(',').map(s => s.trim())
    });
    setResult(res.data.response);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-purple-200 to-indigo-300">
      <h1 className="text-3xl font-bold mb-4 text-center">🇮🇳 BharatBrahma: India Itinerary AI</h1>

      <form className="space-y-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" onChange={handleChange} className="w-full p-2 rounded" required />
        <input name="interests" placeholder="Interests (comma separated)" onChange={handleChange} className="w-full p-2 rounded" required />
        <input type="number" name="budget" placeholder="Budget (INR)" onChange={handleChange} className="w-full p-2 rounded" required />
        <input type="number" name="duration" placeholder="Duration (days)" onChange={handleChange} className="w-full p-2 rounded" required />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Generate</button>
      </form>

      {result && <div className="bg-white mt-6 p-4 rounded shadow-lg whitespace-pre-wrap">{result}</div>}
    </div>
  );
}

export default App;
