"use client";

import { Episode } from "@/types/utils";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FcNext, FcPrevious } from "react-icons/fc";

interface FeaturePlayerProps {
  episodes: Episode[];
}

const FeaturePlayer: React.FC<FeaturePlayerProps> = ({ episodes }) => {
  const { id, slug, type } = useParams();
  const router = useRouter();
  const index = episodes?.findIndex((item) => item.id?.toString() === id);

  const handleNext = () => {
    if (index < episodes?.length - 1) {
      router?.push(`/anime/watch/${slug}/${episodes[index + 1].id}/${type}`);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      router?.push(`/anime/watch/${slug}/${episodes[index - 1].id}/${type}`);
    }
  };

  return (
    <div className="mt-5 flex md:items-center md:justify-end justify-center">
      <div className="flex items-center space-x-10">
        <div
          onClick={handlePrev}
          className={`flex items-center space-x-2 cursor-pointer ${
            index < 0 ? "text-white" : "text-gray-600 cursor-not-allowed"
          }`}
        >
          <FcPrevious className="text-[20px]" />
          <span className="font-medium">Prev</span>
        </div>

        <div
          onClick={handleNext}
          className={`flex items-center space-x-2 cursor-pointer ${
            index < episodes?.length - 1
              ? "text-white"
              : "text-gray-600 cursor-not-allowed"
          }`}
        >
          <span className="font-medium">Next</span>
          <FcNext className="text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default FeaturePlayer;
