import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function GaushalaList() {
  const [gaushalas, setGaushalas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGaushalas();
  }, []);

  const fetchGaushalas = async () => {
    try {
      const response = await axios.get('/api/gaushalas');
      setGaushalas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gaushalas:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><h2 style={{color: 'white'}}>Loading...</h2></div>;

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>Our Gaushalas</h1>
      <div className="card-grid">
        {gaushalas.map(gaushala => (
          <div key={gaushala._id} className="card">
            <h3>{gaushala.name}</h3>
            <p className="card-info">📍 {gaushala.location}</p>
            <p className="card-info">🐄 Total Cows: {gaushala.totalCows}</p>
            <p className="card-info">📞 {gaushala.contactNumber}</p>
            <p style={{ margin: '1rem 0', color: '#666' }}>{gaushala.description}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Link to={`/gaushala/${gaushala._id}`} className="btn">View Details</Link>
              <Link to={`/store/${gaushala._id}`} className="btn btn-secondary">Visit Store</Link>
            </div>
          </div>
        ))}
      </div>
      {gaushalas.length === 0 && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', textAlign: 'center' }}>
          <p>No gaushalas found. Be the first to register one!</p>
        </div>
      )}
    </div>
  );
}

export default GaushalaList;