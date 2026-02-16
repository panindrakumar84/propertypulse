"use server";
import { connectDB } from "@/config/database";
import Message from "@/models/message";
import Property from "@/models/property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";

async function addMessage(prevState, formData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const newMessage = new Message({
    sender: userId,
    recipient: formData.get("recipient"),
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("message"),
  });
  await newMessage.save();
  return {
    submitted: true,
  };
}

export default addMessage;
