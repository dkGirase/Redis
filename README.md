🚀 Full Stack CRUD App (React + Express + PostgreSQL + Redis)

A simple Full Stack CRUD application built using:

Frontend: React (Vite) + Axios

Backend: Node.js + Express

Database: PostgreSQL

Cache: Redis (with TTL)

This project demonstrates:

CRUD operations (Create, Read, Update, Delete)

Redis caching for faster reads

Cache invalidation on data changes

📁 Project Structure

root
│
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   └── api.js
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   │   └── user.controller.js
│   │   ├── routes
│   │   │   └── user.routes.js
│   │   ├── db.js
│   │   ├── redis.js
│   │   ├── config.js
│   │   └── index.js
│   └── package.json
│
└── README.md

🧠 Features

➕ Create single & bulk users

📄 Get all users (Redis cached)

🔍 Get user by ID (Redis cached)

✏️ Update user

❌ Delete user

⚡ Redis caching with 60 seconds TTL

🔄 Automatic cache invalidation on update/delete

🛠 Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Frontend | React, Vite, Axios      |
| Backend  | Node.js, Express        |
| Database | PostgreSQL              |
| Cache    | Redis                   |
| Language | JavaScript (ES Modules) |


🔧 Prerequisites

Make sure you have installed:

Node.js (v18+ recommended)

PostgreSQL

Redis

Git

🗄️ Database Setup (PostgreSQL)
Create database and table:

CREATE DATABASE testdb;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  age INT
);


🔴 Redis Setup
Install Redis

Windows

Download from: https://github.com/tporadowski/redis/releases

Check “Add Redis to PATH”

Start Redis:
redis-server

Linux / Mac

sudo apt install redis
redis-server

⚙️ Backend Setup
1️⃣ Go to backend folder
cd backend

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
PORT=5000

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=testdb
DB_PORT=5432

REDIS_URL=redis://localhost:6379

4️⃣ Start backend server
npm run dev


Backend runs at:

http://localhost:5000

🎨 Frontend Setup
1️⃣ Go to frontend folder
cd frontend

2️⃣ Install dependencies
npm install

3️⃣ Start frontend
npm run dev


Frontend runs at:

http://localhost:5173

🔗 API Endpoints

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| POST   | `/api/users`      | Create single user           |
| POST   | `/api/users/bulk` | Create multiple users        |
| GET    | `/api/users`      | Get all users (Redis cached) |
| GET    | `/api/users/:id`  | Get user by ID               |
| PUT    | `/api/users/:id`  | Update user                  |
| DELETE | `/api/users/:id`  | Delete user                  |

⚡ Redis Caching Logic
Get All Users

First request → fetch from PostgreSQL

Stored in Redis with TTL = 60 sec

Next request → served from Redis

Cache Keys Used
users_cache
user:<id>

Cache Invalidation

On Create / Update / Delete

redisClient.del("users_cache");
redisClient.del(`user:${id}`);

🧪 Sample Response (Cached)
{
  "source": "redis",
  "data": [
    {
      "id": 1,
      "name": "John",
      "email": "john@gmail.com",
      "age": 25
    }
  ]
}

🧑‍💻 Author
Dnyanendra Girase
TY BBA-CA Student | Java & Full Stack Developer


TTL (Time To Live) in Redis

📁 Project Structure
