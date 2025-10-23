import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setWishlist(storedWishlist);
    setCart(storedCart);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
    toast.error('Item Removed From Wishlist');
  };

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success(`${product.Productname} Added to Your Cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      {/* Always visible breadcrumb */}
      <div
        style={{
          background: "#eee",
          width: "100vw",
          textAlign: "center",
          padding: "20px 0",
          fontSize: "20px",
          color: "#444",
          position: "relative",
          zIndex: 10000,
        }}
      >
        <span>
          <Link to="/" style={{
            color: "#888",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 20
          }}>Home</Link>
        </span>
        <span style={{ margin: "0 20px", color: "#aaa", fontWeight: 700, fontSize: 22 }}>—</span>
        <span style={{
          fontWeight: 700,
          color: "#222",
          borderBottom: "2px solid #888",
          fontSize: 20,
          paddingLeft: '8px'
        }}>Wishlist</span>
      </div>

      {/* Centered heading */}
      <div style={{ marginTop: 48, textAlign: "center" }}>
        <span style={{ fontSize: 40, marginRight: 12, verticalAlign: "middle" }}>❤️</span>
        <span style={{ fontWeight: "bold", fontSize: 36, verticalAlign: "middle" }}>Your Wishlist</span>
      </div>

      <div className="container my-5">
        {wishlist.length === 0 ? (
          <p className="text-center">Your wishlist is empty.</p>
        ) : (
          <div className="row">
            {wishlist.map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card">
                  <img src={product.image} alt={product.Productname} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{product.Productname}</h5>
                    <p className="card-text">{product.price}</p>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;
