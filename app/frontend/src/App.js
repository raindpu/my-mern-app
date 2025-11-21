import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import GaushalaList from './pages/GaushalaList';
import GaushalaDetail from './pages/GaushalaDetail';
import CowList from './pages/CowList';
import Store from './pages/Store';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">🐄 Gaushala</Link>
            <ul className="nav-menu">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/gaushalas" className="nav-link">Gaushalas</Link></li>
              <li><Link to="/cows" className="nav-link">Cows</Link></li>
              <li><Link to="/cart" className="nav-link">🛒 Cart</Link></li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gaushalas" element={<GaushalaList />} />
          <Route path="/gaushala/:id" element={<GaushalaDetail />} />
          <Route path="/cows" element={<CowList />} />
          <Route path="/store/:gaushalaId" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;