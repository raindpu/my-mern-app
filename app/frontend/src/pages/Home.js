import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [stats, setStats] = useState({
    totalGaushalas: 0,
    totalCows: 0,
    totalProducts: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [gaushalas, cows, products] = await Promise.all([
        axios.get('/api/gaushalas'),
        axios.get('/api/cows'),
        axios.get('/api/products')
      ]);
      setStats({
        totalGaushalas: gaushalas.data.length,
        totalCows: cows.data.length,
        totalProducts: products.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div>
      <div className="hero">
        <h1>Welcome to Gaushala Management</h1>
        <p>Protecting and caring for our sacred cows</p>
        <Link to="/gaushalas" className="btn">Explore Gaushalas</Link>
      </div>
      
      <div className="container">
        <div className="stats">
          <div className="stat-card">
            <h3>{stats.totalGaushalas}</h3>
            <p>Registered Gaushalas</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalCows}</h3>
            <p>Cows Under Care</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalProducts}</h3>
            <p>Products Available</p>
          </div>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', marginTop: '2rem' }}>
          <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>About Our Gaushalas</h2>
          <p style={{ lineHeight: '1.8', color: '#666' }}>
            Our Gaushala network provides shelter, food, and medical care to abandoned and injured cows. 
            Each Gaushala operates its own store selling pure, organic cow-based products including milk, 
            ghee, butter, and traditional Ayurvedic products. By purchasing from our stores, you directly 
            support the welfare of these sacred animals.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;