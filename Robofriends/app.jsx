import React, { useEffect, useMemo, useState } from 'react';

function SearchBox({ value, onChange }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="search robots"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Card({ robot }) {
  return (
    <div className="card">
      <img src={`https://robohash.org/${robot.id}?set=set2&size=200x200`} alt={robot.name} width="200" height="200" />
      <h3>{robot.name}</h3>
      <p>{robot.email}</p>
    </div>
  );
}

function CardList({ robots }) {
  return (
    <div className="grid">
      {robots.map(r => <Card key={r.id} robot={r} />)}
    </div>
  );
}

export default function App() {
  const [robots, setRobots] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(setRobots)
      .catch(() => setRobots([]));
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return robots.filter(r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q));
  }, [robots, query]);

  return (
    <main className="wrap">
      <h1>Robofriends</h1>
      <SearchBox value={query} onChange={setQuery} />
      <CardList robots={filtered} />
    </main>
  );
}
