# Fix MongoDB Connection

## Your Current Issue:

Your `.env` file has the MongoDB connection string, but it's missing the database name.

## Simple Fix:

Open your `.env` file and change this:

```
MONGO_URI=mongodb+srv://panditaditya855_db_user:XeWNqvqhLYb0eLDf@pixel-backend.swzsczr.mongodb.net/?appName=Pixel-Backend
```

To this (add database name):

```
MONGO_URI=mongodb+srv://panditaditya855_db_user:XeWNqvqhLYb0eLDf@pixel-backend.swzsczr.mongodb.net/pixel?appName=Pixel-Backend
```

Notice the `/pixel` before the `?` - this is the database name!

## After Fixing:

1. Save the `.env` file
2. Restart the server: `npm run server`
3. You should see: "✅ Connected to MongoDB Atlas"

## OR - Run Without Database:

If you just want to run the frontend:

```bash
npm run dev
```

No database needed for:
- Shopping cart
- Wishlist  
- Product browsing
- Checkout (simulated orders)

---

**The app is running!** Check your browser at `http://localhost:5173`
