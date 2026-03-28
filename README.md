# 🌐 Social Media App (MERN)

A full-stack social media platform built using the MERN stack that enables real-time communication, content sharing, and secure user interaction.

The application allows users to create profiles, share posts, chat in real-time, and interact with others through likes, comments, and follows. It is designed with a modern UI and scalable backend architecture.

---

## 🚀 Features

- **Authentication & Authorization**
  - Secure login/signup using JWT  
  - Protected routes and session handling  

- **User Profile**
  - Create and update profile  
  - Upload profile picture  

- **Post Management**
  - Create posts (text, image, video)  
  - Like, comment, and share posts  

- **Social Features**
  - Follow / Unfollow users  
  - Explore and discover content  

- **Real-time Chat**
  - Instant messaging using Socket.io  
  - One-to-one chat system  

- **Stories Feature**
  - Upload stories (24-hour visibility)  

- **Notifications**
  - Real-time updates for likes, comments, follows  

- **System Features**
  - REST API architecture  
  - Responsive UI  
  - Secure backend with middleware  

---

## 📊 ER Diagram

```
User
 ├── Posts
 ├── Stories
 ├── Followers / Following

Post
 ├── Likes
 ├── Comments

User ─── chats ─── User
```

---

## 🏗 System Design

### High-Level Architecture

```
Frontend (React)
        │
        ▼
Backend (Node.js + Express)
        │
   ┌──────────────┬──────────────┐
   ▼              ▼              ▼
MongoDB       Socket.io        JWT Auth
(Database)    (Realtime)      (Security)
```

---

### 🔄 Request Flow

1. User sends request from frontend  
2. Backend receives API call  
3. Middleware verifies JWT  
4. Controller processes logic  
5. MongoDB handles data  
6. Socket.io handles real-time updates  
7. Response returned to frontend  

---

### ⚙️ Backend Architecture

```
Routes → Controllers → Models → Database
           │
           ▼
     Middleware (Auth, Errors)
```

---

## 📁 Project Structure

### Frontend (`client`)

- `src/`
  - `components/` → UI components (Chat, Post, Navbar, etc.)  
  - `pages/` → Pages (Home, Profile, Chat)  
  - `context/` → State management  
  - `styles/` → CSS files  
- `public/`

---

### Backend (`server`)

- `config/` → DB & cloud config  
- `controllers/` → Business logic  
- `middleware/` → Auth & validation  
- `models/` → Mongoose schemas  
- `routes/` → API endpoints  
- `uploads/` → Media storage  
- `index.js` → Entry point  

---

## ⚙️ Getting Started

### Backend Setup

```bash
cd server
npm install
```

Create `.env`:

```env
PORT=6001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run server:

```bash
npm start
```

---

### Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 🔐 Authentication (JWT)

- Secure login and signup  
- Token-based authentication  
- Protected routes  

### 🔄 Auth Flow

```
User → Login → JWT Generated → Access Protected Routes
```

---

## 💬 Real-time Communication (Socket.io)

- Instant chat system  
- Live notifications  
- Real-time updates  

### 🔄 Chat Flow

```
User → Send Message → Socket Server → Receiver Gets Message Instantly
```

---

## 🛠 Technologies Used

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB, Mongoose  
- **Realtime**: Socket.io  
- **Authentication**: JWT  

---

## 🔐 Security Features

- JWT Authentication  
- Protected APIs  
- Secure data handling  
- Middleware validation  

---

## 🚀 Deployment

- **Frontend**: Vercel / Netlify  
- **Backend**: Render / Railway  
- **Database**: MongoDB Atlas  

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first.

---

## 📜 License

MIT License

---

## 📌 Summary

This Social Media App demonstrates a modern MERN-based architecture with real-time communication, scalable backend design, and secure authentication. It is suitable for real-world applications and production-ready systems.