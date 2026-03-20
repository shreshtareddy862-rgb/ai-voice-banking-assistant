import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerChat({ email, logout, goBack }) {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // fetch chat messages
  const fetchMessages = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/get-chat",
        {
          params: { email }
        }
      );

      setMessages(res.data);

    } catch (error) {

      console.error("Error fetching messages", error);

    }

  };

  useEffect(() => {

    fetchMessages();

    const interval = setInterval(fetchMessages, 2000);

    return () => clearInterval(interval);

  }, []);

  const sendMessage = async () => {

    if (!message) return;

    try {

      await axios.post(
        "http://127.0.0.1:8000/send-message",
        null,
        {
          params: {
            email: email,
            sender: "customer",
            message: message
          }
        }
      );

      setMessage("");

      fetchMessages();

    } catch (error) {

      console.error("Error sending message", error);

    }

  };

  return (

    <div className="h-screen flex flex-col bg-gray-100">

      {/* HEADER */}

      <div className="flex justify-between items-center bg-white p-4 shadow">

        <h1 className="text-xl font-bold">
          Customer Support Chat
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

        <button
            onClick={goBack}
            style={{
                marginBottom: "20px",
                padding: "8px 16px",
                backgroundColor: "#555",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
            }}
        >
        ← Back to AI Assistant
        </button>

      {/* CHAT WINDOW */}

      <div className="flex-1 overflow-y-auto p-6">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex mb-3 ${
              msg.sender === "customer"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`px-4 py-2 rounded-lg max-w-md ${
                msg.sender === "customer"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.message}
            </div>

          </div>

        ))}

      </div>

      {/* INPUT */}

      <div className="bg-white p-4 flex gap-3">

        <input
          className="flex-1 border p-2 rounded"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Send
        </button>

      </div>

    </div>

  );

}

export default CustomerChat;