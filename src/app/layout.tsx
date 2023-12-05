import { Layout } from "@/types/utils";
import { Inter } from "next/font/google";
import { Metadata } from "next";

import 'vnetwork-player/dist/vnetwork-player.min.css'
import "nprogress/nprogress.css";
import "swiper/css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  preload: true,
});

export const metadata: Metadata = {
  title: "React Anime",
};

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
