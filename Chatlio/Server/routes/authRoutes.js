import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
//router.get("/getuser", getCurrentUser);

export default router;
