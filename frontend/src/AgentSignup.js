import React, { useState } from "react";
import axios from "axios";

function AgentSignup({ setAgentSignup, setRole }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {

      try {

        await axios.post(
          "http://127.0.0.1:8000/agent-signup",
          null,
          {
            params: {
              name: name,
              email: email,
              password: password
            }
          }
        );
    alert("Agent account created");

    setAgentSignup(false);

  } catch (err) {

    alert("Signup failed");

  }
};  

  return (

    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">

      <button
        className="absolute top-6 left-6 text-blue-600"
        onClick={() => setAgentSignup(false)}
      >
        ← Back
      </button>

      <div className="bg-white p-8 rounded shadow-md w-80">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Agent Signup
        </h2>

        <input
          className="w-full border p-2 mb-4"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signup}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Create Account
        </button>

      </div>

    </div>
  );
}

export default AgentSignup;