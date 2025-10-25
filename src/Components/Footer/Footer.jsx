import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4">
            <h5 className="text-white mb-2">PIXEL</h5>
            <p className="text-white-50 small mb-2">
              Premium gaming gear for epic gamers.
            </p>
            <div className="d-flex gap-2">
              <a href="#" className="text-white">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h6 className="text-white mb-2">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white-50 text-decoration-none small">Home</Link></li>
              <li><Link to="/shop" className="text-white-50 text-decoration-none small">Shop</Link></li>
              <li><Link to="/about" className="text-white-50 text-decoration-none small">About</Link></li>
              <li><Link to="/cart" className="text-white-50 text-decoration-none small">Cart</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3">
            <h6 className="text-white mb-2">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50 text-decoration-none small">Contact</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none small">Shipping</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none small">Returns</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none small">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-3">
            <h6 className="text-white mb-2">Newsletter</h6>
            <div className="input-group input-group-sm">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Email"
                style={{ fontSize: '0.8rem' }}
              />
              <button className="btn btn-primary btn-sm" type="button">
                <i className="bi bi-envelope"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <hr className="my-3 border-secondary" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-white-50 small mb-0">
              © 2025 Pixel Gaming Store. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end gap-3">
              <a href="#" className="text-white-50 text-decoration-none small">Privacy</a>
              <a href="#" className="text-white-50 text-decoration-none small">Terms</a>
              <a href="#" className="text-white-50 text-decoration-none small">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
