export type Anime = {
  id: number;
  title: {
    romaji: string;
    english?: string;
  };
  coverImage: {
    large: string;
  };
  episodes: number;
  nextAiringEpisode?: {
    airingAt: number;
    episode: number;
  };
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  genres: string[];
  popularity: number;
  averageScore: number;
  description: string;
}

export type AnimeSeasons = "WINTER" | "SPRING" | "SUMMER" | "FALL";

export const Seasons: AnimeSeasons[] = ["WINTER", "SPRING", "SUMMER", "FALL"];

export type Order = "asc" | "desc";

export type TabValue = "airing" | "queryAnimes";

export type Query = { season: AnimeSeasons; year: number };

export type SortBy = { field: string; order: Order };

export const sortOptions: string[] = ["popularity", "score", "countdown", "title", "start date"];


