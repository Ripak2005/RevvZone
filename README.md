# 🏍️ RevvZone - Ride Gear & Auto Accessories E-Commerce Platform

RevvZone is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application built for enthusiasts of motorcycle gear and automotive accessories.

## 🔥 Features

### 👤 User Features

* ✅ Signup/Login with JWT Authentication
* ✅ Browse products by categories (Helmets, Jackets, Auto Accessories)
* ✅ Voice search for product discovery (🎤 Web Speech API)
* ✅ Add to Cart / Wishlist
* ✅ Place orders with address and price summary
* ✅ View past order history
* ✅ Dark mode toggle (🌙/☀️)

### 🛠️ Admin Features

* ✅ Admin dashboard (with token & role check)
* ✅ View all orders (coming soon)

---

## 🖥️ Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | React + Vite + Tailwind CSS |
| Backend  | Node.js + Express           |
| Database | MongoDB (Mongoose ORM)      |
| Auth     | JWT + Bcrypt                |

---

## 🚀 Run Locally

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/revvzone.git
cd revvzone
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=yourSecretKey
```

Run the server:

```bash
npm start
```

### 3️⃣ Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

### 🔗 Access:

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:5000/api`

---

## 📂 Folder Structure

```
RevvZone/
├── client/               # React + Tailwind frontend
│   ├── components/
│   ├── pages/
│   ├── context/
├── server/               # Express backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
```

---

## 📦 Features to Add Next

* [ ] Admin: view/update orders
* [ ] Razorpay/Stripe payment integration
* [ ] Product reviews and ratings
* [ ] Email confirmations

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---
## 👨‍💻 Developer
**Ripak Raj**

Built for the \[Spargen 2025 E-Commerce Challenge] 💥
