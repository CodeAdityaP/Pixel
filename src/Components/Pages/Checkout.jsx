import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Checkout() {
  const [cart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const total = cart.reduce(
    (sum, item) => sum + (item.quantity || 1) * parseFloat(item.price.replace(/[^0-9.]/g, '')),
    0
  );

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const placeOrder = (e) => {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
      setPlacing(false);
      setDone(true);
    }, 1500);
  };

  if (done)
    return (
      <div className="container my-5 py-5 text-center">
        <h2 className="mb-4 fw-bold">Thank You for Your Order!</h2>
        <p>Your purchase has been placed. We’ll email confirmation soon.</p>
        <Link to="/" className="btn btn-dark mt-3">Continue Shopping</Link>
      </div>
    );

  if (cart.length === 0)
    return (
      <div className="container my-5 py-5 text-center">
        <h3>Your cart is empty.</h3>
        <Link to="/shop" className="btn btn-dark mt-4">Go to Shop</Link>
      </div>
    );

  return (
    <div className="container my-5 py-4" style={{maxWidth: "900px"}}>
      <h2 className="fw-bold mb-4 text-center">Checkout</h2>
      <div className="row g-5">
        <div className="col-md-6">
          <h5 className="mb-3">Shipping Details</h5>
          <form onSubmit={placeOrder} autoComplete="off">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input name="name" required className="form-control"
                     value={form.name} onChange={handleChange} autoComplete="name"/>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" required className="form-control"
                     value={form.email} onChange={handleChange} autoComplete="email"/>
            </div>
            <div className="mb-3">
              <label className="form-label">Shipping Address</label>
              <textarea name="address" required className="form-control"
                        rows={3} value={form.address} onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-dark w-100" disabled={placing}>
              {placing ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
        <div className="col-md-6 bg-light rounded-3 p-4">
          <h5 className="mb-3">Order Summary</h5>
          <ul className="list-group mb-3">
            {cart.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-semibold">{item.Productname}</span>
                  <span className="text-muted"> x {item.quantity || 1}</span>
                </div>
                <span>
                  {(item.price)} 
                </span>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between mb-1">
            <span className="fw-bold">Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="d-flex justify-content-between fs-5">
            <span className="fw-bold">Total</span>
            <span className="fw-bold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
