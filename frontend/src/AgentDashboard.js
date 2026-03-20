import React, { useState, useEffect } from "react";
import axios from "axios";
let speaking = false;
const speechQueue = [];

function AgentDashboard({ logout }) {

  const [customers, setCustomers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [lastSpokenIndex, setLastSpokenIndex] = useState(-1);
  const [isRecording, setIsRecording] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {

  const unlockVoice = () => {
    window.speechSynthesis.resume();
  };

  document.addEventListener("click", unlockVoice);
  document.addEventListener("keydown", unlockVoice);

  return () => {
    document.removeEventListener("click", unlockVoice);
    document.removeEventListener("keydown", unlockVoice);
  };

}, []);

const speakMessage = (text) => {

  speechQueue.push(text);

  if (speaking) return;

  speaking = true;

  const speakNext = () => {

    if (speechQueue.length === 0) {
      speaking = false;
      return;
    }

    const synth = window.speechSynthesis;

    const utter = new SpeechSynthesisUtterance(speechQueue.shift());

    utter.rate = 0.9;   // slightly slower for clarity
    utter.pitch = 1;
    utter.volume = 1;

    let voices = synth.getVoices();

    if (!voices.length) {
      setTimeout(speakNext, 100);
      return;
    }

    const preferred =
      voices.find(v => v.name === "Samantha") ||
      voices.find(v => v.name === "Google US English") ||
      voices.find(v => v.lang === "en-US") ||
      voices[0];

    utter.voice = preferred;

    utter.onend = speakNext;

    synth.speak(utter);

  };

  speakNext();

};
  // -------------------------
  // FETCH CUSTOMERS
  // -------------------------
  const fetchCustomers = async () => {

    const res = await axios.get(
      "http://127.0.0.1:8000/get-customers"
    );

    setCustomers(res.data);

  };

  // -------------------------
  // FETCH MESSAGES
  // -------------------------
  const fetchMessages = async () => {

    if (!selectedEmail) return;

    const res = await axios.get(
      "http://127.0.0.1:8000/get-chat",
      {
        params: { email: selectedEmail }
      }
    );

    setMessages(res.data);

  };
  const checkCustomerMessages = async () => {

  for (let i = 0; i < customers.length; i++) {

    const email = customers[i].email;

    const res = await axios.get(
      "http://127.0.0.1:8000/get-chat",
      { params: { email: email } }
    );

    const msgs = res.data;

    const lastMsg = msgs[msgs.length - 1];

    if (lastMsg && lastMsg.sender === "customer") {

      speakMessage(`Customer ${i + 1} has a new message`);

      await new Promise(resolve => setTimeout(resolve, 1500));

      speakMessage(`Press ${i + 1}`);

      await new Promise(resolve => setTimeout(resolve, 1500));

    }

  }

};

  // -------------------------
  // REFRESH CHAT EVERY 2s
  // -------------------------
  useEffect(() => {

  fetchCustomers();

}, []);
useEffect(() => {

  if (customers.length === 0) return;

  checkCustomerMessages();

}, [customers]);

  // -------------------------
  // SPEAK NEW CUSTOMER MESSAGE
  // -------------------------
  useEffect(() => {

    if (!selectedEmail) return;
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];

    /* FIX 2: correct initial load handling */

    if (initialLoad) {

      setInitialLoad(false);

      if (lastMessage.sender === "customer") {

        speakMessage("New message");

        setTimeout(() => {
          speakMessage(lastMessage.message);
        }, 1200);

      }

      setLastSpokenIndex(messages.length - 1);
      return;

    }

    if (
      lastMessage.sender === "customer" &&
      lastSpokenIndex !== messages.length - 1
    ) {

      speakMessage("New message");

      setTimeout(() => {
        speakMessage(lastMessage.message);
      }, 1200);

      setLastSpokenIndex(messages.length - 1);

    }

  }, [messages, selectedEmail]);

  // -------------------------
  // SPACE KEY → VOICE REPLY
  // -------------------------
  useEffect(() => {

    const handleKey = (e) => {

      if (e.code === "Space") {
        e.preventDefault();

        startVoiceReply();

      }

    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);

  }, [selectedEmail]);

  

useEffect(() => {

    const handleCustomerSelect = (e) => {

      const num = parseInt(e.key);

      if (!isNaN(num) && customers[num - 1]) {

        const email = customers[num - 1].email;

        setSelectedEmail(email);
        setMessages([]);
        setLastSpokenIndex(-1);

        /* FIX 3: correct initialLoad */
        setInitialLoad(true);

        speakMessage(`Opening customer ${num}`);

        setTimeout(async () => {

          const res = await axios.get(
            "http://127.0.0.1:8000/get-chat",
            { params: { email: email } }
          );

          const msgs = res.data;

          setMessages(msgs);

        }, 600);

      }

    };

    window.addEventListener("keydown", handleCustomerSelect);

    return () => window.removeEventListener("keydown", handleCustomerSelect);

  }, [customers]);

  // -------------------------
  // SEND TEXT REPLY
  // -------------------------
  const sendReply = async () => {

    if (!reply) return;

    await axios.post(
      "http://127.0.0.1:8000/send-message",
      null,
      {
        params: {
          email: selectedEmail,
          sender: "agent",
          message: reply
        }
      }
    );

    setReply("");

    fetchMessages();

  };

  // -------------------------
  // SEND VOICE MESSAGE
  // -------------------------
  const sendAgentMessage = async (text) => {

    await axios.post(
      "http://127.0.0.1:8000/send-message",
      null,
      {
        params: {
          email: selectedEmail,
          sender: "agent",
          message: text
        }
      }
    );

    fetchMessages();

  };

  // -------------------------
  // START VOICE REPLY
  // -------------------------
  const startVoiceReply = () => {

  if (isRecording) return;   // prevent multiple recordings

  setIsRecording(true);

  speakMessage("Recording reply. Please speak.");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.start();

  recognition.onresult = (event) => {

    const text = event.results[0][0].transcript;

    speakMessage("Reply sent");

    sendAgentMessage(text);

  };

  recognition.onend = () => {

    setIsRecording(false);  // allow next recording

  };

};

  return (

    
    <div className="h-screen flex bg-gray-100">

      {/* LEFT PANEL */}

      <div className="w-1/4 bg-white border-r p-4">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-bold">
            Customers
          </h2>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>

        </div>

        {customers.map((cust, index) => (

          <div
            key={index}
            onClick={() => {
              setSelectedEmail(cust.email);
              setMessages([]);       
              setLastSpokenIndex(-1);

              speakMessage(`Opening chat with ${cust.email}`);
            }}
            className="p-3 border-b cursor-pointer hover:bg-gray-100"
          >
            {cust.email}
          </div>

        ))}

      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 flex flex-col">

        {!selectedEmail && (
          <div className="flex justify-center items-center h-full text-gray-500">
            Select a customer chat
          </div>
        )}

        {selectedEmail && (

          <>
            <div className="bg-white p-4 border-b font-bold text-lg">
              Chat with {selectedEmail}
            </div>

            <div className="flex-1 overflow-y-auto p-6">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex mb-3 ${
                    msg.sender === "agent"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`px-6 py-3 rounded-lg max-w-md text-lg font-medium ${
                      msg.sender === "agent"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.message}
                  </div>

                </div>

              ))}

            </div>

            <div className="bg-white p-4 flex gap-3">

              <input
                className="flex-1 border p-2 rounded"
                placeholder="Type reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />

              <button
                onClick={sendReply}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Send
              </button>

            </div>

          </>

        )}

      </div>

    </div>

  );

}

export default AgentDashboard;