import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsAPI, usersAPI } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      if (response.data.success) {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await usersAPI.addToCart({
        productId: id,
        quantity: quantity
      });
      
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await usersAPI.addToCart({
        productId: id,
        quantity: quantity
      });
      
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>Product not found</h3>
        <Link to="/products" className="btn btn-primary mt-3">
          Back to Products
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [{ url: product.featuredImage, alt: product.name }];

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products" className="text-decoration-none">Products</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/products?category=${product.category}`} className="text-decoration-none">
              {product.category}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm mb-4">
            <img 
              src={images[activeImage].url} 
              className="card-img-top rounded" 
              alt={images[activeImage].alt}
              style={{ height: '400px', objectFit: 'contain', padding: '20px' }}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/500x400/007bff/ffffff?text=${encodeURIComponent(product.name)}`;
              }}
            />
          </div>
          
          {images.length > 1 && (
            <div className="d-flex gap-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  className={`img-thumbnail cursor-pointer ${activeImage === index ? 'border-primary' : ''}`}
                  alt={image.alt}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  onClick={() => setActiveImage(index)}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/80x80/007bff/ffffff?text=Img${index + 1}`;
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="col-md-6">
          <div className="d-flex flex-column h-100">
            <div className="mb-3">
              <span className="badge bg-primary mb-2">{product.category}</span>
              {product.brand && (
                <span className="badge bg-secondary mb-2 ms-2">{product.brand}</span>
              )}
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="badge bg-danger mb-2 ms-2">
                  Save ${(product.comparePrice - product.price).toFixed(2)}
                </span>
              )}
            </div>
          
            <h1 className="mb-3">{product.name}</h1>
            
            {product.averageRating > 0 && (
              <div className="mb-3">
                <span className="text-warning fs-5">⭐ {product.averageRating.toFixed(1)}</span>
                <small className="text-muted ms-2">({product.reviewCount} reviews)</small>
              </div>
            )}

            <div className="mb-4">
              {product.comparePrice && product.comparePrice > product.price ? (
                <div>
                  <h2 className="text-primary mb-1">${product.price}</h2>
                  <p className="text-muted mb-0">
                    <s>${product.comparePrice}</s> 
                    <span className="text-success ms-2 fs-6">
                      Save ${(product.comparePrice - product.price).toFixed(2)} ({Math.round((1 - product.price/product.comparePrice) * 100)}% off)
                    </span>
                  </p>
                </div>
              ) : (
                <h2 className="text-primary mb-0">${product.price}</h2>
              )}
            </div>

            <p className="mb-4 fs-6">{product.description}</p>

            {/* Inventory Status */}
            <div className="mb-4">
              {product.inventory.quantity > 0 ? (
                <span className="text-success fs-6"> In Stock ({product.inventory.quantity} available)</span>
              ) : product.inventory.allowOutOfStockPurchase ? (
                <span className="text-warning fs-6"> Out of Stock - Available for pre-order</span>
              ) : (
                <span className="text-danger fs-6"> Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="row mb-4">
              <div className="col-md-4">
                <label htmlFor="quantity" className="form-label fw-semibold">Quantity</label>
                <select 
                  id="quantity"
                  className="form-select"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  disabled={!product.inventory.quantity && !product.inventory.allowOutOfStockPurchase}
                >
                  {[...Array(Math.min(10, product.inventory.quantity || 1)).keys()].map(num => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-grid gap-2 d-md-flex mb-4">
              <button 
                className="btn btn-primary btn-lg flex-fill me-md-2"
                onClick={handleBuyNow}
                disabled={!product.inventory.quantity && !product.inventory.allowOutOfStockPurchase}
              >
                🛒 Buy Now
              </button>
              
              <button 
                className="btn btn-outline-primary btn-lg flex-fill"
                onClick={handleAddToCart}
                disabled={(!product.inventory.quantity && !product.inventory.allowOutOfStockPurchase) || addedToCart}
              >
                {addedToCart ? ' Added to Cart' : ' Add to Cart'}
              </button>
            </div>

            {addedToCart && (
              <div className="alert alert-success mb-4" role="alert">
                Product added to cart! <Link to="/cart" className="alert-link">View Cart</Link>
              </div>
            )}

            {/* Product Features */}
            <div className="mt-auto">
              <div className="row g-3">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <span className="text-success fs-4 me-2"></span>
                    <div>
                      <small className="fw-semibold">Free Shipping</small>
                      <br />
                      <small className="text-muted">On orders over $50</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <span className="text-warning fs-4 me-2"></span>
                    <div>
                      <small className="fw-semibold">30-Day Returns</small>
                      <br />
                      <small className="text-muted">No questions asked</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <span className="text-info fs-4 me-2"></span>
                    <div>
                      <small className="fw-semibold">Secure Payment</small>
                      <br />
                      <small className="text-muted">Encrypted checkout</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <span className="text-primary fs-4 me-2"></span>
                    <div>
                      <small className="fw-semibold">24/7 Support</small>
                      <br />
                      <small className="text-muted">Always here to help</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <ul className="nav nav-tabs" id="productTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab">
                    Product Details
                  </button>
                </li>
                {product.attributes && product.attributes.length > 0 && (
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="specs-tab" data-bs-toggle="tab" data-bs-target="#specs" type="button" role="tab">
                      Specifications
                    </button>
                  </li>
                )}
                {product.reviews && product.reviews.length > 0 && (
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab">
                      Reviews ({product.reviews.length})
                    </button>
                  </li>
                )}
              </ul>
              
              <div className="tab-content p-3" id="productTabsContent">
                <div className="tab-pane fade show active" id="details" role="tabpanel">
                  <h5>About this item</h5>
                  <p>{product.description}</p>
                  
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <h6>Key Features</h6>
                      <ul>
                        {product.attributes && product.attributes.slice(0, 4).map((attr, index) => (
                          <li key={index}>
                            <strong>{attr.name}:</strong> {attr.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6>Product Information</h6>
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <td><strong>SKU</strong></td>
                            <td>{product.sku || 'N/A'}</td>
                          </tr>
                          <tr>
                            <td><strong>Category</strong></td>
                            <td>{product.category}</td>
                          </tr>
                          {product.brand && (
                            <tr>
                              <td><strong>Brand</strong></td>
                              <td>{product.brand}</td>
                            </tr>
                          )}
                          {product.subcategory && (
                            <tr>
                              <td><strong>Subcategory</strong></td>
                              <td>{product.subcategory}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                {product.attributes && product.attributes.length > 0 && (
                  <div className="tab-pane fade" id="specs" role="tabpanel">
                    <h5>Technical Specifications</h5>
                    <table className="table">
                      <tbody>
                        {product.attributes.map((attr, index) => (
                          <tr key={index}>
                            <td style={{width: '30%'}}><strong>{attr.name}</strong></td>
                            <td>{attr.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {product.reviews && product.reviews.length > 0 && (
                  <div className="tab-pane fade" id="reviews" role="tabpanel">
                    <h5>Customer Reviews</h5>
                    <div className="row">
                      {product.reviews.map((review, index) => (
                        <div key={index} className="col-md-6 mb-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>{review.user?.name || 'Anonymous'}</strong>
                                <span className="text-warning">⭐ {review.rating}/5</span>
                              </div>
                              <p className="card-text">{review.comment}</p>
                              <small className="text-muted">
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <h4 className="mb-4">You May Also Like</h4>
          <div className="row">
            <div className="col-12 text-center">
              <Link to={`/products?category=${product.category}`} className="btn btn-outline-primary">
                View More {product.category} Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;