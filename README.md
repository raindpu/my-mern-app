# Gaushala Management System

A comprehensive MERN stack application for managing Gaushalas (cow shelters) with integrated e-commerce stores for each Gaushala.

## Features

- **Gaushala Management**: Register and manage multiple Gaushalas
- **Cow Information**: Track detailed information about each cow including health status, breed, age, and milk production
- **Individual Stores**: Each Gaushala has its own store to sell cow-related products
- **Product Categories**: Milk, Ghee, Butter, Cheese, Paneer, Dung Cakes, and more
- **Shopping Cart**: Users can add products from different Gaushalas to cart
- **Order Management**: Place and track orders for cow-based products

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Setup

1. Install all dependencies:
bash
npm run install-all


2. Configure environment variables:
- Copy `app/backend/.env.example` to `app/backend/.env`
- Update MongoDB connection string if needed

3. Start MongoDB service

4. Run the application:

**Development mode:**
bash
# Terminal 1 - Backend
npm run dev-backend

# Terminal 2 - Frontend
npm run start-frontend


**Production mode:**
bash
# Build frontend
npm run build-frontend

# Start backend (serves both API and frontend)
npm run start-backend


## API Endpoints

### Gaushalas
- GET `/api/gaushalas` - Get all Gaushalas
- GET `/api/gaushalas/:id` - Get specific Gaushala
- POST `/api/gaushalas` - Create new Gaushala
- PUT `/api/gaushalas/:id` - Update Gaushala
- DELETE `/api/gaushalas/:id` - Delete Gaushala

### Cows
- GET `/api/cows` - Get all cows (supports ?gaushalaId filter)
- GET `/api/cows/:id` - Get specific cow
- POST `/api/cows` - Register new cow
- PUT `/api/cows/:id` - Update cow information
- DELETE `/api/cows/:id` - Remove cow

### Products
- GET `/api/products` - Get all products (supports ?gaushalaId filter)
- GET `/api/products/:id` - Get specific product
- POST `/api/products` - Add new product
- PUT `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product

### Orders
- GET `/api/orders` - Get all orders (supports ?gaushalaId filter)
- GET `/api/orders/:id` - Get specific order
- POST `/api/orders` - Place new order
- PUT `/api/orders/:id` - Update order status

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Styling**: Custom CSS

## Deployment

For deployment, ensure:
1. Set proper MongoDB connection string in environment variables
2. Build the frontend: `npm run build-frontend`
3. Configure reverse proxy (Nginx) to route `/api/*` to backend
4. All API calls use relative paths (no hardcoded ports)

## License

MIT