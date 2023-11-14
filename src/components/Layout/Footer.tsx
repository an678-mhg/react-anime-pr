import React from "react";
import Logo from "./Header/Logo";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { TbApi } from "react-icons/tb";

const footerData = ["FAQ", "HELP CENTER", "RULES", "POLICY"];

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#222] md:pt-10 pt-5">
        <div className="container py-4">
          <div className="flex items-center md:justify-start justify-center space-x-5 pb-10 border-b border-gray-600">
            <Logo className="text-[40px]" />
            <span className="text-xl font-semibold">React Anime</span>
          </div>

          <div className="py-8 flex md:items-center justify-between">
            <ul className="flex md:flex-row flex-col md:items-center md:space-x-8 md:space-y-0 space-y-2">
              {footerData?.map((item) => (
                <li key={item}>
                  <Link
                    className="text-xs hover:text-red-500 font-semibold"
                    href="#"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex items-center space-x-6 md:mt-0 mt-5">
              <li>
                <Link href="#" className="hover:text-red-500">
                  <BsGithub className="text-[25px]" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/an678-mhg/nest-restful-api-anime"
                  className="hover:text-red-500"
                  target="_blank"
                >
                  <TbApi className="text-[30px]" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-8 bg-[#111]">
        <div className="container text-sm font-normal text-center">
          Copyright © 2023. All Rights Reserved By{" "}
          <Link
            className="text-red-500 hover:underline md:inline-block block"
            href="#"
          >
            React Anime
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
