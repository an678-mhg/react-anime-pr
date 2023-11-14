import AnimeSlide from "@/components/Anime/AnimeSlide";
import { getHomeData } from "@/services/anime";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import React from "react";

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
