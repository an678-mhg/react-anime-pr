import { Category, Country, Episode } from "./utils";

export interface Anime {
  id: number;
  image_url: string;
  slug: string;
  title: string;
  other_title: string;
  description: string;
  year: string;
}

export interface AnimeDetails {
  info: Info;
  episodes_m3u8_url: Episode[];
  episodes_iframe_url: Episode[];
}

export interface Info {
  id: number;
  title: string;
  other_title: string;
  slug: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  actors: string;
  year: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  categories: Category[];
  countries: Country[];
}
