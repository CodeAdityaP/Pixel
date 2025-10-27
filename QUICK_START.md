# Quick Start Guide - No Database Required

## 🚀 Run the Application (Frontend Only)

The Pixel e-commerce application works **completely without a database** for all frontend features!

### What Works Without Database:

✅ **Product Browsing** - View all products  
✅ **Shopping Cart** - Add/remove items, manage quantities  
✅ **Wishlist** - Save favorite products  
✅ **Product Search** - Real-time search functionality  
✅ **Checkout Process** - Complete orders (stored locally)  
✅ **Payment Gateway** - Test mode payment options  

### What's Not Available Without Database:

❌ User authentication/accounts  
❌ Order history in database  
❌ User profiles  

---

## Quick Start (No Backend Required!)

### Option 1: Frontend Only

```bash
# Install dependencies (if not done already)
npm install

# Start the frontend
npm run dev
```

That's it! Open `http://localhost:5173` in your browser.

The app works using **localStorage** for:
- Shopping cart
- Wishlist  
- Order data

---

## What Happens During Checkout?

When you place an order **without database**:

1. ✅ Cart items are processed
2. ✅ Order number is generated (ORD-1234567890)
3. ✅ Cart is cleared
4. ✅ Success page is shown
5. ⚠️ Order is NOT saved to database (only exists in browser)

**Note:** Orders are simulated. Perfect for demos and testing!

---

## Features Summary

### Shopping Experience
- Browse products
- View product details
- Add to cart
- Add to wishlist
- Search products
- Manage cart quantities
- Complete checkout

### Payment Options
- Cash on Delivery
- Credit/Debit Card (Stripe Test Mode)

### Data Storage
- All data stored in browser localStorage
- Persists between sessions
- No server required

---

## Running Both Frontend and Backend

If you want full functionality (with database):

### Step 1: Start Backend
```bash
npm run server
```

### Step 2: Start Frontend (new terminal)
```bash
npm run dev
```

For database setup, see `README_DATABASE.md`

---

## Testing the Application

1. **Browse Products**: Navigate to `/shop`
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click cart icon in navbar
4. **Search**: Click search icon, type product name
5. **Checkout**: Go to cart, click "Proceed to Checkout"
6. **Complete Order**: Fill form and place order

---

## Troubleshooting

### Issue: Cart/Wishlist not persisting
- Check if localStorage is enabled in browser
- Clear browser cache if needed

### Issue: Images not showing
- Ensure images exist in `/public/Images/` folder
- Check image paths in `Products.json`

### Issue: Search not working
- Make sure you're on a route (not root path)
- Check browser console for errors

---

## That's It!

You're ready to use the Pixel e-commerce application. No database needed for basic features! 🎉

For questions or help, check:
- `README_DATABASE.md` - Database setup guide
- `MONGODB_TROUBLESHOOTING.md` - Troubleshooting MongoDB issues
- `README.md` - Main project documentation
