"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import MenuBarIcons from "./MenuBarIcons";
import { usePathname } from "next/navigation";

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
          <Logo className="text-[40px]" />
          <Navbar show={showNav} />
        </div>

        <Link href="/search">
          <BsSearch className="text-[25px]" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
