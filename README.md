# 🗣️ Samvad - Real-Time Chat Application

**Samvad** is a full-stack real-time chat application that enables users to communicate instantly in a secure, scalable, and efficient environment. Designed with modern technologies like **Node.js**, **Express**, **MongoDB**, **Socket.IO**, and a **Vite-powered React frontend**, this project emphasizes real-time interaction, seamless UX, and scalable architecture.

---

## 📌 Features

- 🔐 User authentication (JWT-based)
- 💬 Real-time messaging via **Socket.IO**
- 🧑‍🤝‍🧑 Group & private chat support
- 📦 RESTful API integration with Express
- 💾 MongoDB for message and user persistence
- 🎨 Clean and responsive UI built with **React** + **Vite**
- ⚙️ Environment-based configuration support
- 🛡️ Secure password hashing using **bcrypt**

---

## 🛠️ Tech Stack

### 🧠 Backend (`/backend`)

- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Socket.IO** for real-time messaging
- **bcrypt** for password hashing
- **dotenv** for secure config

### 💻 Frontend (`/frontend/myapp`)

- **React.js** (via **Vite**)
- **React Router**
- **Axios** for API calls
- **Bootstrap** / Custom CSS for styling

---

## 🗂️ Folder Structure

## samvad/

## ├── backend/ # Express backend with routes, models, and controllers

## │ ├── config/

## │ ├── controllers/

## │ ├── middleware/

## │ ├── model/

## │ ├── routes/

## │ ├── .env # Environment variables (excluded from Git)

## │ └── index.js

│
└── frontend/myapp/ # React frontend powered by Vite

## ├── public/

## ├── src/

## ├── .gitignore

## ├── vite.config.js

└── index.html

## .env file in backend

# PORT=5000

# MONGO_URI=mongodb://localhost:27017/samvad

# JWT_SECRET=your_jwt_secret_key

## Backend setup

# cd backend

# npm install

## fontend setup

## cd frontend/myapp

# npm install

# npm run dev
