import React, { useState } from "react";
import axios from "axios";

function AgentLogin({ setAgentLoggedIn, setShowAgentSignup, setRole }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/agent-login",
        null,
        {
          params: { email, password }
        }
      );

      if (res.data.status === "success") {
        setAgentLoggedIn(true);
      }

    } catch {
      setError("Invalid email or password");
    }

  };

  return (

    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">

      <button
        className="absolute top-6 left-6 text-blue-600"
        onClick={() => setRole(null)}
      >
        ← Back
      </button>

      <div className="bg-white p-8 rounded shadow-md w-80">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Agent Login
        </h2>

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

        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => setShowAgentSignup(true)}
            className="text-blue-600 cursor-pointer"
          >
            Sign up
          </span>
        </p>

      </div>

    </div>
  );
}

export default AgentLogin;