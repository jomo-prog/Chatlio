import { sendMessageService } from "../service/messageService.js";
import createChatService from "../service/chatService.js";
import { getMyChatService } from "../service/messageService.js";
import { getChatMessageService } from "../service/messageService.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const { memberIds, name, image } = req.body;

    const chat = await createChatService({
      creatorId: userId,
      memberIds: memberIds,
      name: name,
      image: image,
    });

    res.status(201).json({
      message: "chat created",
      Chat: chat,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "failed to create chat",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const chatId = Number(req.params.chatId);
    const { content, imageUrl, fileUrl } = req.body;

    const message = await sendMessageService({
      chatId,
      senderId,
      content,
      imageUrl,
      fileUrl,
    });

    res.status(201).json({
      message: "message sent",
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await getMyChatService({
      userId,
    });

    res.status(200).json({
      chats,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "failed to fetch messages",
    });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const chatId = Number(req.params.chatId);

    const messages = await getChatMessageService({
      userId,
      chatId,
    });

    res.status(200).json({
      messages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "failed to fetch messages",
    });
  }
};
