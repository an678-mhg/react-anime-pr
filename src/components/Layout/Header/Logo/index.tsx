import React from "react";
import { GiReactor } from "react-icons/gi";

import "./style.css";
import Link from "next/link";

interface LogoProps {
  className: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/">
      <GiReactor className={`text-red-500 ${className}`} />
    </Link>
  );
};

export default Logo;
