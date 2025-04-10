export interface Anime {
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
}

export type AnimeSeasons = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL' ;

export const Seasons: AnimeSeasons[] = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}