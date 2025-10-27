# MongoDB Connection Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: MONGO_URI not found

**Error:** "⚠️ MONGO_URI not found in environment variables"

**Solution:**
1. Create a `.env` file in the root directory
2. Add your MongoDB connection string:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pixel?retryWrites=true&w=majority
```

---

### Issue 2: MongoDB Atlas Connection Failed

**Error:** "❌ MongoDB connection error"

**Solutions:**

#### Step 1: Get Your Connection String
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

#### Step 2: Update .env File
Replace `<password>` with your actual password:
```env
MONGO_URI=mongodb+srv://username:YOUR_PASSWORD@cluster.mongodb.net/pixel
```

#### Step 3: Whitelist Your IP
1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Or add your specific IP address

#### Step 4: Check Database User
1. Go to "Database Access" in MongoDB Atlas
2. Ensure your database user exists
3. User must have "Read and write to any database" permission

---

### Issue 3: Local MongoDB

If you prefer to use local MongoDB:

```env
MONGO_URI=mongodb://localhost:27017/pixel
```

Make sure MongoDB is running locally:
```bash
mongod
```

---

### Issue 4: Connection Timeout

**Error:** "Timeout"

**Solutions:**
1. Check your internet connection
2. Verify MongoDB Atlas cluster is running
3. Check firewall settings
4. Try connection string without authentication for testing

---

## Quick Start - No Database Required

The application will work **without database** for frontend features:

✅ Product browsing  
✅ Shopping cart (uses localStorage)  
✅ Wishlist (uses localStorage)  
✅ Product search  

❌ User authentication  
❌ Order history  
❌ User profiles  

---

## Testing Connection

Run the server:
```bash
npm run server
```

You should see:
- ✅ "Connected to MongoDB Atlas" (if connection successful)
- ⚠️ Warning message (if .env missing)
- ❌ Error message (with troubleshooting tips)

---

## Sample .env File

Create `.env` in your project root:

```env
# MongoDB Connection
MONGO_URI=your_connection_string_here

# JWT Secret
JWT_SECRET=your_secret_key_here

# Server Port
PORT=5000

# Stripe Keys (Optional - for payment)
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## MongoDB Atlas Free Setup

1. Sign up at https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster (M0 Sandbox)
3. Choose your cloud provider and region
4. Wait for cluster to provision (5-10 minutes)
5. Create database user
6. Whitelist IP address (0.0.0.0/0 for anywhere)
7. Get connection string
8. Add to .env file

---

## Need Help?

1. Check server logs for detailed error messages
2. Verify .env file exists and has correct format
3. Test connection string in MongoDB Compass
4. Check MongoDB Atlas dashboard for cluster status
