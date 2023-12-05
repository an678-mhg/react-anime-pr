import AnimeInfo from "@/components/Anime/AnimeInfo";
import EpisodeList from "@/components/Anime/Episodes";
import FeaturePlayer from "@/components/Anime/FeaturePlayer";
import Player from "@/components/Player";
import { useMetadata } from "@/hooks/useMetadata";
import { getAnimeBySlug } from "@/services/anime";
import { Metadata, NextPage } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { BsChevronRight } from "react-icons/bs";

interface PageContext {
  params: {
    slug: string;
    id: string;
    type: string;
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
    urlPath: `/anime/watch/${slug}/${params?.id}/${params?.type}`,
    image: anime?.data?.info?.image_url,
  });
}

const WatchAnime: NextPage<PageContext> = async ({ params }) => {
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
      title,
      actors,
      countries,
      director,
      language,
      quality,
      time,
      year,
      slug,
      other_title,
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
    <div className="container">
      <div className="text-sm text-gray-400 font-normal flex items-center space-x-4 line-clamp-1">
        <span>Home</span>
        <BsChevronRight className="text-white text-[15px]" />
        <Link href={`/anime/${slug}`}>
          <span className="line-clamp-1">{title}</span>
        </Link>
      </div>
      <div className="mt-5 flex lg:flex-row flex-col lg:space-x-5">
        <div className="flex-1 w-full">
          <div className="aspect-video bg-black">
            {params?.type === "iframe" ? (
              <iframe
                frameBorder="none"
                src={`${episodes_iframe_url?.find(
                  (item) => item?.id === Number(params?.id)
                )?.url
                  }`}
                className="w-full h-full"
                allowFullScreen
              />
            ) : (
              // <div className="w-full h-full" />
              <Player
                src={episodes_m3u8_url?.find((item) => item?.id === Number(params?.id))?.url!}
              />
            )}
          </div>

          <FeaturePlayer
            episodes={
              params?.type === "m3u8" ? episodes_m3u8_url : episodes_iframe_url
            }
          />

          <div className="mt-5 flex rounded-md overflow-hidden">
            <div className="w-[300px] md:block hidden h-full py-2 bg-[#333] text-sm font-normal text-gray-400 pl-4">
              {
                "If current server doesn't work please try other servers beside."
              }
            </div>
            <div className="flex-1 bg-[#222] px-4 py-2 flex justify-center items-center">
              <div className="rounded-md overflow-hidden">
                <Link
                  href={`/anime/watch/${slug}/${episodes_m3u8_url?.[0]?.id}/m3u8`}
                  className={`px-4 md:py-2 py-4 text-sm font-normal ${params?.type === "m3u8" ? "bg-red-500" : "bg-gray-700"
                    }`}
                >
                  M3U8
                </Link>
                <Link
                  href={`/anime/watch/${slug}/${episodes_iframe_url?.[0]?.id}/iframe`}
                  className={`px-4 py-2 text-sm font-normal ${params?.type === "iframe" ? "bg-red-500" : "bg-gray-700"
                    }`}
                >
                  Iframe
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <EpisodeList
              slug={slug}
              episodes={
                params?.type === "m3u8"
                  ? episodes_m3u8_url
                  : episodes_iframe_url
              }
              currentId={params?.id}
            />
          </div>
        </div>
        <AnimeInfo dataInfo={dataInfo} />
      </div>
    </div>
  );
};

export default WatchAnime;
