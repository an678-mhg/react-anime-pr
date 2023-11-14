import BrowseFilter from "@/components/Shared/BrowseFilter";
import { getMetadata } from "@/services/anime";
import { notFound } from "next/navigation";
import React from "react";

const Browse = async () => {
  const data = await getMetadata();

  if (!data) {
    return notFound();
  }

  return (
    <div className="container">
      <h2 className="font-semibold lg:text-xl text-lg">Browse</h2>
      <BrowseFilter
        categories={data?.data?.categories}
        countries={data?.data?.countries}
      />
    </div>
  );
};

export default Browse;
