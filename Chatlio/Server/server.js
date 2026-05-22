import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

import connectdb from "./config/db.js";

dotenv.config();

// CONNECT DATABASE

connectdb();

// CREATE EXPRESS APP

const app = express();

// MIDDLEWARE

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

// TEST ROUTE

app.get("/", (req, res) => {
  res.send("Chatlio server is running");
});

// PORT

const PORT = process.env.PORT || 5000;

// START SERVER

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
