import { AnimeSeasons } from "@/types/anime";

export const getCurrentAnimeSeason = (): { season: AnimeSeasons; year: number} => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let season: AnimeSeasons;

    if(month >= 1 && month <= 3) {
        season = 'WINTER';
    } else if (month >= 4 && month <= 6) {
        season = 'SPRING';
    } else if (month >= 7 && month <= 9) {
        season =  'SUMMER';
    } else {
        season = 'FALL';
    }

    return { season, year };
}