import React, { useState } from "react";
import axios from "axios";

function CustomerAIPage({ email, openAgentChat, logout }) {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {

    const res = await axios.post(
      "http://127.0.0.1:8000/ask-ai",
      null,
      {
        params: { question: question }
      }
    );

    setAnswer(res.data.answer);

  };

  return (

    <div className="h-screen flex flex-col items-center bg-gray-100 p-10">

      <div className="flex justify-between w-full mb-10">

        <h1 className="text-3xl font-bold">
          VI Bank AI Assistant
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      <div className="bg-white p-8 rounded shadow-md w-2/3">

        <input
          className="w-full border p-3 mb-4"
          placeholder="Ask your banking question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askAI}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Ask AI
        </button>

        {answer && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <strong>AI Response:</strong>
            <p className="mt-2">{answer}</p>
          </div>
        )}

      </div>

      <button
        onClick={openAgentChat}
        className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-full"
      >
        Chat with Agent
      </button>

    </div>

  );
}

export default CustomerAIPage;