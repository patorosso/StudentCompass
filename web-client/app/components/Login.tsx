"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  return (
    <div className="w-full items-center justify-center">
      <form className="px-8 pt-6">
        <div className="mb-4">
          <label
            className="block font-bold text-gray-700 dark:text-slate-500 text-sm mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <div className="flex shadow appearance-none rounded-lg w-[370px] py-2 px-3 bg-white dark:bg-primary dark:bg-opacity-20 text-primary border dark:border-primary dark:hover:bg-opacity-40 duration-350">
            <Image
              src="/user.svg"
              alt="user-login"
              width={24}
              height={24}
              className="select-none"
            />
            <input
              type="text"
              className="bg-transparent pl-4 text-white w-full select-none focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block font-bold text-gray-700 dark:text-slate-500 text-sm mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex shadow appearance-none rounded-lg w-[370px] py-2 px-3 bg-white dark:bg-primary dark:bg-opacity-20 text-primary border dark:border-primary dark:hover:bg-opacity-40 duration-350">
            <Image
              src="/password.svg"
              alt="user-login"
              width={24}
              height={24}
              className="select-none"
            />
            <input
              id="password"
              type="password"
              className="bg-transparent pl-4 text-white w-full select-none focus:outline-none"
            />
          </div>
        </div>
        <Link
          className="ripple-primary text-white py-3 px-4 mt-4 rounded-3xl focus:outline-none focus:shadow-outline w-[370px] text-center"
          type="submit"
          href="/dashboard"
        >
          Log in
        </Link>
        <div className="w-[370px] border mt-9 border-slate-300 dark:border-slate-500" />
        <button
          className="ripple-primary-dark border border-slate-500 text-white py-3 px-4 mt-9 mb-1 rounded-3xl focus:outline-none focus:shadow-outline w-[370px] flex"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Image
            src="/google.svg"
            alt="continue with google"
            width={24}
            height={24}
            className="mr-16 select-none"
          />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
