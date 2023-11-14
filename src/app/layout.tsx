import { Layout } from "@/types/utils";
import { Inter } from "next/font/google";

import "./globals.css";
import "swiper/css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  preload: true,
});

const RootLayout: React.FC<Layout> = ({ children }) => {
  return (
    <html className={inter?.className}>
      <body className="bg-[#161616] text-white">
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
