import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Store() {
  const { gaushalaId } = useParams();
  const [gaushala, setGaushala] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStoreData();
    loadCart();
  }, [gaushalaId]);

  const fetchStoreData = async () => {
    try {
      const [gaushalaRes, productsRes] = await Promise.all([
        axios.get(`/api/gaushalas/${gaushalaId}`),
        axios.get(`/api/products?gaushalaId=${gaushalaId}`)
      ]);
      setGaushala(gaushalaRes.data);
      setProducts(productsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching store data:', error);
      setLoading(false);
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    alert('Product added to cart!');
  };

  if (loading) return <div className="container"><h2 style={{color: 'white'}}>Loading...</h2></div>;
  if (!gaushala) return <div className="container"><h2 style={{color: 'white'}}>Store not found</h2></div>;

  return (
    <div className="container">
      <div className="detail-container">
        <h1 style={{ color: '#667eea' }}>{gaushala.name} Store</h1>
        <p style={{ color: '#666', margin: '1rem 0' }}>Pure and organic cow-based products</p>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h4>{product.name}</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>{product.category}</p>
            <p className="price">₹{product.price}/{product.unit}</p>
            <p style={{ color: '#999', fontSize: '0.85rem' }}>Stock: {product.stock} {product.unit}</p>
            {product.description && (
              <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.5rem 0' }}>{product.description}</p>
            )}
            {product.available && product.stock > 0 ? (
              <button onClick={() => addToCart(product)} className="btn" style={{ marginTop: '0.5rem' }}>
                Add to Cart
              </button>
            ) : (
              <button disabled className="btn" style={{ marginTop: '0.5rem', opacity: 0.5 }}>
                Out of Stock
              </button>
            )}
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', textAlign: 'center', marginTop: '2rem' }}>
          <p>No products available in this store yet.</p>
        </div>
      )}
    </div>
  );
}

export default Store;