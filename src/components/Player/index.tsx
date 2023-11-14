"use client";

import ReactHlsPlayer from "react-hls-player";
import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiVolumeUp } from "react-icons/hi";
import { AiFillSetting } from "react-icons/ai";
import { CgMiniPlayer } from "react-icons/cg";
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";
import { formatVideoTime, playSpeedOptions } from "@/shared/contants";
import { FaVolumeMute } from "react-icons/fa";
import { CircularProgress } from "react-cssfx-loading";
import MainSettings from "./Settings/MainSettings";
import PlaySpeedSettings from "./Settings/PlaySpeedSettings";

export interface Source {
  url: string;
  label: string;
}

interface PlayerProps {
  source: Source[];
  className: string;
  poster: string;
  color: string;
}

const Player: React.FC<PlayerProps> = ({
  className,
  source,
  poster,
  color,
}) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const seekRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const timeoutSeekRef = useRef<any>(null);

  const [currentPlaySpeed, setCurrePlaySpeed] = useState(3);
  const [showControl, setShowControl] = useState(true);
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsType, setSettingsType] = useState<"main" | "playspeed">(
    "main"
  );
  const [volume, setVolume] = useState(100);
  const [seeking, setSeeking] = useState(false);

  const handlePlayPause = () => {
    const player = playerRef.current;
    if (!player) return;

    if (play) {
      setPlay(false);
      player?.pause();
    } else {
      setPlay(true);
      player?.play();
    }
  };

  const handleFullScreen = () => {
    if (!videoContainerRef?.current) return;
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoContainerRef?.current?.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (seeking) {
      return;
    }

    const player = playerRef.current;
    if (!player) return;

    setCurrentTime(player?.currentTime);
  };

  const handleSeekTime = (e: any) => {
    const clientX = e?.clientX || e?.touches?.[0]?.clientX || 0;
    const left = seekRef.current?.getBoundingClientRect().left as number;
    const width = seekRef.current?.getBoundingClientRect().width as number;
    const percent = (clientX - left) / width;

    document.body.style.userSelect = "none";

    if (timeoutSeekRef?.current) {
      clearTimeout(timeoutSeekRef?.current);
    }

    timeoutSeekRef.current = setTimeout(() => {
      if (clientX <= left) {
        if (playerRef !== null && playerRef?.current !== null) {
          playerRef.current.currentTime = 0;
        }
        setSeeking(false);
        return;
      }

      if (clientX >= width + left) {
        if (playerRef !== null && playerRef?.current !== null) {
          playerRef.current.currentTime = playerRef?.current?.duration;
        }
        setSeeking(false);
        return;
      }

      if (playerRef !== null && playerRef?.current !== null) {
        playerRef.current.currentTime = percent * playerRef.current?.duration;
      }

      setSeeking(false);
    }, 500);

    if (playerRef !== null && playerRef?.current !== null) {
      setCurrentTime(percent * (playerRef?.current.duration as number));
    }
  };

  const handleToggleMuted = () => {
    if (muted) {
      setMuted(false);
      if (playerRef !== null && playerRef?.current !== null) {
        playerRef.current.muted = false;
        setVolume(100);
      }
    } else {
      setMuted(true);
      if (playerRef !== null && playerRef?.current !== null) {
        playerRef.current.muted = true;
        setVolume(0);
      }
    }
  };

  const handleChangePlaySpeed = (index: number, value: number) => {
    setCurrePlaySpeed(index);
    if (playerRef !== null && playerRef?.current !== null) {
      playerRef.current.playbackRate = value;
    }
    setShowSettings(false);
    setSettingsType("main");
  };

  const handleVideoPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      playerRef?.current?.requestPictureInPicture();
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  useEffect(() => {
    if (playerRef !== null && playerRef?.current !== null) {
      playerRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    let timeout: any;

    if (!play || !showControl || showSettings || seeking) {
      return;
    }

    timeout = setTimeout(() => {
      setShowControl(false);
    }, 6000);

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [showControl, play, showSettings, seeking]);

  // handle seek time in pc with mouse event
  useEffect(() => {
    const handleMouseDown = () => {
      setSeeking(true);
      document.addEventListener("mousemove", handleSeekTime);
    };

    seekRef?.current?.addEventListener("mousedown", handleMouseDown);

    return () => {
      seekRef?.current?.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // remove mouse move when mouse up
  useEffect(() => {
    const handleMouseUp = () => {
      document.body.style.userSelect = "auto";
      document.removeEventListener("mousemove", handleSeekTime);
    };

    document?.addEventListener("mouseup", handleMouseUp);

    return () => {
      document?.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen((prev) => !prev);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  // handle seek time in mobile with touch event
  useEffect(() => {
    const handleTouchStart = () => {
      setSeeking(true);
      document.addEventListener("touchmove", handleSeekTime);
    };

    seekRef?.current?.addEventListener("touchstart", handleTouchStart);

    return () => {
      seekRef?.current?.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  useEffect(() => {
    const handleTouchEnd = () => {
      document.body.style.userSelect = "auto";
      document.removeEventListener("touchmove", handleSeekTime);
    };

    seekRef?.current?.addEventListener("touchend", handleTouchEnd);

    return () => {
      seekRef?.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={videoContainerRef}
      onMouseMove={() => {
        setShowControl(true);
      }}
      onMouseLeave={() => {
        if (seeking) {
          return;
        }

        setShowControl(false);
      }}
      onClick={() => setShowControl(true)}
      className="w-full h-full relative flex items-center justify-center"
    >
      <ReactHlsPlayer
        src={source?.[0]?.url}
        playerRef={playerRef}
        className={`${className}`}
        poster={poster}
        onPlay={() => setPlay(true)}
        onPause={() => setPlay(false)}
        onTimeUpdate={handleTimeUpdate}
        onCanPlay={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        onLoad={() => setLoading(true)}
      />
      {/* Loading */}
      {loading && (
        <div className="absolute z-[100] top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%]">
          <CircularProgress color="#fff" />
        </div>
      )}
      <div
        onClick={() => setShowSettings(false)}
        style={{ display: showControl ? "flex" : "none" }}
        className="absolute inset-0 opacity-animation py-2 transition-colors bg-[rgba(0,0,0,0.6)] items-end"
      >
        {/* Menu select play speed, quanlity, subtitle */}
        {showSettings && (
          <div
            onClick={() => setShowSettings(false)}
            className="md:absolute fixed flex items-end bottom-0 right-0 md:bg-transparent bg-[rgba(0,0,0,0.6)] left-0 md:left-auto top-0 md:top-auto md:bottom-[40px] z-10 md:w-[300px]"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] p-1 w-full"
            >
              {settingsType === "main" ? (
                <MainSettings
                  currentSpeed={playSpeedOptions?.[currentPlaySpeed]?.label}
                  setSettingsType={setSettingsType}
                />
              ) : (
                <PlaySpeedSettings
                  handleChangePlaySpeed={handleChangePlaySpeed}
                  currentPlaySpeed={currentPlaySpeed}
                  setSettingsType={setSettingsType}
                />
              )}
            </div>
          </div>
        )}
        <div onClick={(e) => e.stopPropagation()} className="w-full">
          {/* Seek time */}
          <div
            ref={seekRef}
            onClick={handleSeekTime}
            className="py-2 w-full relative cursor-pointer"
          >
            <div className="w-full h-[3px] bg-gray-400 relative">
              <div
                style={{
                  width: `${
                    (currentTime * 100) /
                    (playerRef?.current?.duration as number)
                  }%`,
                  backgroundColor: color,
                }}
                className="absolute top-0 bottom-0 bg-red-500"
              />
            </div>
          </div>
          {/* Main control */}
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="flex items-center justify-between px-2"
          >
            <div className="flex items-center space-x-3">
              {!loading ? (
                <div onClick={handlePlayPause} className="cursor-pointer">
                  {play ? <BsPauseFill size={30} /> : <BsPlayFill size={30} />}
                </div>
              ) : (
                <CircularProgress color="#fff" width={30} height={30} />
              )}
              <div className="flex items-center space-x-3">
                <div onClick={handleToggleMuted} className="cursor-pointer">
                  {muted ? (
                    <FaVolumeMute size={25} />
                  ) : (
                    <HiVolumeUp size={25} />
                  )}
                </div>
                <input
                  value={volume}
                  onChange={handleVolumeChange}
                  className="md:block hidden w-[100px] h-[4px]"
                  type="range"
                />
              </div>
              <div className="md:text-sm text-xs font-normal text-justify">
                {formatVideoTime(currentTime)}
                {" / "}
                {formatVideoTime(playerRef?.current?.duration as number)}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AiFillSetting
                onClick={() => setShowSettings(!showSettings)}
                className="cursor-pointer"
                size={25}
              />
              <CgMiniPlayer
                onClick={handleVideoPicture}
                className="cursor-pointer"
                size={25}
              />
              <div onClick={handleFullScreen} className="cursor-pointer">
                {fullScreen ? (
                  <BiExitFullscreen size={25} />
                ) : (
                  <BiFullscreen size={25} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
