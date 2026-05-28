import prisma from "../config/prisma.js";

const checkChatMembership = async ({ chatId, userId }) => {
  const member = await prisma.chatMember.findUnique({
    where: {
      chatId_userId: {
        chatId,
        userId,
      },
    },
  });

  if (!member) {
    throw new Error("you are not a member of this chat");
  }

  return member;
};
// function to retrive messages in a specific chat
const getChatMessageService = async ({ chatId, userId }) => {
  await checkChatMembership({ chatId, userId });

  const messages = await prisma.message.findMany({
    where: {
      chatId,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      sender: {
        select: {
          id: true,
          userName: true,
          userTag: true,
          profileImage: true,
        },
      },
    },
  });

  return messages;
};

const getMyChatService = async ({ userId }) => {
  const myChats = await prisma.chat.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              userTag: true,
              username: true,
              profileImage: true,
            },
          },
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        include: {
          sender: {
            select: {
              id: true,
              userTag: true,
              userName: true,
              profileImage: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return myChats;
};

const sendMessageService = async ({
  content,
  imageUrl,
  fileUrl,
  chatId,
  senderId,
}) => {
  await checkChatMembership({ chatId, userId: senderId });

  if (!content && !imageUrl && !fileUrl) {
    throw new Error("message cannotbe empty");
  }

  const message = await prisma.message.create({
    data: {
      chatId,
      senderId,
      content,
      imageUrl,
      fileUrl,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          userTag: true,
          profileImage: true,
        },
      },
    },
  });

  await prisma.chat.update({
    where: {
      id: chatId,
    },
    data: {
      updatedAt: new Date(),
    },
  });

  return message;
};

export {
  checkChatMembership,
  sendMessageService,
  getChatMessageService,
  getMyChatService,
};
