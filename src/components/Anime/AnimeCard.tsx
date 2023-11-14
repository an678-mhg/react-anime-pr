import { Anime } from "@/types/anime";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  return (
    <Link href={`/anime/${anime?.slug}`}>
      <div className="hover:text-red-500">
        <div className="w-full aspect-[2/3] bg-[#222] relative rounded-sm overflow-hidden">
          <Image
            src={anime?.image_url}
            alt={anime?.title}
            layout="fill"
            className="hover:scale-105 transition"
          />
        </div>

        <h3 className="text-sm font-normal line-clamp-1 mt-3 hover:text-red-500">
          {anime?.title}
        </h3>
      </div>
    </Link>
  );
};

export default AnimeCard;
