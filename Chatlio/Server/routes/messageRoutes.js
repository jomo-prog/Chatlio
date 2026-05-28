import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createChat,
  sendMessage,
  getMyChats,
  getChatMessages,
} from "..//controllers/chatController.js";

const router = express.Router();

//router.get("/me", authMiddleware);
router.post("/", authMiddleware, createChat);
router.post("/:chatId/messages", authMiddleware, sendMessage);
router.get("/", authMiddleware, getMyChats);
router.get("/:chatId/messages", authMiddleware, getChatMessages);

export default router;
