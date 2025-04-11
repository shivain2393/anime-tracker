import { Anime } from "@/types/anime";
import { graphqlRequest } from "./graphql";

const seasonalAnimeQuery = `
    query($season: MediaSeason, $seasonYear: Int){
        Page(perPage: 100) {
            media(season: $season, seasonYear: $seasonYear, type: ANIME, status_in: [FINISHED, RELEASING, NOT_YET_RELEASED]) {
                id
                title {
                    romaji
                    english
                }
                coverImage {
                    large
                }
                episodes
                nextAiringEpisode {
                    airingAt
                    episode
                }
                startDate {
                    year
                    month
                    day
                }
                genres
            }
        }
    }
`

const genreQuery = `
    query {
        GenreCollection
    }
`

export const fetchSeasonalAnime = async (season: string, year: number) => {
    const data = await graphqlRequest<{
        Page: { media: Anime[] }
    }>(seasonalAnimeQuery, { season, seasonYear: year});

    return data.Page.media;
}

export const fetchAllGenres = async () => {
    const data = await graphqlRequest<{ GenreCollection: string[] }>(genreQuery);
    return data.GenreCollection;
}
