"use client";
import React, { useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function joinClassNames(...classNames: string[]) {
  return classNames.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const segment = useSelectedLayoutSegment();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sideBarOptions = [
    {
      name: "Progress",
      icon: "/dashboard.svg",
      path: "/dashboard",
      current: segment === null,
    },
    {
      name: "Planner",
      icon: "/calendar.svg",
      path: "/dashboard/planner",
      current: `${segment}` === "planner",
    },
    {
      name: "Analytics",
      icon: "/analytics.svg",
      path: "/dashboard/analytics",
      current: `${segment}` === "analytics",
    },
  ];
  return (
    <div
      className={`sticky top-0 h-full s0ml:flex flex-col hidden transition-all duration-350 ease-in-out ${
        isSidebarOpen ? "w-22 s1ml:w-72" : "w-22"
      }`}
    >
      <div className="flex grow flex-col gap-y-5 bg-surface-200 pt-4 px-4 pb-2">
        <div className="s1ml:flex s1ml:justify-end hidden">
          <button
            className="bg-surface-300 rounded-full flex items-center justify-center w-9 h-9 mr-2  hover:cursor-pointer hover:bg-surface-400 select-none"
            onClick={toggleSidebar}
          >
            <div
              className={`transform ${
                isSidebarOpen ? "" : "rotate-180"
              } transition-transform duration-500`}
            >
              <Image
                src="/chevron-left.svg"
                alt="Toggle Sidebar"
                width={14}
                height={14}
                className="invert"
              />
            </div>
          </button>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col">
            <li>
              <ul className="space-y-4">
                {sideBarOptions.map((option) => (
                  <li key={option.name}>
                    <Link
                      href={option.path}
                      className={joinClassNames(
                        option.current
                          ? "text-white"
                          : "text-gray-400 hover:text-white",
                        "group flex text-lg px-4 py-3 rounded-xl hover:bg-gray-500"
                      )}
                    >
                      <div className="flex shrink-0">
                        <Image
                          src={option.icon}
                          alt={option.name}
                          width={24}
                          height={24}
                          className={
                            option.current
                              ? "filter-primary select-none"
                              : "invert select-none"
                          }
                        />
                        <p
                          className={`ml-6 transition hidden s1ml:block delay-100 duration-100 ease-linear ${
                            isSidebarOpen
                              ? "md:w-auto md:opacity-100"
                              : "w-0 opacity-0"
                          } `}
                        >
                          {option.name}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
