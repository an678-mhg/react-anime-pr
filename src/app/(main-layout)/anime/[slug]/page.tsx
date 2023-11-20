import { getAnimeBySlug } from "@/services/anime";
import { Metadata, NextPage } from "next";
import Image from "next/legacy/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { FaPlay } from "react-icons/fa";
import AnimeInfo from "@/components/Anime/AnimeInfo";
import EpisodeList from "@/components/Anime/Episodes";
import { useMetadata } from "@/hooks/useMetadata";

interface PageContext {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageContext): Promise<Metadata> {
  const slug = params?.slug;
  const anime = await getAnimeBySlug(params?.slug);

  return useMetadata({
    description: anime?.data?.info?.description!,
    title: anime?.data?.info?.title!,
    urlPath: `/anime/${slug}`,
    image: anime?.data?.info?.image_url,
  });
}

const AnimeSlug: NextPage<PageContext> = async ({ params }) => {
  if (!params?.slug) {
    return notFound();
  }

  const anime = await getAnimeBySlug(params?.slug);

  if (!anime || !anime?.data) {
    return notFound();
  }

  const {
    episodes_iframe_url,
    episodes_m3u8_url,
    info: {
      image_url,
      title,
      other_title,
      categories,
      description,
      actors,
      countries,
      director,
      language,
      quality,
      time,
      year,
      slug,
    },
  } = anime?.data;

  const dataInfo = [
    {
      labels: "Other Title",
      value: other_title,
    },
    {
      labels: "Actors",
      value: actors,
    },
    {
      labels: "Countries",
      value: countries?.map((item) => item?.country?.name)?.join(", "),
    },
    {
      labels: "Director",
      value: director,
    },
    {
      labels: "Language",
      value: language,
    },
    {
      labels: "Quality",
      value: quality,
    },
    {
      labels: "Year",
      value: year,
    },
    {
      labels: "Time",
      value: time,
    },
  ];

  return (
    <div className="mt-10">
      <div className="container py-5">
        <div className="flex md:flex-row flex-col md:items-end items-center lg:space-x-10 md:space-x-5 space-x-0">
          <div className="relative aspect-[2/3] bg-[#222] rounded-sm overflow-hidden w-[230px]">
            <Image
              alt={title}
              layout="fill"
              className="w-full"
              src={image_url}
            />
          </div>

          <div className="flex-1 md:mt-0 mt-10 w-full">
            <div className="space-x-4 flex items-center">
              <Link
                href={`/anime/watch/${slug}/${episodes_iframe_url?.[0]?.id}/iframe`}
                className="text-white px-4 py-2 rounded-md bg-red-500 flex items-center"
              >
                <FaPlay className="text-lg mr-2" />
                <span>Watch Now</span>
              </Link>
              {/* <button className="text-red-500 px-4 py-2 rounded-md border border-red-500 flex items-center">
                <BsBookmark className="text-lg mr-2" />
                <span>Bookmark</span>
              </button> */}
            </div>
            <h1 className="text-xl font-semibold mt-8">{title}</h1>
            <div className="mt-2 flex flex-wrap">
              {categories?.map((item) => (
                <Link
                  key={item?.categoryId}
                  href={`/browse?categories=${item.categoryId}`}
                  className="text-gray-500 pr-4 py-2 font-normal"
                >
                  {item?.category?.name}
                </Link>
              ))}
            </div>
            <div className={`mt-4 text-gray-400`}>
              {description || other_title}
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col-reverse mt-10 lg:space-x-10 md:space-x-5 space-x-0">
          <AnimeInfo dataInfo={dataInfo} />
          <EpisodeList
            slug={slug}
            episodes={episodes_iframe_url || episodes_m3u8_url}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimeSlug;
