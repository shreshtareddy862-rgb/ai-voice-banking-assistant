import React, { useState } from "react";
import axios from "axios";

function CustomerSignup({ setCustomerSignup, setRole  }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/customer-signup",
        null,
        {
          params: {
            name: name,
            email: email,
            password: password
          }
        }
      );

      alert("Account created successfully!");
      setCustomerSignup(false);

    } catch (error) {

      console.error(error);
      alert("Signup failed");

    }

  };

  return (

    <div className="h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80 flex flex-col">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Customer Signup
        </h1>

        <input
          placeholder="Name"
          className="border p-2 mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signup}
          className="bg-green-600 text-white py-2 rounded mb-4"
        >
          Sign Up
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => setCustomerSignup(false)}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>

    </div>

  );
}

export default CustomerSignup;