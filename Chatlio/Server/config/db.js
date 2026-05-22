import prisma from "./prisma.js";

const connectdb = async () => {
  try {
    await prisma.$connect();

    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed", error);

    process.exit(1);
  }
};

export default connectdb;
