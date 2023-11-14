import { Episode } from "@/types/utils";
import Link from "next/link";
import React from "react";

interface EpisodeListProps {
  episodes: Episode[];
  slug: string;
  currentId?: string;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  slug,
  currentId,
}) => {
  return (
    <div className="flex-1">
      <div className="grid xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-6 grid-cols-4 gap-4">
        {episodes?.map((item) => (
          <Link
            className={`py-2 px-4 rounded-md text-center ${
              currentId && item?.id === Number(currentId)
                ? "bg-red-500"
                : "bg-[#222]"
            } block`}
            href={`/anime/watch/${slug}/${item?.id}/${item?.type}`}
            key={item?.id}
          >
            {item?.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
