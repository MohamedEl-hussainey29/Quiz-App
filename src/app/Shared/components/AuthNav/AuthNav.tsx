"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserTie } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";

export default function AuthNav() {
  const pathname = usePathname();

  const links = [
    {
      href: "/login",
      label: "Sign In",
      icon: FaUserTie,
    },
    {
      href: "/register",
      label: "Sign Up",
      icon: FaUserPlus,
    },
  ];

  return (
    <div className="mt-5 flex gap-5">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              flex h-30 w-42.5 flex-col items-center justify-center rounded-md
              bg-[#333333] transition-all duration-300
              ${
                isActive
                  ? "border-4 border-[#C5D86D] text-white"
                  : "border-4 border-transparent text-white hover:border-[#C5D86D]"
              }
            `}
          >
            <Icon
              size={40}
              className={isActive ? "text-[#C5D86D]" : ""}
            />

            <p className="mt-2 text-sm font-bold">
              {link.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
}