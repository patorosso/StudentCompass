"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  return (
    <div className="w-full items-center justify-center">
      <form className="px-8 pt-6">
        <div className="mb-4">
          <label
            className="block italic font-semibold text-gray-700 dark:text-white text-sm mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border dark:border-gray-500 rounded w-full py-2 px-3 bg-white dark:bg-surface-400 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="your_user"
          />
        </div>
        <div className="mb-6">
          <label
            className="block italic font-semibold text-gray-700 dark:text-white text-sm mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border dark:border-gray-500 rounded w-full py-2 px-3 bg-white dark:bg-surface-400 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <button
          className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            router.push("/dashboard");
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
