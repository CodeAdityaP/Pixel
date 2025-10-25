// Test script for cart and wishlist functionality
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';

// Test user credentials (you'll need to register this user first)
const testUser = {
  email: 'panditaditya855@gmail.com',
  password: 'yourpassword'
};

// Test product ID (you'll need to get this from your products)
const testProductId = 'your-product-id-here';

async function testCartAndWishlist() {
  try {
    console.log('🧪 Testing Cart and Wishlist Functionality...\n');

    // Step 1: Login to get token
    console.log('1. Logging in user...');
    const loginResponse = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    
    const loginData = await loginResponse.json();
    const token = loginData.token;
    
    if (!token) {
      console.log('❌ Login failed:', loginData.message);
      return;
    }
    
    console.log('✅ Login successful\n');

    // Step 2: Add item to cart
    console.log('2. Adding item to cart...');
    const addToCartResponse = await fetch(`${BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: testProductId,
        quantity: 2
      })
    });
    
    const cartData = await addToCartResponse.json();
    console.log('✅ Cart response:', cartData.message);
    console.log('📦 Cart items:', cartData.cart?.length || 0, 'items\n');

    // Step 3: Add item to wishlist
    console.log('3. Adding item to wishlist...');
    const addToWishlistResponse = await fetch(`${BASE_URL}/wishlist/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: testProductId
      })
    });
    
    const wishlistData = await addToWishlistResponse.json();
    console.log('✅ Wishlist response:', wishlistData.message);
    console.log('❤️ Wishlist items:', wishlistData.wishlist?.length || 0, 'items\n');

    // Step 4: Get user's cart
    console.log('4. Fetching user cart...');
    const getCartResponse = await fetch(`${BASE_URL}/cart`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const userCart = await getCartResponse.json();
    console.log('📦 User cart:', userCart.cart?.length || 0, 'items\n');

    // Step 5: Get user's wishlist
    console.log('5. Fetching user wishlist...');
    const getWishlistResponse = await fetch(`${BASE_URL}/wishlist`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const userWishlist = await getWishlistResponse.json();
    console.log('❤️ User wishlist:', userWishlist.wishlist?.length || 0, 'items\n');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testCartAndWishlist();
