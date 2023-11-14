import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { SiSpeedtest } from "react-icons/si";

interface MainSettingsProps {
  setSettingsType: React.Dispatch<React.SetStateAction<"main" | "playspeed">>;
  currentSpeed: string;
}

const MainSettings: React.FC<MainSettingsProps> = ({
  setSettingsType,
  currentSpeed,
}) => {
  return (
    <div className="w-full">
      <div
        onClick={() => setSettingsType("playspeed")}
        className="flex items-center justify-between cursor-pointer p-2 space-x-3"
      >
        <div className="flex items-center space-x-3">
          <SiSpeedtest size={20} />
          <p className="text-sm font-semibold">Play speed</p>
        </div>
        <div className="flex items-center space-x-3">
          <p className="text-sm font-semibold line-clamp-1">{currentSpeed}</p>
          <AiOutlineRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default MainSettings;
