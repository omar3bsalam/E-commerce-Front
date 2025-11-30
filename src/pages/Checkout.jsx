import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI, usersAPI } from '../services/api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  
  const [shippingData, setShippingData] = useState({
    name: '',
    street: '',
    city: '',
    country: 'USA',
    zipCode: '',
    phone: ''
  });

  
  const [paymentData, setPaymentData] = useState({
    method: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await usersAPI.getCart();
      setCart(response.data.data || []);
    } catch (error) {
      console.error('Error loading cart:', error);
      setError('Failed to load cart');
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const calculateTax = (amount) => {
    return amount * 0.1;
  };

  const calculateShipping = () => {
    const total = calculateTotal();
    return total > 50 ? 0 : 5.99;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
  
      if (!shippingData.name || !shippingData.street || !shippingData.city || !shippingData.country) {
        throw new Error('Please fill in all required shipping fields');
      }

      if (cart.length === 0) {
        throw new Error('Your cart is empty');
      }

      const orderData = {
        items: cart.map(item => ({
          product: item.product?._id || item.product,
          quantity: item.quantity
        })),
        shippingAddress: shippingData,
        paymentMethod: paymentData.method,
        shippingMethod: 'standard',
        notes: 'Order from website'
      };

      console.log(' Sending order data:', orderData);

      const response = await ordersAPI.create(orderData);
      
      console.log(' Order created successfully:', response.data);
      
      navigate('/order-success', { 
        state: { 
          order: response.data.data,
          message: 'Order placed successfully!' 
        } 
      });

    } catch (error) {
      console.error(' Error creating order:', error);
      setError(error.response?.data?.message || error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart before checkout</p>
          <button 
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="checkout-content">
        <div className="checkout-form">
          <section className="form-section">
            <h2>Shipping Address</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={shippingData.name}
                  onChange={handleShippingChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="street">Street Address *</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={shippingData.street}
                  onChange={handleShippingChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingData.city}
                  onChange={handleShippingChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <select
                  id="country"
                  name="country"
                  value={shippingData.country}
                  onChange={handleShippingChange}
                  required
                >
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={shippingData.zipCode}
                  onChange={handleShippingChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={shippingData.phone}
                  onChange={handleShippingChange}
                />
              </div>
            </div>
          </section>
          <section className="form-section">
            <h2>Payment Method</h2>
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="method"
                  value="credit_card"
                  checked={paymentData.method === 'credit_card'}
                  onChange={handlePaymentChange}
                />
                Credit Card
              </label>
              
              <label className="payment-option">
                <input
                  type="radio"
                  name="method"
                  value="paypal"
                  checked={paymentData.method === 'paypal'}
                  onChange={handlePaymentChange}
                />
                PayPal
              </label>
              
              <label className="payment-option">
                <input
                  type="radio"
                  name="method"
                  value="cash_on_delivery"
                  checked={paymentData.method === 'cash_on_delivery'}
                  onChange={handlePaymentChange}
                />
                Cash on Delivery
              </label>
            </div>
          </section>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {cart.map((item, index) => (
              <div key={item._id || item.product?._id || `item-${index}`} className="order-item">
                <div className="item-image">
                  <img 
                    src={item.product?.featuredImage } 
                    alt={item.product?.name}
                  />
                </div>
                <div className="item-details">
                  <h4>{item.product?.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="item-price">
                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>${calculateShipping().toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Tax:</span>
              <span>${calculateTax(calculateTotal()).toFixed(2)}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total:</span>
              <span>${(calculateTotal() + calculateShipping() + calculateTax(calculateTotal())).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmitOrder}
            disabled={loading}
            className="btn-primary place-order-btn"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;