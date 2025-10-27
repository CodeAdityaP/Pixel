# Database Setup Guide

## Quick Start

### Option 1: MongoDB Atlas (Recommended - FREE)

1. **Create Account**: https://www.mongodb.com/cloud/atlas/register
2. **Create Free Cluster**: M0 Sandbox (Free Forever)
3. **Set up Database Access**:
   - Create username and password
   - Note them down!

4. **Network Access**:
   - Add IP Address: `0.0.0.0/0` (Allow from anywhere)
   - Or add your specific IP

5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy the connection string

6. **Add to .env file**:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pixel
   ```

### Option 2: Run Without Database

The app works **WITHOUT database** for:
- ✅ Browsing products
- ✅ Adding to cart
- ✅ Wishlist
- ✅ Product search

Just skip the database setup!

---

## Create .env File

In your project root, create a file named `.env`:

```env
# MongoDB Connection (Required for user accounts and orders)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pixel

# JWT Secret (Required for authentication)
JWT_SECRET=your_random_secret_key_here

# Server Port
PORT=5000
```

---

## Run the Application

```bash
# Start backend server
npm run server

# In another terminal, start frontend
npm run dev
```

---

## Troubleshooting

If you see "Database not connected":
- Check if .env file exists
- Verify MONGO_URI in .env file
- Check MongoDB Atlas cluster status
- Verify IP is whitelisted in MongoDB Atlas

For more help, see `MONGODB_TROUBLESHOOTING.md`
