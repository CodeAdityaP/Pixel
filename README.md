# Pixel - E-commerce Platform

A full-stack e-commerce platform built with React, Express, and MongoDB. This project includes both a modern frontend for shopping and a robust backend API for managing products, orders, users, cart, and wishlist.

## Features

- 🛍️ **Product Catalog**: Browse and search products with detailed views
- 🛒 **Shopping Cart**: Add items to cart with quantity management
- ❤️ **Wishlist**: Save favorite products for later
- 👤 **User Authentication**: Register and login functionality
- 📦 **Order Management**: Place and track orders
- 🎨 **Modern UI**: Built with Bootstrap and React
- 🔒 **Secure Backend**: JWT-based authentication

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Bootstrap 5
- React Toastify
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

```
Pixel/
├── src/                      # Frontend React code
│   ├── Components/          # React components
│   │   ├── Pages/          # Page components
│   │   ├── Nav/            # Navigation component
│   │   └── Footer/         # Footer component
│   ├── contexts/           # React contexts (Auth)
│   └── assets/             # Static assets
├── models/                 # MongoDB models
├── routes/                 # Express routes
├── scripts/               # Utility scripts
├── public/                # Static files
└── server.js              # Express server entry point
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeAdityaP/Pixel.git
   cd Pixel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Populate the database (optional)**
   ```bash
   npm run populate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Available Scripts

- `npm run dev` - Start Vite development server (frontend)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run populate` - Populate database with sample products
- `npm run lint` - Run ESLint

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API endpoints.

## Cart & Wishlist Guide

See [CART_WISHLIST_GUIDE.md](./CART_WISHLIST_GUIDE.md) for implementation details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

See [LICENSE](./LICENSE) file for details.

## Author

[Your Name](https://github.com/CodeAdityaP)
