import AnimeSlide from "@/components/Anime/AnimeSlide";
import { getHomeData } from "@/services/anime";
import { Metadata, NextPage } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Home Page | React Anime",
};

const HomePage: NextPage = async () => {
  const data = await getHomeData();

  if (!data) {
    return notFound();
  }

  if (data?.every((item) => item?.data === null)) {
    return notFound();
  }

  return (
    <div className="py-5">
      <div className="container space-y-8">
        {data
          ?.filter((item) => item?.data)
          ?.map((item) => (
            <AnimeSlide
              key={item?.title}
              data={item?.data!}
              title={item?.title}
            />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
