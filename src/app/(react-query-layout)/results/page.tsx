"use client";

import InfinityLoading from "@/components/Shared/InfinityLoading";
import { searchAnime } from "@/services/anime";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { useInfiniteQuery } from "react-query";

interface PageContext {
  searchParams: {
    q: string;
  };
}

const Results: NextPage<PageContext> = ({ searchParams }) => {
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery(
    [`search-${searchParams?.q}`],
    (pageParams) =>
      searchAnime({
        limit: "20",
        q: searchParams?.q,
        page: pageParams?.pageParam?.toString() || "1",
      }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.pagination?.has_next_page
          ? lastPage?.pagination?.page_current + 1
          : null;
      },
    }
  );

  if (!searchParams?.q?.trim()) return notFound();
  if (isError) return notFound();

  return (
    <div className="container">
      <h2 className="font-semibold lg:text-xl text-lg">{`Results for "${searchParams?.q?.toLocaleUpperCase()}"`}</h2>

      <InfinityLoading
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage!}
        isFetchingNextPage={isFetchingNextPage}
        data={data}
      />
    </div>
  );
};

export default Results;
