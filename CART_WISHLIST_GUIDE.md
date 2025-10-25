# Cart and Wishlist API Guide

## Overview
Your e-commerce application has a complete cart and wishlist system that allows users to:
- Add/remove products from cart
- Update cart item quantities
- Add/remove products from wishlist
- Sync cart and wishlist with user accounts

## API Endpoints

### Cart Operations

#### 1. Get User's Cart
```javascript
GET /api/cart
Headers: Authorization: Bearer <token>
Response: { cart: [...] }
```

#### 2. Add Item to Cart
```javascript
POST /api/cart/add
Headers: Authorization: Bearer <token>
Body: { productId: "product-id", quantity: 2 }
Response: { message: "Item added to cart", cart: [...] }
```

#### 3. Remove Item from Cart
```javascript
DELETE /api/cart/remove/:productId
Headers: Authorization: Bearer <token>
Response: { message: "Item removed from cart", cart: [...] }
```

#### 4. Update Cart Item Quantity
```javascript
PUT /api/cart/update/:productId
Headers: Authorization: Bearer <token>
Body: { quantity: 3 }
Response: { message: "Cart updated", cart: [...] }
```

#### 5. Clear Cart
```javascript
DELETE /api/cart/clear
Headers: Authorization: Bearer <token>
Response: { message: "Cart cleared", cart: [] }
```

### Wishlist Operations

#### 1. Get User's Wishlist
```javascript
GET /api/wishlist
Headers: Authorization: Bearer <token>
Response: { wishlist: [...] }
```

#### 2. Add Item to Wishlist
```javascript
POST /api/wishlist/add
Headers: Authorization: Bearer <token>
Body: { productId: "product-id" }
Response: { message: "Item added to wishlist", wishlist: [...] }
```

#### 3. Remove Item from Wishlist
```javascript
DELETE /api/wishlist/remove/:productId
Headers: Authorization: Bearer <token>
Response: { message: "Item removed from wishlist", wishlist: [...] }
```

## Frontend Integration

### React Component Example

```jsx
import { useState, useEffect } from 'react';

function ProductCard({ product }) {
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Add to cart
  const addToCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setIsInCart(true);
        // Update cart count in UI
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Add to wishlist
  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:5000/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.id
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setIsInWishlist(true);
        // Update wishlist count in UI
        window.dispatchEvent(new Event('wishlistUpdated'));
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.Productname} />
      <h3>{product.Productname}</h3>
      <p>{product.price}</p>
      
      <div className="product-actions">
        <button 
          onClick={addToCart}
          className={isInCart ? 'btn-success' : 'btn-primary'}
        >
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </button>
        
        <button 
          onClick={addToWishlist}
          className={isInWishlist ? 'btn-danger' : 'btn-outline'}
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}
```

### Cart Page Integration

```jsx
import { useState, useEffect } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      setCart(data.cart || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`http://localhost:5000/api/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      
      const data = await response.json();
      if (response.ok) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (response.ok) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) return <div>Loading cart...</div>;

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.product._id} className="cart-item">
              <img src={item.product.image} alt={item.product.Productname} />
              <div className="item-details">
                <h4>{item.product.Productname}</h4>
                <p>{item.product.price}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <button onClick={() => removeItem(item.product._id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Key Features

### ✅ What's Already Working

1. **User Authentication**: Cart and wishlist are tied to user accounts
2. **Product Management**: Full CRUD operations for cart and wishlist
3. **Quantity Management**: Update item quantities in cart
4. **Data Persistence**: Cart and wishlist data saved to MongoDB
5. **API Endpoints**: Complete REST API for all operations
6. **Error Handling**: Proper error responses and validation

### 🔧 How It Works

1. **User adds product to cart**: 
   - Frontend calls `POST /api/cart/add`
   - Backend adds product to user's cart array
   - Returns updated cart

2. **User adds product to wishlist**:
   - Frontend calls `POST /api/wishlist/add`
   - Backend adds product to user's wishlist array
   - Returns updated wishlist

3. **Data Structure**:
   ```javascript
   // User model includes:
   cart: [{
     product: ObjectId, // Reference to Product
     quantity: Number
   }],
   wishlist: [ObjectId] // Array of Product references
   ```

## Testing

Run the test script to verify everything works:
```bash
node test-cart-wishlist.js
```

Make sure to:
1. Update the test user credentials
2. Use a valid product ID
3. Have the server running on port 5000

## Next Steps

1. **Frontend Integration**: Connect your React components to these APIs
2. **Real-time Updates**: Add WebSocket support for live cart updates
3. **Guest Cart**: Implement localStorage for non-logged-in users
4. **Cart Persistence**: Sync guest cart with user account on login
5. **Analytics**: Track cart abandonment and wishlist conversion rates
