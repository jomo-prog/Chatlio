import prisma from "../config/prisma.js";

const createChatService = async ({ creatorId, name, memberIds, image }) => {
  const uniqueIds = [...new Set([creatorId, ...memberIds])];

  if (uniqueIds.length < 2) {
    throw new Error(" a chat needs at least two contacts");
  }

  const type = uniqueIds.length === 2 ? "direct" : "group";

  const chat = await prisma.chat.create({
    data: {
      type,
      name: type === "group" ? name : null,
      image: type === "group" ? image : null,
      members: {
        create: uniqueIds.map((userId) => ({
          userId,
          role: userId === creatorId ? "owner" : "member",
        })),
      },
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              userTag: true,
              email: true,
              profileImage: true,
            },
          },
        },
      },
    },
  });

  return chat;
};

export default createChatService;
