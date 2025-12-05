import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import "./Home.css"

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const productsResponse = await productsAPI.getAll({ limit: 6, sortBy: '-averageRating' });
      if (productsResponse.data.success) {
        setFeaturedProducts(productsResponse.data.data);
      }

      const categoriesData = [
        { name: 'Electronics', count: 4, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop' },
        { name: 'Fashion', count: 2, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop' },
        { name: 'Home & Kitchen', count: 2, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
        { name: 'Sports', count: 2, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop' },
        { name: 'Beauty', count: 2, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop' }
      ];
      setCategories(categoriesData);

    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="hero-s bg-primary text-white py-5 vh-100 " >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Welcome to EliteStore</h1>
              <p className="lead mb-4">
               Discover the best products at great prices and enjoy
                an easy and fast shopping experience that suits your lifestyle.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/products" className="btn btn-light btn-lg px-4">
                   Shop Now
                </Link>
                
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="position-relative">
                <div className="bg-white rounded p-4 text-dark shadow-lg">
                  <h3> Flash Sale!</h3>
                  <p className="mb-2">Up to 50% off on premium brands</p>
                  <small className="text-muted">Limited time offer</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h2 className="text-primary fw-bold">500+</h2>
                  <p className="text-muted mb-0">Premium Products</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h2 className="text-primary fw-bold">10K+</h2>
                  <p className="text-muted mb-0">Happy Customers</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h2 className="text-primary fw-bold">24/7</h2>
                  <p className="text-muted mb-0">Customer Support</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h2 className="text-primary fw-bold">100%</h2>
                  <p className="text-muted mb-0">Quality Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Shop by Category</h2>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div key={index} className="col-md-2 col-6">
                <Link 
                  to={`/products?category=${category.name.toLowerCase()}`}
                  className="text-decoration-none"
                >
                  <div className="card category-card border-0 shadow-sm h-100 text-center">
                    <img 
                      src={category.image} 
                      className="card-img-top" 
                      alt={category.name}
                      style={{ height: '120px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h6 className="card-title mb-1">{category.name}</h6>
                      <small className="text-muted">{category.count} products</small>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2>Featured Products</h2>
            <Link to="/products" className="btn btn-outline-primary">
              View All Products →
            </Link>
          </div>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {featuredProducts.map(product => (
                <div key={product._id} className="col-xl-4 col-md-6">
                  <div className="card product-card h-100 border-0 shadow-sm">
                    <div className="position-relative">
                      <img 
                        src={product.featuredImage} 
                        className="card-img-top" 
                        alt={product.name}
                        style={{ height: '250px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x300/007bff/ffffff?text=${encodeURIComponent(product.name)}`;
                        }}
                      />
                      <span className="position-absolute top-0 start-0 badge bg-primary m-2">
                        {product.category}
                      </span>
                      {product.comparePrice && product.comparePrice > product.price && (
                        <span className="position-absolute top-0 end-0 badge bg-danger m-2">
                          Save ${(product.comparePrice - product.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="card-body d-flex flex-column">
                      <div className="mb-2">
                        <small className="text-muted">{product.brand}</small>
                      </div>
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text text-muted flex-grow-1">
                        {product.description.substring(0, 100)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div>
                          <span className="h4 text-primary mb-0">${product.price}</span>
                          {product.comparePrice && (
                            <small className="text-muted text-decoration-line-through ms-2">
                              ${product.comparePrice}
                            </small>
                          )}
                        </div>
                        {product.averageRating > 0 && (
                          <div className="text-end">
                            <div className="text-warning small">
                              ⭐ {product.averageRating.toFixed(1)}
                            </div>
                            <small className="text-muted">({product.reviewCount})</small>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card-footer bg-white border-0 pt-0">
                      <Link 
                        to={`/product/${product._id}`} 
                        className="btn btn-primary w-100"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose EliteStore?</h2>
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="feature-icon bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '80px', height: '80px'}}>
                <span className="text-white fs-2"></span>
              </div>
              <h4>Free Shipping</h4>
              <p className="text-muted">Free delivery on orders over $50. Fast and reliable shipping worldwide.</p>
            </div>
            <div className="col-md-4 text-center">
              <div className="feature-icon bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                   style={{width: '80px', height: '80px'}}>
                <span className="text-white fs-2"></span>
              </div>
              <h4>Secure Payment</h4>
              <p className="text-muted">Your payments are safe with our encrypted payment processing system.</p>
            </div>
            <div className="col-md-4 text-center">
              <div className="feature-icon bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                   style={{width: '80px', height: '80px'}}>
                <span className="text-white fs-2"></span>
              </div>
              <h4>Easy Returns</h4>
              <p className="text-muted">30-day return policy. No questions asked for all our products.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;