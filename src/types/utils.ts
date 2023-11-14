export interface Layout {
  children: React.ReactNode;
}

export interface NavbarData {
  title: string;
  href: string;
  target?: string;
}

export interface FilterParams {
  category_id?: string[];
  country_id?: string[];
  year?: string;
  page: string;
  limit: string;
}

export interface Pagination {
  page_current: number;
  has_next_page: boolean;
}

export interface Category {
  animeId: number;
  categoryId: number;
  created_at: string;
  updated_at: string;
  category: Category2;
}

export interface Category2 {
  name: string;
  id: number;
}

export interface Country {
  animeId: number;
  countryId: number;
  created_at: string;
  updated_at: string;
  country: Country2;
}

export interface Country2 {
  name: string;
  id: number;
}

export interface Episode {
  id: number;
  name: string;
  url: string;
  type: string;
}

export interface SearchAnimeParams {
  q: string;
  limit: string;
  page: string;
}
