"use client";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      className="bg-slate-200 dark:bg-indigo-950 bg-opacity-55 dark:bg-opacity-75 p-4 shadow-lg rounded-lg w-[500px] lg:mr-60"
      style={{ height: "500px" }}
    >
      <div className="border-b border-white dark:border-primary dark:border-opacity-55">
        <div className="flex space-x-4" role="tablist">
          <button
            className={`dark:ripple-primary-dark px-4 py-2 text-sm rounded-t-lg focus:outline-none ${
              activeTab === "login"
                ? "bg-slate-50 dark:bg-primary dark:bg-opacity-40 text-black dark:text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Log in
          </button>
          <button
            className={`dark:ripple-primary-dark px-4 py-2 text-sm font-thin rounded-t-lg focus:outline-none ${
              activeTab === "register"
                ? "bg-slate-50 dark:bg-primary dark:bg-opacity-40 text-slate-600 dark:text-white"
                : "text-gray-400"
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
            <Register />
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
