import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js"
import setupSocket from "./sockets/socket.js";
import http from "http";

import connectdb from "./config/db.js";

dotenv.config();

// Connect db

connectdb();

// Create express app

const app = express();

// create http server
const server = http.createServer(app);

setupSocket(server);

// Middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/chats", messageRoutes)

// test route

app.get("/", (req, res) => {
  res.send("Chatlio server is running");
});

// PORT

const PORT = process.env.PORT || 5000;

// START SERVER

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
