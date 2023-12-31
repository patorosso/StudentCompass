"use client";
import React, { useState } from "react";
import Login from "./Login";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      className="bg-gray-400 dark:bg-surface-200 p-4 shadow-lg rounded-lg w-2/3"
      style={{ minHeight: "400px" }}
    >
      <div className="border-b border-white dark:border-gray-600">
        <div className="flex space-x-4" role="tablist">
          <button
            className={`px-4 py-2 text-sm rounded-t-lg focus:outline-none ${
              activeTab === "login"
                ? "bg-white dark:bg-surface-300 text-primary font-semibold "
                : "text-gray-700 dark:text-white"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 text-sm font-thin rounded-t-lg focus:outline-none ${
              activeTab === "register"
                ? "bg-white dark:bg-surface-300 text-primary font-semibold "
                : "text-gray-700 dark:text-white"
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
            <p>Register Form</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
