import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usersAPI } from '../services/api';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await usersAPI.getCart();
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await usersAPI.updateCart(productId, newQuantity);
      loadCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await usersAPI.removeFromCart(productId);
      loadCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const tax = calculateTotal() * 0.1;
  const shipping = calculateTotal() > 0 ? 0 : 0;
  const total = calculateTotal() + tax + shipping;

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h3 className="text-muted">Your cart is empty</h3>
          <p className="text-muted mb-4">Start shopping to add items to your cart</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cart.map(item => (
              <div key={item.product?._id} className="card mb-3">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img 
                        src={item.product?.featuredImage || '/api/placeholder/100/100'} 
                        alt={item.product?.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-4">
                      <h5 className="card-title">{item.product?.name}</h5>
                      <p className="text-muted mb-0">{item.product?.category}</p>
                    </div>
                    <div className="col-md-3">
                      <div className="input-group input-group-sm">
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={() => updateQuantity(item.product?._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input 
                          type="text" 
                          className="form-control text-center" 
                          value={item.quantity} 
                          readOnly
                        />
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={() => updateQuantity(item.product?._id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <h5 className="text-primary mb-0">${(item.product?.price * item.quantity).toFixed(2)}</h5>
                      <small className="text-muted">${item.product?.price} each</small>
                    </div>
                    <div className="col-md-1">
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeItem(item.product?._id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong className="text-primary">${total.toFixed(2)}</strong>
                </div>
                <Link to="/checkout" className="btn btn-primary w-100 btn-lg">
                  Proceed to Checkout
                </Link>
                <Link to="/products" className="btn btn-outline-secondary w-100 mt-2">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;