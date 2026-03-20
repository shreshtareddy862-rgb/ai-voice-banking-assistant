import React, { useState } from "react";
import axios from "axios";

function CustomerLogin({
  setCustomerLoggedIn,
  setCustomerEmail,
  setShowCustomerSignup,
  setRole,
  openAI
}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {

  try {

    const res = await axios.post(
      "http://127.0.0.1:8000/customer-login",
      null,
      {
        params: {
          email: email,
          password: password
        }
      }
    );

    if (res.data.status === "success") {

        setCustomerEmail(email);
        openAI();   // go to AI assistant page

    }

  } catch {

    setError("Invalid email or password");

  }

};

  return (

    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">

      {/* BACK BUTTON */}
      <button
        className="absolute top-6 left-6 text-blue-600"
        onClick={() => setRole(null)}
      >
        ← Back
      </button>

      <div className="bg-white p-8 rounded shadow-md w-80">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Customer Login
        </h2>

        {/* EMAIL */}
        <input
          className="w-full border p-2 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}

        {/* LOGIN BUTTON */}
        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>

        {/* SIGNUP LINK */}
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => setShowCustomerSignup(true)}
            className="text-blue-600 cursor-pointer"
          >
            Sign up
          </span>
        </p>

      </div>

    </div>

  );

}

export default CustomerLogin;