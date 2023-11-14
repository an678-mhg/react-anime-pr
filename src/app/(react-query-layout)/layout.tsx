"use client";

import MainLayout from "@/app/(main-layout)/layout";
import { Layout } from "@/types/utils";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const ReactQueryLayout: React.FC<Layout> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <MainLayout>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MainLayout>
  );
};

export default ReactQueryLayout;
