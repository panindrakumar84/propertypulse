"use server";

import Message from "@/models/message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const { connectDB } = require("@/config/database");

async function markMessageAsRead(messageId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId)
    throw new Error("User Id is required");

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error("Message not found");

  //   verify ownership
  if (message.recipient.toString() !== userId) throw new Error("Unauthorized");

  message.read = !message.read;

  await message.save();

  revalidatePath("/messages");

  return message.read;
}

export default markMessageAsRead;
