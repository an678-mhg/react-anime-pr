"use client";

import React, { useEffect } from "react";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

const LoadingCircle = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return <></>;
};

export default LoadingCircle;
