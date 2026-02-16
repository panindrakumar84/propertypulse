"use client";

import deleteMessage from "@/app/actions/deleteMessage";
import markMessageAsRead from "@/app/actions/markMessageRead";
import { useMessages } from "@/context/messageContext";
import { useState } from "react";
import { toast } from "react-toastify";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const { setUnReadCount } = useMessages();

  const handleMessageRead = async () => {
    const read = await markMessageAsRead(message._id);

    setIsRead(read);
    setUnReadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));

    toast.success(`Marked as ${read ? "read" : "new"}`);
  };

  const handleDeleteMessage = async () => {
    await deleteMessage(message._id);
    setUnReadCount((prevCount) => prevCount - 1);
    toast.success("Message deleted");
  };

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <span className="absolute top-2 right-0 bg-yellow-400 text-black/70 text-xs font-bold  px-2 py-2 rounded-l-md">
          New
        </span>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.message}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${message.email} `} className="text-blue-500">
            recipient@example.com
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received at:</strong>
          {message.createdAt}
        </li>
      </ul>
      <button
        onClick={handleMessageRead}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteMessage}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
