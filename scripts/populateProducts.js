import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const products = [
  {
    id: '1',
    Productname: 'Gaming Mouse Pro',
    price: '$29.99',
    image: '/assets/pi1.jpg',
    tags: 'New',
    description: 'High-precision gaming mouse with RGB lighting',
    category: 'gaming',
    inStock: true,
    stockQuantity: 50
  },
  {
    id: '2',
    Productname: 'Mechanical Keyboard',
    price: '$89.99',
    image: '/assets/pi2.jpg',
    tags: 'Sale',
    description: 'RGB mechanical keyboard with tactile switches',
    category: 'gaming',
    inStock: true,
    stockQuantity: 30
  },
  {
    id: '3',
    Productname: 'Gaming Headset',
    price: '$149.99',
    image: '/assets/pi3.webp',
    tags: 'New',
    description: '7.1 surround sound gaming headset',
    category: 'gaming',
    inStock: true,
    stockQuantity: 25
  },
  {
    id: '4',
    Productname: 'Gaming Monitor',
    price: '$299.99',
    image: '/assets/pi4.jpeg',
    tags: 'New',
    description: '144Hz 4K gaming monitor',
    category: 'gaming',
    inStock: true,
    stockQuantity: 15
  },
  {
    id: '5',
    Productname: 'Gaming Chair',
    price: '$199.99',
    image: '/assets/pi5.jpg',
    tags: 'Sale',
    description: 'Ergonomic gaming chair with lumbar support',
    category: 'gaming',
    inStock: true,
    stockQuantity: 20
  }
];

async function populateProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('✅ Products populated successfully');

    // Show count
    const count = await Product.countDocuments();
    console.log(`📊 Total products in database: ${count}`);

  } catch (error) {
    console.error('❌ Error populating products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

populateProducts();
