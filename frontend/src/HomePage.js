import React from "react";

function HomePage({ setRole }) {
  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* HEADER */}

      <div className="bg-blue-800 text-white px-8 py-4 flex items-center justify-between">

        <div className="flex items-center">

          <span className="text-xl mr-2">🏦</span>

          <h1 className="text-xl font-semibold">
            VI Bank
          </h1>

        </div>

        <p className="text-sm opacity-80">
          AI Voice Banking Assistant
        </p>

      </div>


      {/* MAIN CONTENT */}

      <div className="flex flex-1 items-center justify-center">

        <div className="bg-white shadow-md rounded-lg p-10 w-[420px] border">

          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            Welcome
          </h2>

          <p className="text-gray-500 text-sm text-center mb-8">
            Select how you want to continue
          </p>


          {/* BUTTONS */}

          <div className="space-y-4">

            <button
              onClick={() => setRole("agent")}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-md transition"
            >
              Agent Login
            </button>

            <button
              onClick={() => setRole("customer")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition"
            >
              Customer Login
            </button>

          </div>

        </div>

      </div>


      {/* FOOTER */}

      <div className="text-center text-xs text-gray-500 py-4">
        © VI Bank • Secure Banking Support System
      </div>

    </div>
  );
}

export default HomePage;