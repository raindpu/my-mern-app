import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const updateQuantity = (productId, change) => {
    const newCart = cart.map(item => {
      if (item._id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean);
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (productId) => {
    const newCart = cart.filter(item => item._id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    const orderData = {
      gaushalaId: cart[0].gaushalaId,
      ...orderForm,
      items: cart.map(item => ({
        productId: item._id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: getTotalAmount()
    };

    try {
      await axios.post('/api/orders', orderData);
      alert('Order placed successfully!');
      setCart([]);
      localStorage.removeItem('cart');
      setShowCheckout(false);
      setOrderForm({ customerName: '', customerEmail: '', customerPhone: '', deliveryAddress: '' });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginBottom: '2rem' }}>Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', textAlign: 'center' }}>
          <h3>Your cart is empty</h3>
          <p style={{ color: '#666', margin: '1rem 0' }}>Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <div>
                  <h4>{item.name}</h4>
                  <p style={{ color: '#666' }}>₹{item.price}/{item.unit}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button onClick={() => updateQuantity(item._id, -1)} className="btn">-</button>
                  <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, 1)} className="btn">+</button>
                  <span style={{ fontWeight: 'bold', minWidth: '80px' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeItem(item._id)} style={{ background: '#dc3545' }} className="btn">Remove</button>
                </div>
              </div>
            ))}
            
            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '2px solid #eee' }}>
              <h3 style={{ textAlign: 'right', color: '#667eea' }}>Total: ₹{getTotalAmount().toFixed(2)}</h3>
            </div>
          </div>

          {!showCheckout ? (
            <button onClick={() => setShowCheckout(true)} className="btn" style={{ width: '100%', fontSize: '1.1rem' }}>
              Proceed to Checkout
            </button>
          ) : (
            <div style={{ background: 'white', padding: '2rem', borderRadius: '10px' }}>
              <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>Checkout</h2>
              <form onSubmit={handleSubmitOrder}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" required value={orderForm.customerName} onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" required value={orderForm.customerEmail} onChange={(e) => setOrderForm({...orderForm, customerEmail: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" required value={orderForm.customerPhone} onChange={(e) => setOrderForm({...orderForm, customerPhone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Delivery Address *</label>
                  <textarea required rows="3" value={orderForm.deliveryAddress} onChange={(e) => setOrderForm({...orderForm, deliveryAddress: e.target.value})}></textarea>
                </div>
                <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Place Order</button>
                <button type="button" onClick={() => setShowCheckout(false)} className="btn btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }}>Cancel</button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;