"use client";
import React from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function joinClassNames(...classNames: string[]) {
  return classNames.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const segment = useSelectedLayoutSegment();

  const sideBarOptions = [
    {
      name: "Dashboard",
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
    <div className="sticky top-0">
      <div className="h-full lg:w-72 flex-col hidden lg:flex">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-surface-200 pt-20 px-4 pb-4">
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="space-y-8">
                  {sideBarOptions.map((option) => (
                    <li key={option.name}>
                      <Link
                        href={option.path}
                        className={joinClassNames(
                          option.current
                            ? "text-second"
                            : "text-gray-400 hover:text-white",
                          "group flex gap-x-3 text-xl px-4 py-3 rounded-xl  hover:bg-gray-500"
                        )}
                      >
                        <div className="flex">
                          <Image
                            src={option.icon}
                            alt={option.name}
                            width={24}
                            height={24}
                            className="invert"
                          />
                          <p className="ml-8">{option.name}</p>
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
    </div>
  );
};

export default Sidebar;
