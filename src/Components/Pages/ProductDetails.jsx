import React, { useEffect, useState } from 'react';
import Products from './../../Products.json';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = Products.find(p => String(p.id) === String(id));
  const colors = product?.colors || ['#000', '#fff'];

  const [mainImage, setMainImage] = useState('');
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (product) {
      setMainImage(product.image || '');
      setImages([product.image].filter(Boolean));
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container my-5">
        <p className="text-danger">Product not found.</p>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  // --- Cart Management ---
  const addToCart = () => {
    const existing = JSON.parse(localStorage.getItem('cart')) || [];
    const found = existing.find(p => String(p.id) === String(product.id));
    if (found) {
      // Update quantity if adding again
      found.quantity = (found.quantity || 1) + quantity;
      localStorage.setItem('cart', JSON.stringify([...existing]));
      toast.info('Quantity updated in cart');
    } else {
      const withQty = { ...product, quantity };
      localStorage.setItem('cart', JSON.stringify([...existing, withQty]));
      toast.success(`${product.Productname} added to cart`);
    }
    window.dispatchEvent(new Event('cartUpdated'));
  }

  const handleBuyNow = () => {
    addToCart();
    navigate('/cart');
  }

  return (
    <>
      <ol className="section-banner py-3 position-relative">
        <li className="position-relative"><Link to="/">Home</Link></li>
        <li className="position-relative active"><span className="ps-5">Gaming & Performance</span></li>
        <li className="position-relative active"><span className="ps-5">{product.Productname}</span></li>
      </ol>
      <div className="container py-5">
        <div className="row">
          <div className="col-xl-6">
            <div className="d-flex flex-column-reverse flex-md-row mb-4">
              <div className="d-flex flex-column me-3 thumbnail-images">
                {images.map((img, idx) =>
                  img ? (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      onClick={() => setMainImage(img)}
                      className={`img-thumbnail${mainImage === img ? ' border-dark' : ''}`}
                      style={{ width: 60, height: 60, objectFit: 'cover', cursor: 'pointer' }}
                    />
                  ) : null
                )}
              </div>
              <div>
                {mainImage && (
                  <img src={mainImage} alt="" className="img-fluid" />
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <h5 className="fw-bold">{product.Productname}</h5>
            <h2 className="mb-4 fw-semibold">{product.Productname}</h2>
            <div className="d-flex gap-2 mb-4">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: color,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                  }}
                ></div>
              ))}
            </div>
            <p className="fw-semibold mb-1">Quantity</p>
            <div className="d-flex align-items-center gap-3 mb-4 quantity">
              <div className="d-flex align-items-center Quantity-box" style={{ maxWidth: '200px' }}>
                <button
                  className="btn-count border-0"
                  onClick={() => setQuantity(q => Math.max(q - 1, 1))}
                >-</button>
                <span className="mx-2">{quantity}</span>
                <button
                  className="btn-count border-0"
                  onClick={() => setQuantity(q => Math.min(q + 1, 99))}
                >+</button>
              </div>
            </div>
            <button className="btn-custome w-100 mb-2" onClick={addToCart}>Add to Cart</button>
            <button className="btn-custome2 w-100 border-0" onClick={handleBuyNow}>Buy Now</button>
            <hr />
            <p><strong>Vendor:</strong> Pixel.Inc</p>
            <p><strong>Collections:</strong> Gaming & Performance, Featured, New Arrival, Bestseller</p>
            <p><strong>SKU:</strong> 501</p>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <ul className="nav nav-tabs border-0 justify-content-center mb-4" id='productTab' role='tablist'>
          <li className="nav-item" role='presentation'>
            <button
              className={`nav-link tab border-0 fw-bold fs-4 text-capitalize${activeTab === 'description' ? ' active' : ''}`}
              id='description-tab'
              data-bs-toggle="tab"
              data-bs-target="#description"
              type="button"
              onClick={() => setActiveTab('description')}
              aria-selected={activeTab === 'description'}
              aria-controls="description"
              tabIndex={0}
            >
              Description
            </button>
          </li>
          <li className="nav-item" role='presentation'>
            <button
              className={`nav-link tab border-0 fw-bold fs-4 text-capitalize${activeTab === 'shipping' ? ' active' : ''}`}
              id='shipping-tab'
              data-bs-toggle="tab"
              data-bs-target="#shipping"
              type="button"
              onClick={() => setActiveTab('shipping')}
              aria-selected={activeTab === 'shipping'}
              aria-controls="shipping"
              tabIndex={0}
            >
              Shipping and Return
            </button>
          </li>
        </ul>
        <div className="tab-content" id='productTabcontent'>
          <div className={`tab-pane${activeTab === 'description' ? ' show active' : ' fade'}`} id='description' role='tabpanel'>
            <p><strong>For Those Who Dare</strong></p>
            <p>Built to enhance performance for those extra kills</p>
            <h5 className="mt-4">Features</h5>
            <ul className="Features-list">
              <li className="position-relative">Optical Switches for ultra-fast response and durability</li>
              <li className="position-relative">Multi-function media knob and hotkeys</li>
              <li className="position-relative">Per-key RGB backlighting (Aura Sync)</li>
              <li className="position-relative">Durable PBT doubleshot or UV-coated ABS keycaps</li>
              <li className="position-relative">Detachable wrist rest and three tilt angles for comfort.</li>
            </ul>
          </div>
          <div className={`tab-pane${activeTab === 'shipping' ? ' show active' : ' fade'}`} id='shipping' role='tabpanel'>
            <p>We typically process and ship orders within 1 week</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
