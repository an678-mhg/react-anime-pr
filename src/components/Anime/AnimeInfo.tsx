import React from "react";

interface AnimeInfoProps {
  dataInfo: { labels: string; value: string }[];
}

const AnimeInfo: React.FC<AnimeInfoProps> = ({ dataInfo }) => {
  return (
    <div className="space-y-4 md:w-[230px] w-full md:mt-0 mt-10">
      {dataInfo?.map((item) => (
        <div key={item?.labels}>
          <h4 className="text-gray-500 font-normal text-sm">{item?.labels}</h4>
          <p className="mt-1 text-sm text-gray-300 font-semibold">
            {item?.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnimeInfo;
