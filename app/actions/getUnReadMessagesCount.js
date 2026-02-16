"use server";
import { connectDB } from "@/config/database";
import Message from "@/models/message";
import { getSessionUser } from "@/utils/getSessionUser";

export async function getUnreadMessagesCount() {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("user ID is required");
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
}
