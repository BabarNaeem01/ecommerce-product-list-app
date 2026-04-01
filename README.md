# E-Commerce Product List App

## Overview

This project is a mobile-first e-commerce catalog built with React Native and Expo SDK 54. It renders a product listing screen, reads catalog data from a MySQL database through a Node.js API, and handles loading and failure states for a smoother user experience.

The app was designed as a focused frontend-backend integration exercise: the mobile client stays simple, the API is explicit, and the database is isolated so the project can be evaluated and run independently.

## Architecture

```mermaid
flowchart LR
    A["Expo Go / React Native UI"] --> B["Express API on port 4101"]
    B --> C["mysql2 connection pool"]
    C --> D["MySQL database: assignment3_app1"]
```

## Key Features

- Fetches live product data from a dedicated MySQL schema
- Displays product image, name, and price in a scrollable card layout
- Shows an activity indicator while data is loading
- Surfaces an error message if the backend is unavailable
- Detects the Expo host automatically to simplify local network testing

## Technology Stack

- React Native with Expo SDK 54
- Express.js
- mysql2
- MySQL via XAMPP
- JavaScript

## API Contract

### `GET /products`

Returns an array of products:

```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "image": "https://...",
    "price": "89.99"
  }
]
```

## Database Design

Database: `assignment3_app1`

Table: `products`

| Column | Type |
|---|---|
| id | INT, PK, AUTO_INCREMENT |
| name | VARCHAR(120) |
| image | VARCHAR(255) |
| price | DECIMAL(10,2) |

Seed data is provided in [`sql2.sql`](./sql2.sql).

## Project Structure

```text
.
├── App.js
├── AppMain.js
├── server.js
├── sql2.sql
├── package.json
└── .gitignore
```

## Run Locally

1. Start MySQL in XAMPP.
2. Import [`sql2.sql`](./sql2.sql) into MySQL.
3. Install dependencies:
   `npm install`
4. Start the API:
   `node server.js`
5. Start Expo:
   `npx expo start -c`

Backend port: `4101`

## Engineering Notes

- The mobile app uses a dedicated `AppMain.js` entry file to avoid Windows case-sensitivity issues between `App.js` and `app.js`.
- The backend uses a mysql2 pool for straightforward, production-style query handling.
- The repo intentionally keeps frontend, backend, and SQL setup together for easy review and grading.
