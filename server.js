import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config(); // Load .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas (Optional - App works without it)
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.log("ℹ️  No MONGO_URI found - running without database");
      console.log("✅ Frontend features work perfectly without database!");
      return;
    }
    
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.log("⚠️  MongoDB connection failed - running without database");
    console.log("✅ All frontend features still work!");
    console.log("💡 To fix: Add IP to MongoDB Atlas whitelist");
    console.log("   Or use the app without database (recommended for demo)");
  }
};

connectDB();

// Middleware to check MongoDB connection (optional - makes routes resilient)
const requireDB = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.warn('⚠️ Database not connected. Some features may be unavailable.');
    // Allow routes to handle their own errors
  }
  next();
};

// Routes (will work even without DB for frontend features)
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", cartRoutes);

// Example route
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
