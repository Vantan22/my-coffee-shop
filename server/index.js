const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
// const coffeeRoutes = require("./routes/coffeeRoutes");

// Kết nối MongoDB
connectDB();


const app = express();
const PORT = 3000;
// app.use(
//     cors({
//       origin: 'http://localhost:5173', // Địa chỉ frontend
//       methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức được phép
//       credentials: true, // Cho phép gửi cookie nếu cần
//     })
// );
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
// app.use("/coffees", coffeeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
