"use client";
import React, { useState } from "react";
import Login from "./Login";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      className="p-4 shadow-lg rounded-lg bg-white w-2/3"
      style={{ minHeight: "400px" }}
    >
      <div className="border-b">
        <div className="flex space-x-4" role="tablist">
          <button
            className={`px-4 py-2 text-sm font-medium text-gray-700 rounded-t-lg focus:outline-none ${
              activeTab === "login" ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium text-gray-700 rounded-t-lg focus:outline-none ${
              activeTab === "register" ? "bg-gray-100" : ""
            }`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === "login" ? (
          <div>
            <Login />
          </div>
        ) : (
          <div>
            {/* Register form goes here */}
            <p>Register Form</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
