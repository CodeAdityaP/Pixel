import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Middleware to verify JWT token (optional for cart operations)
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    // For cart operations, we'll allow anonymous users
    req.userId = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // If token is invalid, continue as anonymous user
    req.userId = null;
    next();
  }
};

// Get user's cart
router.get('/cart', authenticateToken, async (req, res) => {
  try {
    if (!req.userId) {
      return res.json({ cart: [] });
    }

    const user = await User.findById(req.userId).populate('cart.product');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ cart: user.cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error while fetching cart' });
  }
});

// Add item to cart
router.post('/cart/add', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!req.userId) {
      return res.json({ 
        message: 'Please login to sync cart with server',
        cart: []
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.addToCart(productId, quantity);
    await user.populate('cart.product');

    res.json({
      message: 'Item added to cart',
      cart: user.cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error while adding to cart' });
  }
});

// Remove item from cart
router.delete('/cart/remove/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;

    if (!req.userId) {
      return res.json({ message: 'Please login to sync cart with server' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.removeFromCart(productId);
    await user.populate('cart.product');

    res.json({
      message: 'Item removed from cart',
      cart: user.cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error while removing from cart' });
  }
});

// Update cart item quantity
router.put('/cart/update/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!req.userId) {
      return res.json({ message: 'Please login to sync cart with server' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.updateCartQuantity(productId, quantity);
    await user.populate('cart.product');

    res.json({
      message: 'Cart updated',
      cart: user.cart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error while updating cart' });
  }
});

// Clear cart
router.delete('/cart/clear', authenticateToken, async (req, res) => {
  try {
    if (!req.userId) {
      return res.json({ message: 'Please login to sync cart with server' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.clearCart();

    res.json({
      message: 'Cart cleared',
      cart: []
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error while clearing cart' });
  }
});

// Get user's wishlist
router.get('/wishlist', authenticateToken, async (req, res) => {
  try {
    if (!req.userId) {
      return res.json({ wishlist: [] });
    }

    const user = await User.findById(req.userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ wishlist: user.wishlist });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error while fetching wishlist' });
  }
});

// Add item to wishlist
router.post('/wishlist/add', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.body;

    if (!req.userId) {
      return res.json({ 
        message: 'Please login to sync wishlist with server',
        wishlist: []
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.addToWishlist(productId);
    await user.populate('wishlist');

    res.json({
      message: 'Item added to wishlist',
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error while adding to wishlist' });
  }
});

// Remove item from wishlist
router.delete('/wishlist/remove/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;

    if (!req.userId) {
      return res.json({ message: 'Please login to sync wishlist with server' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.removeFromWishlist(productId);
    await user.populate('wishlist');

    res.json({
      message: 'Item removed from wishlist',
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error while removing from wishlist' });
  }
});

export default router;
