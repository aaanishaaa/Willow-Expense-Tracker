require("dotenv").config();
const express = require("express"); 
const cors = require("cors");
const path = require("path");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || '*',
        methods: ["GET", "PUT", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use the correct Express instance: `app`
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
