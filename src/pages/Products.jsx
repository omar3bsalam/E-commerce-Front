import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll(filters);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Filters</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search product"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="sports">Sports & Fitness</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Price Range</label>
                <div className="row g-2">
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Sort By</label>
                <select
                  className="form-select"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price">Price (Low to High)</option>
                  <option value="-price">Price (High to Low)</option>
                  <option value="createdAt">Newest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Products</h2>
            <span className="text-muted">Showing {products.length} products</span>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {products.map(product => (
                <div key={product._id} className="col-lg-4 col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img 
                      src={product.featuredImage || '/api/placeholder/300/200'} 
                      className="card-img-top" 
                      alt={product.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <span className="badge bg-primary mb-2">{product.category}</span>
                      <h6 className="card-title">{product.name}</h6>
                      <p className="card-text text-muted small">
                        {product.description.substring(0, 80)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h6 text-primary mb-0">${product.price}</span>
                        {product.averageRating > 0 && (
                          <small className="text-warning">⭐ {product.averageRating.toFixed(1)}</small>
                        )}
                      </div>
                    </div>
                    <div className="card-footer bg-white">
                      <Link to={`/product/${product._id}`} className="btn btn-primary btn-sm w-100">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-5">
              <h4 className="text-muted">No products found</h4>
              <p className="text-muted">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;