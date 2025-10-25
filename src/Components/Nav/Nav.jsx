import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Nav() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    setCartCount(totalCartItems);
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts();
    const handleCartUpdate = () => updateCounts();
    const handleWishlistUpdate = () => updateCounts();
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const isActive = (route) => location.pathname === route;

  return (
    <>
      <div className="nav w-100 fixed-top bg-white shadow-sm">
        <nav className="navbar navbar-expand-lg py-3 justify-content-between align-items-lg-center w-100 nav-wrapper">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Mobile Logo */}
          <Link to="/" className="navbar-brand mx-auto order-0 d-lg-none d-flex">
            <h2 className="m-0 fw-bold" style={{ letterSpacing: '2px' }}>
              PIXEL
            </h2>
          </Link>

          {/* Mobile Icons */}
          <ul className="d-lg-none d-flex align-items-center gap-3">
            <li className="nav-item">
              <a href="#" data-bs-toggle="modal" data-bs-target="#searchModal">
                <i className="bi bi-search fs-5 text-dark"></i>
              </a>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <div className="dropdown">
                  <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i className="bi bi-person fs-5 text-dark"></i>
                    <span className="ms-1">{user?.name}</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">
                  <i className="bi bi-person fs-5 text-dark"></i>
                </Link>
              )}
            </li>
            <li className="nav-item position-relative">
              <Link to="/wishlist" className={isActive('/wishlist') ? "active" : ""}>
                <i className={`bi bi-heart fs-5 text-dark${isActive('/wishlist') ? " text-success" : ""}`}></i>
                <span className="position-absolute top-0 start-100 translate-middle cart-count rounded-pill">
                  {wishlistCount}
                </span>
              </Link>
            </li>
            <li className="nav-item position-relative">
              <Link to="/cart" className={isActive('/cart') ? "active" : ""}>
                <i className={`bi bi-bag fs-5 text-dark${isActive('/cart') ? " text-success" : ""}`}></i>
                <span className="position-absolute top-0 start-100 translate-middle cart-count rounded-pill">
                  {cartCount}
                </span>
              </Link>
            </li>
          </ul>

          {/* Desktop/Main Nav */}
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav nav-menu align-items-center gap-4">
              <li className="nav-item">
                <Link to="/" className={`nav-link text-dark fw-medium${isActive('/') ? " active" : ""}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link text-dark fw-medium${isActive('/about') ? " active" : ""}`}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop" className={`nav-link text-dark fw-medium${isActive('/shop') ? " active" : ""}`}>
                  Shop
                </Link>
              </li>
            </ul>

            <Link to="/" className="navbar-brand order-0 d-none d-lg-flex">
              <h2 className="m-0 fw-bold" style={{ letterSpacing: '2px' }}>
                PIXEL
              </h2>
            </Link>

            <ul className="navbar-nav d-none d-lg-flex align-items-center gap-4">
              <li className="nav-item">
                <a href="#" data-bs-toggle="modal" data-bs-target="#searchModal">
                  <i className="bi bi-search fs-5 text-dark"></i>
                </a>
              </li>
              <li className="nav-item">
                {isAuthenticated ? (
                  <div className="dropdown">
                    <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      <i className="bi bi-person fs-5 text-dark"></i>
                      <span className="ms-1">{user?.name}</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/login">
                    <i className="bi bi-person fs-5 text-dark"></i>
                  </Link>
                )}
              </li>
              <li className="nav-item position-relative">
                <Link to="/wishlist" className={isActive('/wishlist') ? "active" : ""}>
                  <i className={`bi bi-heart fs-5 text-dark${isActive('/wishlist') ? " text-success" : ""}`}></i>
                  <span className="position-absolute top-0 start-100 translate-middle cart-count rounded-pill">
                    {wishlistCount}
                  </span>
                </Link>
              </li>
              <li className="nav-item position-relative">
                <Link to="/cart" className={isActive('/cart') ? "active" : ""}>
                  <i className={`bi bi-bag fs-5 text-dark${isActive('/cart') ? " text-success" : ""}`}></i>
                  <span className="position-absolute top-0 start-100 translate-middle cart-count rounded-pill">
                    {cartCount}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* Make sure modal HTML for signupModal, loginModal, searchModal is present in App.jsx */}
    </>
  );
}

export default Nav;
