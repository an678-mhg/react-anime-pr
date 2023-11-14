"use client";

import { NavbarData } from "@/types/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navbarData: NavbarData[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Browse",
    href: "/browse",
  },
  {
    title: "API",
    href: "https://github.com/an678-mhg/nest-restful-api-anime",
    target: "_blank",
  },
];

interface NavbarProps {
  show: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ show }) => {
  const pathname = usePathname();
  const activeMenuConditional = (item: NavbarData) =>
    pathname === item?.href ? "text-red-500" : "text-white";
  const showNavConditional = show ? "left-0" : "left-[100%]";

  return (
    <ul
      className={`md:flex items-center md:static fixed transition-all ${showNavConditional} bg-[#222] right-0 top-[56px]`}
    >
      {navbarData?.map((item) => (
        <li key={item?.title} className="px-4 py-2">
          <Link
            className={`text-sm font-normal ${activeMenuConditional(
              item
            )} hover:text-red-500 transition-colors`}
            href={item?.href}
            target={item?.target}
          >
            {item?.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
