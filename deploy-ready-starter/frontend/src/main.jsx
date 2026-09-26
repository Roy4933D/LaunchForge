import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Checking API…');
  const [error, setError] = useState('');

  async function load() {
    try {
      const health = await fetch(`${API}/api/health`);
      const healthData = await health.json();
      setStatus(health.ok ? `API online · database ${healthData.database}` : 'API unavailable');
      const response = await fetch(`${API}/api/items`);
      if (!response.ok) throw new Error('Could not load items');
      setItems(await response.json());
    } catch {
      setStatus('API connection failed');
      setError('Check that the backend is running and VITE_API_URL is correct.');
    }
  }

  useEffect(() => { load(); }, []);

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Request failed');
      setName('');
      setItems(current => [data, ...current]);
    } catch (e) {
      setError(e.message);
    }
  }

  return <main className="shell">
    <header><span className="eyebrow">FULL-STACK STARTER</span><h1>Your next project<br/><em>starts here.</em></h1>
      <p className="intro">A clean React + Express + PostgreSQL foundation, ready for your idea.</p>
      <div className="status"><span className="pulse" />{status}</div>
    </header>
    <section className="panel">
      <h2>Try the connected app</h2>
      <p>Add a sample item. It will be saved in PostgreSQL through the API.</p>
      <form onSubmit={submit}><input value={name} onChange={e => setName(e.target.value)} maxLength="120" placeholder="Give your item a name…" required/><button>Add item <span>↗</span></button></form>
      {error && <p className="error">{error}</p>}
      <div className="items">{items.length ? items.map(item => <article key={item.id}><span className="item-dot"/><span>{item.name}</span><time>{new Date(item.created_at).toLocaleDateString()}</time></article>) : <div className="empty">Your saved items will appear here.</div>}</div>
    </section>
    <footer><span>React · Express · PostgreSQL</span><span>Built to deploy</span></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
