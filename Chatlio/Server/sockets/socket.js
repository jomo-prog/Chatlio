import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { sendMessageService } from "../service/messageService.js";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error("No token provided"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          username: true,
          email: true,
          userTag: true,
          profileImage: true,
        },
      });

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;
      next();
    } catch {
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.username}`);

    socket.on("chat:join", async ({ chatId }) => {
      try {
        const member = await prisma.chatMember.findUnique({
          where: {
            chatId_userId: {
              chatId: Number(chatId),
              userId: socket.user.id,
            },
          },
        });

        if (!member) {
          return socket.emit("error", {
            message: "You are not a member of this chat",
          });
        }

        socket.join(`chat:${chatId}`);
      } catch {
        socket.emit("error", {
          message: "Failed to join chat",
        });
      }
    });

    socket.on(
      "message:send",
      async ({ chatId, content, imageUrl, fileUrl }) => {
        try {
          const message = await sendMessageService({
            chatId: Number(chatId),
            senderId: socket.user.id,
            content,
            imageUrl,
            fileUrl,
          });

          io.to(`chat:${chatId}`).emit("message:new", message);
        } catch (error) {
          socket.emit("error", {
            message: error.message || "Failed to send message",
          });
        }
      },
    );

    socket.on("typing:start", ({ chatId }) => {
      socket.to(`chat:${chatId}`).emit("typing:start", {
        chatId,
        user: socket.user,
      });
    });

    socket.on("typing:stop", ({ chatId }) => {
      socket.to(`chat:${chatId}`).emit("typing:stop", {
        chatId,
        user: socket.user,
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.username}`);
    });
  });

  return io;
};

export default setupSocket;
