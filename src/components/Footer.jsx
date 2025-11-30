import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>About Us</h5>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, perspiciatis?</p>
          </div>
          <div className="col-md-2 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-white-50 text-decoration-none">Products</Link></li>
              <li><Link to="/about" className="text-white-50 text-decoration-none">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><a href="#faq" className="text-white-50 text-decoration-none">FAQ</a></li>
              <li><a href="#shipping" className="text-white-50 text-decoration-none">Shipping Info</a></li>
              <li><a href="#returns" className="text-white-50 text-decoration-none">Returns</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li> Email: x@store.com</li>
              <li> Phone: 0100000000</li>
              <li> Address: Beni suief</li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">© 2025 Online Store. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="#privacy" className="text-white-50 text-decoration-none me-3">Privacy Policy</a>
            <a href="#terms" className="text-white-50 text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;