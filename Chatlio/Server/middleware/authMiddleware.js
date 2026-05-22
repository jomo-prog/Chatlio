import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log(req.headers);

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "unauthorized, no token",
      });
    }

    const token = authHeader.split(" ")[1];
    const compared = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: compared.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        userTag: true,
        profileImage: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "token invalid",
    });
    console.error(error);
  }
};

export default authMiddleware;
