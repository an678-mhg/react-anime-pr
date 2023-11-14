import React, { useMemo } from "react";
import { Swiper } from "swiper/react";
import { Layout } from "../../types/utils";
import useInnerWidth from "../../hooks/useInnerWidth";
import SwiperCore from "swiper";

interface SwiperContainerProps extends Layout {
  xl: number;
  lg: number;
  md: number;
  sm: number;
  spaceBetween: number;
  className?: string;
  onBeforeInit?: ((swiper: SwiperCore) => void) | undefined;
}

const SwiperContainer: React.FC<SwiperContainerProps> = ({
  children,
  lg,
  md,
  sm,
  spaceBetween,
  xl,
  className = "",
  onBeforeInit = () => {},
}) => {
  const width = useInnerWidth();

  const slidesPerView = useMemo(() => {
    return width >= 1200 ? xl : width >= 1024 ? lg : width >= 768 ? md : sm;
  }, [width, lg, md, sm, xl]);

  return (
    <Swiper
      onBeforeInit={onBeforeInit}
      className={className}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
    >
      {children}
    </Swiper>
  );
};

export default SwiperContainer;
