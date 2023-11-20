import React from "react";
import { InView } from "react-intersection-observer";
import { InfiniteData } from "react-query";
import AnimeCard from "../Anime/AnimeCard";
import { Anime } from "@/types/anime";
import { Pagination } from "@/types/utils";
import Loading from "./Loading";

interface InfinityLoadingProps {
  isLoading: boolean;
  data:
    | InfiniteData<{
        data: Anime[];
        pagination: Pagination;
      } | null>
    | undefined;
  fetchNextPage: Function;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

const InfinityLoading: React.FC<InfinityLoadingProps> = ({
  data,
  fetchNextPage,
  isFetchingNextPage,
  isLoading,
  hasNextPage,
}) => {
  return (
    <div>
      {isLoading && <Loading />}

      {data?.pages?.length === 0 ||
        (data?.pages[0]?.data?.length === 0 && (
          <h6 className="mt-10 font-semibold lg:text-xl text-lg text-center">
            No results
          </h6>
        ))}

      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 mt-5">
        {data &&
          data?.pages
            ?.reduce((final, item) => {
              // @ts-ignore
              final.push(...item?.data);
              return final;
            }, [] as Anime[])
            .map((item) => <AnimeCard key={item?.id} anime={item} />)}
      </div>

      <InView
        fallbackInView
        onChange={(InVidew) => {
          if (InVidew && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      >
        {({ ref }) => (
          <div
            ref={ref}
            className="mt-8 flex w-full items-center justify-center"
          >
            {isFetchingNextPage && <Loading />}
          </div>
        )}
      </InView>
    </div>
  );
};

export default InfinityLoading;
