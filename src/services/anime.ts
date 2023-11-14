import { client } from "@/shared/fetch";
import { Anime, AnimeDetails } from "@/types/anime";
import {
  Category2,
  Country2,
  FilterParams,
  Pagination,
  SearchAnimeParams,
} from "@/types/utils";

export const getAnimeUpdatedAt = async () => {
  try {
    const response = await client.get<Promise<{ data: Anime[] }>>(
      "api/anime/updated_at"
    );
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const filterAnime = async (filter: FilterParams) => {
  try {
    const response = await client.post<
      Promise<{ data: Anime[]; pagination: Pagination }>
    >("api/anime/filter", filter);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getHomeData = async () => {
  try {
    const labels = [
      "Recently Updated",
      "Recently Action Anime",
      "Recently Adventure Anime",
      "Recently Comady Anime",
    ];

    const response = await Promise.all([
      getAnimeUpdatedAt(),
      filterAnime({
        category_id: ["15"],
        country_id: ["1"],
        year: "2023",
        limit: "20",
        page: "1",
      }),
      filterAnime({
        category_id: ["4"],
        country_id: ["1"],
        year: "2023",
        limit: "20",
        page: "1",
      }),
      filterAnime({
        category_id: ["1"],
        country_id: ["1"],
        year: "2023",
        limit: "20",
        page: "1",
      }),
    ]);

    return response?.map((item, index) => ({
      title: labels[index],
      data: item,
    }));
  } catch (error) {
    return null;
  }
};

export const getAnimeBySlug = async (slug: string) => {
  try {
    const response = await client.get<Promise<{ data: AnimeDetails }>>(
      `api/anime/detail/${slug}`
    );
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const searchAnime = async ({ limit, page, q }: SearchAnimeParams) => {
  try {
    const response = await client.post<
      Promise<{ data: Anime[]; pagination: Pagination }>
    >("api/anime/search", { q, limit, page });
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const getMetadata = async () => {
  try {
    const response = await client.get<
      Promise<{ data: { categories: Category2[]; countries: Country2[] } }>
    >("api/anime/metadata");
    return response?.data;
  } catch (error) {
    return null;
  }
};
