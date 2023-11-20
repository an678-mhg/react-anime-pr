import { domain } from "@/shared/contants";
import { Metadata } from "next";

type Params = {
  title: string;
  description: string;
  urlPath: string;
  image?: string;
};

export const useMetadata = (params: Params) => {
  const { title, description, urlPath, image = "/icon.svg" } = params;

  return {
    title: `${title} | React Anime`,
    description,
    alternates: {
      canonical: domain + urlPath,
    },
    openGraph: {
      title: `${title} | React Anime`,
      description,
      url: domain + urlPath,
      type: "website",
      siteName: "React Anime",
      locale: "vi-VN",
      images: image,
    },
    twitter: {
      title: `${title} | React Anime`,
      description,
      card: "summary",
      images: image,
    },
    referrer: "origin",
    robots: {
      follow: true,
      index: true,
    },
    metadataBase: new URL(domain),
  } as Metadata;
};
