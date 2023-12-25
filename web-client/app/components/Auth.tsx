"use client";
import React, { useState } from "react";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signIn");

  return (
    <div className="flex flex-col bg-white h-3/5 w-4/5 shadow-lg rounded-lg pt-10 px-16">
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 ${
            activeTab === "signIn" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("signIn")}
        >
          Sign In
        </button>
        <button
          className={`flex-1 py-2 ${
            activeTab === "register" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>
      <div className="py-4">
        {activeTab === "signIn" && (
          <div>
            <p>Sign In Form</p>
          </div>
        )}
        {activeTab === "register" && (
          <div>
            <p>Register Form</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
