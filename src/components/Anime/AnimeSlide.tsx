"use client";

import { Anime } from "@/types/anime";
import React, { useRef } from "react";
import { SwiperSlide } from "swiper/react";
import AnimeCard from "./AnimeCard";
import SwiperContainer from "../Shared/SwiperContainer";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import SwiperCore from "swiper";

interface AnimeSlideProps {
  title: string;
  data: {
    data: Anime[];
  };
}

const AnimeSlide: React.FC<AnimeSlideProps> = ({ data, title }) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold lg:text-xl text-lg">{title}</h2>
        <div className="flex items-center px-2 py-1 border border-gray-700 rounded-full">
          <div
            className="cursor-pointer"
            onClick={() => swiperRef?.current?.slidePrev()}
          >
            <BsChevronLeft className={`text-[25px]`} />
          </div>
          <div className="w-[2px] mx-3 bg-gray-600 h-[18px] " />
          <div className="cursor-pointer">
            <BsChevronRight
              onClick={() => swiperRef?.current?.slideNext()}
              className="text-[25px]"
            />
          </div>
        </div>
      </div>
      <SwiperContainer
        xl={6}
        lg={6}
        md={4}
        sm={2}
        spaceBetween={24}
        className="mt-5 flex items-center"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {data?.data?.map((item) => (
          <SwiperSlide key={item?.id}>
            <AnimeCard anime={item} />
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </div>
  );
};

export default AnimeSlide;
