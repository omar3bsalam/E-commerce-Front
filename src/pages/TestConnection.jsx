import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

const TestConnection = () => {
  const [status, setStatus] = useState('testing');
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setStatus('testing');
      setMessage('Testing connection to backend...');
      
      const response = await productsAPI.getAll();
      console.log('API Response:', response);
      
      if (response.data.success) {
        setStatus('connected');
        setMessage(` Connected successfully! Found ${response.data.data.length} products`);
        setProducts(response.data.data);
      } else {
        setStatus('error');
        setMessage(' API returned error');
      }
    } catch (error) {
      setStatus('error');
      setMessage(` Connection failed: ${error.message}`);
      console.error('Full error:', error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">API Connection Test</h2>
      
      <div className={`alert alert-${status === 'connected' ? 'success' : status === 'error' ? 'danger' : 'warning'} text-center`}>
        <h4>Status: {status.toUpperCase()}</h4>
        <p className="mb-3">{message}</p>
        <button onClick={testConnection} className="btn btn-primary">
          Test Again
        </button>
      </div>

      {products.length > 0 && (
        <div className="mt-4">
          <h4>Products from API ({products.length}):</h4>
          <div className="row">
            {products.map(product => (
              <div key={product._id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h6>{product.name}</h6>
                    <p className="text-muted small">{product.category}</p>
                    <p className="text-primary">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <h5>Backend URLs to test:</h5>
        <ul>
          <li><a href="http://localhost:5001/api/health" target="_blank">Health Check</a></li>
          <li><a href="http://localhost:5001/api/products" target="_blank">Products API</a></li>
          <li><a href="http://localhost:5001/api/test-data" target="_blank">Test Data</a></li>
        </ul>
      </div>
    </div>
  );
};

export default TestConnection;