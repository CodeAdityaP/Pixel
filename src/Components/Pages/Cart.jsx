import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.error('Item Removed From Cart');
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.info('Quantity increased');
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.info('Quantity decreased');
  };

  const totalPrice = cart.reduce((acc, item) => {
    const price = parseFloat(item.price.toString().replace(/[^0-9.-]+/g, "")) || 0;
    return acc + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Product</th>
                <th></th>
                <th>Price</th>
                <th style={{ width: '150px' }}>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>
                    <Link to={`/product/${item.id}`}>
                      {item.Productname}
                    </Link>
                  </td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.Productname}
                      style={{
                        width: 75,
                        height: 75,
                        objectFit: 'cover',
                        borderRadius: 5
                      }}
                    />
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <button className="btn btn-light btn-sm me-1" onClick={() => decreaseQuantity(item.id)}>-</button>
                    {item.quantity}
                    <button className="btn btn-light btn-sm ms-1" onClick={() => increaseQuantity(item.id)}>+</button>
                  </td>
                  <td>${(parseFloat(item.price.toString().replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end fw-bold fs-5 mb-3">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
          <div className="d-flex justify-content-end">
            <button
              onClick={handleCheckout}
              className="btn btn-dark btn-lg"
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
