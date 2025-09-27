const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", // your Next.js frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // if you plan to send cookies or Authorization headers
};

app.use(cors(corsOptions));

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/notes", require("./routes/noteRoutes"));
app.use("/tenants", require("./routes/tenantRoutes"));

// Health endpoint
app.get("/health", (req,res)=> res.json({status: "ok"}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
