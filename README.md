# PocketGlow Essentials

A full-stack e-commerce web app for premium single-use sachet skincare. Built with **React + TanStack Router** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## Project Structure

```
pocketglow-bliss-main/
├── frontend/      # React SPA (Vite + TanStack Router + Tailwind CSS v4)
└── backend/       # REST API (Node.js + Express + MongoDB/Mongoose)
```

---

## Tech Stack

| Layer     | Stack                                                              |
|-----------|--------------------------------------------------------------------|
| Frontend  | React 19, Vite 7, TanStack Router v1, TanStack Query v5, Tailwind CSS v4, Radix UI, Sonner |
| Backend   | Node.js, Express 4, Mongoose 8, JWT Auth, bcryptjs, cookie-parser |
| Database  | MongoDB (local or Atlas)                                           |

---

## Getting Started

### Prerequisites

- **Node.js** v20+
- **npm** v10+
- **MongoDB** running locally (or a MongoDB Atlas connection string)

---

### 1. Backend Setup

```bash
cd backend

# Copy and configure environment variables
cp .env.example .env
# Edit .env — set MONGO_URI, JWT_SECRET, CLIENT_URL

# Install dependencies
npm install

# (Optional) Seed the database with sample products
npm run seed

# Start the backend server (port 5000 by default)
npm start
```

**Backend `.env` variables:**

| Variable          | Description                                  | Default                                  |
|-------------------|----------------------------------------------|------------------------------------------|
| `PORT`            | Server port                                  | `5000`                                   |
| `MONGO_URI`       | MongoDB connection string                    | `mongodb://localhost:27017/pocketglow`   |
| `JWT_SECRET`      | Secret for signing JWT tokens                | _(required, set a long random string)_   |
| `JWT_EXPIRE`      | Token expiry duration                        | `7d`                                     |
| `CLIENT_URL`      | Frontend URL for CORS                        | `http://localhost:5173`                  |
| `ADMIN_SECRET_KEY`| Key required to register admin accounts      | _(required for admin registration)_      |

---

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server (port 5173)
npm run dev
```

The frontend will be available at **http://localhost:5173**.

**Frontend `.env` variables** (optional, create `frontend/.env`):

| Variable       | Description                     | Default                        |
|----------------|---------------------------------|--------------------------------|
| `VITE_API_URL` | Backend API base URL            | `http://localhost:5000/api`    |

---

### 3. Production Build

```bash
cd frontend
npm run build
```

Output is in `frontend/dist/`. Deploy the `dist/` folder to any static hosting service (Vercel, Netlify, S3, etc.).

For the backend, deploy the `backend/` directory to any Node.js host (Railway, Render, Fly.io, etc.).

---

## API Routes

| Method | Endpoint               | Description                         | Auth Required |
|--------|------------------------|-------------------------------------|---------------|
| POST   | `/api/auth/register`   | Register a new user                 | No            |
| POST   | `/api/auth/login`      | Login and receive JWT               | No            |
| GET    | `/api/auth/logout`     | Logout (clears cookie)              | No            |
| GET    | `/api/auth/profile`    | Get current user profile            | Yes           |
| GET    | `/api/products`        | List all products (optional `?category=`) | No      |
| GET    | `/api/products/:id`    | Get single product                  | No            |
| POST   | `/api/products`        | Create product                      | Admin         |
| PUT    | `/api/products/:id`    | Update product                      | Admin         |
| DELETE | `/api/products/:id`    | Delete product                      | Admin         |
| GET    | `/api/cart`            | Get cart items                      | Yes           |
| POST   | `/api/cart`            | Add item to cart                    | Yes           |
| PUT    | `/api/cart/:productId` | Update cart item quantity           | Yes           |
| DELETE | `/api/cart/:productId` | Remove item from cart               | Yes           |
| DELETE | `/api/cart`            | Clear entire cart                   | Yes           |
| GET    | `/api/wishlist`        | Get wishlist                        | Yes           |
| POST   | `/api/wishlist`        | Toggle wishlist item                | Yes           |
| POST   | `/api/orders`          | Create order                        | Yes           |
| GET    | `/api/orders`          | Get user's orders                   | Yes           |
| GET    | `/api/orders/all`      | Get all orders                      | Admin         |
| POST   | `/api/contact`         | Submit contact form                 | No            |
| POST   | `/api/newsletter`      | Subscribe to newsletter             | No            |

---

## Features

- 🛍️ **Shop** — filterable product grid with category and sort controls
- 🧴 **Product Detail** — image gallery, accordion specs, add to cart
- 🛒 **Cart** — quantity management, order summary, free shipping threshold
- 👤 **Account** — register/login with JWT, profile view, logout
- 🌙 **Dark/Light Mode** — theme toggled and persisted in localStorage
- 📱 **Responsive** — mobile-first design
- 🔌 **Backend fallback** — uses local product data if backend is unreachable

---

## License

MIT
