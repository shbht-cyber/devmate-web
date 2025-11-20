import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(null);
  const messagesEndRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  console.log("receiver is", receiver);

  async function fetchChat() {
    const chat = await axios.get(API_BASE_URL + "/user/chat/" + targetUserId, {
      withCredentials: true,
    });

    setReceiver(chat?.data?.receiver);

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
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });

    socket.on(
      "messageReceived",
      ({ firstName, lastName, photoUrl, text, userId }) => {
        setMessages((prev) => [
          ...prev,
          { firstName, lastName, photoUrl, text, _id: userId },
        ]);
      }
    );

    return () => socket.disconnect();
  }, [targetUserId, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSendMessage() {
    if (!newMessage.trim()) return;
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
    <div className=" w-full max-w-3xl mx-auto h-[85vh] flex flex-col bg-base-200 rounded-lg shadow-md border border-gray-300">
      {/* HEADER */}
      {receiver && (
        <div className="p-4 bg-base-300 flex items-center gap-3 border-b border-gray-400 sticky top-0">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={receiver?.photoUrl} />
            </div>
          </div>
          <h1 className="text-lg font-semibold capitalize">
            {receiver?.firstName + " " + receiver?.lastName}
          </h1>
        </div>
      )}

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-chat-pattern">
        {messages.map((msg, ind) => (
          <div
            key={ind}
            className={`flex ${
              msg._id === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div>
              <div
                className={`chat-bubble px-4 py-2 rounded-xl shadow-md max-w-xs wrap-break-word ${
                  msg._id === userId
                    ? "bg-green-800 text-white"
                    : "bg-white text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* INPUT BAR */}
      <div className="p-3 bg-base-300 border-t border-gray-400 flex items-center gap-3">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 input input-bordered"
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage} className="btn btn-success">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
