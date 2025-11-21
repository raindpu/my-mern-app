import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function GaushalaDetail() {
  const { id } = useParams();
  const [gaushala, setGaushala] = useState(null);
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGaushalaDetails();
  }, [id]);

  const fetchGaushalaDetails = async () => {
    try {
      const [gaushalaRes, cowsRes] = await Promise.all([
        axios.get(`/api/gaushalas/${id}`),
        axios.get(`/api/cows?gaushalaId=${id}`)
      ]);
      setGaushala(gaushalaRes.data);
      setCows(cowsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching details:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><h2 style={{color: 'white'}}>Loading...</h2></div>;
  if (!gaushala) return <div className="container"><h2 style={{color: 'white'}}>Gaushala not found</h2></div>;

  return (
    <div className="container">
      <div className="detail-container">
        <h1 style={{ color: '#667eea' }}>{gaushala.name}</h1>
        <p style={{ fontSize: '1.1rem', margin: '1rem 0' }}>📍 {gaushala.location}</p>
        <p style={{ color: '#666', lineHeight: '1.8' }}>{gaushala.description}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <strong>Contact:</strong> {gaushala.contactNumber}
          </div>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <strong>Email:</strong> {gaushala.email}
          </div>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <strong>Established:</strong> {gaushala.establishedYear}
          </div>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <strong>Total Cows:</strong> {gaushala.totalCows}
          </div>
        </div>

        <Link to={`/store/${gaushala._id}`} className="btn" style={{ marginRight: '1rem' }}>Visit Store</Link>
      </div>

      <div className="detail-container">
        <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>Cows in this Gaushala</h2>
        <div className="card-grid">
          {cows.map(cow => (
            <div key={cow._id} className="card">
              <h3>{cow.name}</h3>
              <p className="card-info">Breed: {cow.breed}</p>
              <p className="card-info">Age: {cow.age} years</p>
              <p className="card-info">Gender: {cow.gender}</p>
              <span className={`badge badge-${cow.healthStatus === 'Healthy' ? 'healthy' : cow.healthStatus === 'Under Treatment' ? 'treatment' : 'critical'}`}>
                {cow.healthStatus}
              </span>
              {cow.milkProduction > 0 && (
                <p className="card-info">🥛 Milk: {cow.milkProduction}L/day</p>
              )}
            </div>
          ))}
        </div>
        {cows.length === 0 && <p>No cows registered yet.</p>}
      </div>
    </div>
  );
}

export default GaushalaDetail;