import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  async function fetchChat() {
    const chat = await axios.get(API_BASE_URL + "/user/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        _id: senderId?._id,
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        photoUrl: senderId?.photoUrl,
        text,
      };
    });

    setMessages(chatMessages);
  }

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });

    socket.on(
      "messageReceived",
      ({ firstName, lastName, photoUrl, text, userId }) => {
        setMessages([
          ...messages,
          { firstName, lastName, photoUrl, text, _id: userId },
        ]);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [messages, targetUserId, userId]);

  function handleSendMessage() {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  }

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((msg, ind) => {
          return (
            <>
              <div
                key={ind}
                className={`chat ${
                  msg._id === userId ? "chat-end" : "chat-start"
                } `}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={msg.photoUrl}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.firstName + " " + msg.lastName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            </>
          );
        })}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-black rounded p-2"
        />
        <button
          onClick={() => handleSendMessage()}
          className="btn btn-secondary"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
