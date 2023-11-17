import Search from "@/components/Search";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Search Page | React Anime",
};

const SearchPage = () => {
  return <Search />;
};

export default SearchPage;
