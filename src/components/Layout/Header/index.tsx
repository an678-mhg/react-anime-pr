"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import MenuBarIcons from "./MenuBarIcons";
import { usePathname } from "next/navigation";
import { IoIosLogIn } from "react-icons/io";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowNav(false);
  }, [pathname]);

  return (
    <header className="py-2 fixed top-0 w-full bg-[#222] z-[999]">
      <div className="container flex items-center justify-between">
        <MenuBarIcons
          isClose={!showNav}
          onClick={() => setShowNav((prev) => !prev)}
        />

        <div className="flex md:space-x-5 items-center">
          <Logo className="text-[40px] md:block hidden" />
          <Navbar show={showNav} />
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/search">
            <BsSearch className="text-[25px]" />
          </Link>
          {/* <Link
            href="/login"
            className="text-white px-4 py-2 rounded-md bg-red-500 flex items-center"
          >
            <IoIosLogIn className="text-lg mr-2" />
            <span>SignIn</span>
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
