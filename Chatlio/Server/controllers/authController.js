//import prisma from "../config/prisma.js";

import {
  registerUserService,
  loginUserService,
  logoutService,
} from "../service/authService.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUserService({
      email,
      username,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("registrationdberror", error);
    res.status(500).json({ message: "failed to register user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res.status(400).json({
        message: "account details required",
      });
    }
    const user = await loginUserService({
      email,
      username,
      password,
    });
    res.status(200).json({
      message: "login succesful",
      token: user.token,
      user: {       
        id: user.id,
        userTag: user.userTag,
        email: user.email,
        username: user.username,
      },
      
    });
  } catch (error) {
    console.error("login error");
    res.status(401).json({
      message: error.message || "login failed",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const result = await logoutService;
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      messafe: error.message || "logout failed",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};
