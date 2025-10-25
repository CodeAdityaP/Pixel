# Pixel Store API Documentation

## Environment Variables Required

Create a `.env` file in your project root with the following variables:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pixel-store?retryWrites=true&w=majority

# JWT Secret Key (use a strong, random string in production)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

## API Endpoints

### User Routes (`/api/users`)

#### 1. Register User
- **POST** `/api/users/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "address": "123 Main St, City, State"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "address": "123 Main St, City, State"
    }
  }
  ```

#### 2. Login User
- **POST** `/api/users/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "address": "123 Main St, City, State"
    }
  }
  ```

#### 3. Get User Profile
- **GET** `/api/users/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "address": "123 Main St, City, State",
      "role": "user",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

#### 4. Update User Profile
- **PUT** `/api/users/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "John Smith",
    "address": "456 Oak Ave, City, State"
  }
  ```

#### 5. Change Password
- **PUT** `/api/users/change-password`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "currentPassword": "oldpassword",
    "newPassword": "newpassword123"
  }
  ```

### Order Routes (`/api/orders`)

#### 1. Create Order
- **POST** `/api/orders/create`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "items": [
      {
        "productId": "product-1",
        "productName": "Gaming Mouse",
        "productImage": "mouse.jpg",
        "price": 29.99,
        "quantity": 2,
        "totalPrice": 59.98
      }
    ],
    "shippingAddress": {
      "name": "John Doe",
      "email": "john@example.com",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "phone": "555-1234"
    },
    "totalAmount": 59.98,
    "paymentMethod": "cash_on_delivery"
  }
  ```

#### 2. Get User Orders
- **GET** `/api/orders/my-orders`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "orders": [
      {
        "id": "order-id",
        "orderNumber": "ORD-20240101-001",
        "items": [...],
        "totalAmount": 59.98,
        "status": "pending",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

#### 3. Get Specific Order
- **GET** `/api/orders/:orderId`
- **Headers:** `Authorization: Bearer <token>`

#### 4. Update Order Status
- **PUT** `/api/orders/:orderId/status`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "status": "confirmed"
  }
  ```

#### 5. Cancel Order
- **PUT** `/api/orders/:orderId/cancel`
- **Headers:** `Authorization: Bearer <token>`

#### 6. Get Order Statistics
- **GET** `/api/orders/stats/summary`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "totalOrders": 5,
    "totalSpent": 299.50,
    "statusBreakdown": [
      {
        "_id": "delivered",
        "count": 3,
        "totalAmount": 179.70
      }
    ]
  }
  ```

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with your MongoDB connection string and JWT secret

3. Start the server:
   ```bash
   node server.js
   ```

## Database Models

### User Model
- Stores user information including name, email, password, address
- Includes wishlist and cart functionality
- Password is hashed using bcryptjs
- JWT tokens for authentication

### Order Model
- Stores order information including items, shipping address, payment details
- Tracks order status and payment status
- Includes order number generation and tracking
- Supports order cancellation and status updates

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- CORS enabled for cross-origin requests
- Environment variable configuration

## Error Handling

All routes include proper error handling with appropriate HTTP status codes:
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid/missing token)
- 403: Forbidden (access denied)
- 404: Not Found (resource not found)
- 500: Internal Server Error (server errors)
