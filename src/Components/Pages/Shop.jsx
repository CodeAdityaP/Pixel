import React from 'react';
import Products from '../../Products.json';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const images = {
  "pro-1-1.webp": new URL("../../assets/Images/pro-1-1.webp", import.meta.url).href,
  "pro-2-1.webp": new URL("../../assets/Images/pro-2-1.webp", import.meta.url).href,
  "pro-2.webp": new URL("../../assets/Images/pro-2.webp", import.meta.url).href,
  "pro-3-1.webp": new URL("../../assets/Images/pro-3-1.webp", import.meta.url).href,
  "pro-3.webp": new URL("../../assets/Images/pro-3.webp", import.meta.url).href,
  // ...add all needed
};

const getImg = (imgPath) => {
  if (!imgPath) return "";
  const fileName = imgPath.split('/').pop();
  return images[fileName] || "";
};

function Shop() {
  const addToWishlist = (product) => {
    const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!existing.some(p => p.id === product.id)) {
      const updated = [...existing, product];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      window.dispatchEvent(new Event('wishlistUpdated'));
      toast.success(`${product.Productname} added to your wishlist`);
    } else {
      toast.info(`${product.Productname} is already in your wishlist`);
    }
  };

  const addToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem('cart')) || [];
    if (!existing.some(p => p.id === product.id)) {
      const updated = [...existing, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updated));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success(`${product.Productname} added to your cart`);
    } else {
      toast.info(`${product.Productname} is already in your cart`);
    }
  };

  return (
    <div className="container my-5" style={{ paddingTop: 120 }}>
      <h2 className="fw-semibold fs-1 text-center mb-5">Shop</h2>
      <div className="row justify-content-center">
        {Products.map(product => {
          const img1 = getImg(product.image);
          const img2 = getImg(product.secondimage);

          return (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch">
              <div className="card h-100 w-100" style={{ position: "relative", overflow: "hidden" }}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ position: "relative", height: 200 }}>
                    {img1 ? (
                      <img
                        src={img1}
                        alt={product.Productname}
                        style={{
                          objectFit: "cover", width: "100%", height: "200px", transition: "0.3s"
                        }}
                        onError={e => (e.currentTarget.style.visibility = 'hidden')}
                      />
                    ) : (
                      <div style={{ height: 200, background: "#eee", width: "100%" }}></div>
                    )}
                    {img2 && (
                      <img
                        src={img2}
                        alt=""
                        style={{
                          objectFit: "cover", width: "100%", height: "200px",
                          position: "absolute", left: 0, top: 0, opacity: 0,
                          transition: "opacity 0.3s"
                        }}
                        className="hover-img"
                        onMouseOver={e => e.currentTarget.style.opacity = 1}
                        onMouseOut={e => e.currentTarget.style.opacity = 0}
                        onError={e => (e.currentTarget.style.visibility = 'hidden')}
                      />
                    )}
                    {product.tags && (
                      <span className="badge bg-success"
                        style={{
                          position: 'absolute', top: 10, right: 10, fontSize: '1rem'
                        }}>{product.tags}</span>
                    )}
                  </div>
                </Link>
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                    <h5 className="card-title fw-bold">{product.Productname}</h5>
                  </Link>
                  <p className="card-text mb-3">{product.price}</p>
                  <div>
                    <button className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => addToWishlist(product)}
                      title="Add to Wishlist">
                      <i className="bi bi-heart"></i>
                    </button>
                    <button className="btn btn-success btn-sm"
                      onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;
