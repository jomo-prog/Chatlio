import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUserService = async ({ username, email, password }) => {
  const existingEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const existingUsername = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (existingUsername) {
    throw new Error("Username already exists");
  }
  let userTag;
  let tagExists = true;

  while (tagExists) {
    const randomtag = Math.floor(1000 + Math.random() * 9000);

    userTag = `${username}#${randomtag}`;
    const existingtag = await prisma.user.findUnique({
      where: {
        userTag,
      },
    });

    if (!existingtag) {
      tagExists = false;
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      userTag,
    },
  });

  return user;
};

const loginUserService = async ({ username, email, password }) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (!user) {
    throw new Error("Account does not exist please create an acoount");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("invalid credentials");
  }

  // create token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  console.log(token);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      userTag: user.userTag,
      createdAt: user.createdAt,
    },
  };
};

const logoutService = async () => {
  return {
    message: "logout succesful",
  };
};

const getCurrentUserService = async ({ id }) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      userTag: true,
      profileImage: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("user  not found");
  }
};

export {
  registerUserService,
  loginUserService,
  logoutService,
  getCurrentUserService,
};
