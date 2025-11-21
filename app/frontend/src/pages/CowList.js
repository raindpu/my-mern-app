import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CowList() {
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCows();
  }, []);

  const fetchCows = async () => {
    try {
      const response = await axios.get('/api/cows');
      setCows(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cows:', error);
      setLoading(false);
    }
  };

  const filteredCows = filter === 'all' ? cows : cows.filter(cow => cow.healthStatus === filter);

  if (loading) return <div className="container"><h2 style={{color: 'white'}}>Loading...</h2></div>;

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginBottom: '1rem' }}>All Cows</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={() => setFilter('all')} className="btn" style={{ marginRight: '0.5rem' }}>All</button>
        <button onClick={() => setFilter('Healthy')} className="btn" style={{ marginRight: '0.5rem' }}>Healthy</button>
        <button onClick={() => setFilter('Under Treatment')} className="btn" style={{ marginRight: '0.5rem' }}>Under Treatment</button>
        <button onClick={() => setFilter('Critical')} className="btn">Critical</button>
      </div>

      <div className="card-grid">
        {filteredCows.map(cow => (
          <div key={cow._id} className="card">
            <h3>{cow.name}</h3>
            {cow.gaushalaId && <p className="card-info">🏠 {cow.gaushalaId.name}</p>}
            <p className="card-info">Breed: {cow.breed}</p>
            <p className="card-info">Age: {cow.age} years</p>
            <p className="card-info">Gender: {cow.gender}</p>
            <p className="card-info">Color: {cow.color}</p>
            <span className={`badge badge-${cow.healthStatus === 'Healthy' ? 'healthy' : cow.healthStatus === 'Under Treatment' ? 'treatment' : 'critical'}`}>
              {cow.healthStatus}
            </span>
            {cow.milkProduction > 0 && (
              <p className="card-info">🥛 Milk Production: {cow.milkProduction}L/day</p>
            )}
            {cow.specialNeeds && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Special Needs: {cow.specialNeeds}</p>
            )}
          </div>
        ))}
      </div>
      {filteredCows.length === 0 && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', textAlign: 'center' }}>
          <p>No cows found with selected filter.</p>
        </div>
      )}
    </div>
  );
}

export default CowList;