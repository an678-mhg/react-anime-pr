import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { Layout } from "@/types/utils";
import React from "react";

const MainLayout: React.FC<Layout> = ({ children }) => {
  return (
    <div>
      <Header />
      <section className="my-20 min-h-screen">{children}</section>
      <Footer />
    </div>
  );
};

export default MainLayout;
