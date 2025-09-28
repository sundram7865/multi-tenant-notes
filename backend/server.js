const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
const corsOptions = {
  origin: process.env.CLIENT_URL, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
};

app.use(cors(corsOptions));


app.use("/auth", require("./routes/authRoutes"));
app.use("/notes", require("./routes/noteRoutes"));
app.use("/tenants", require("./routes/tenantRoutes"));


app.get("/health", (req,res)=> res.json({status: "ok"}));

const PORT = process.env.PORT || 4444;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
