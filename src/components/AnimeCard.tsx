import { Anime } from "@/types/anime";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import Countdown from "./Countdown";
import { Badge } from "./ui/badge";
import AnilistButton from "./AnilistButton";

const AnimeCard = ({ anime }: { anime: Anime }) => {
    const nextAiringTime = anime.nextAiringEpisode?.airingAt
        ? new Date(anime.nextAiringEpisode.airingAt * 1000)
        : null;

    const formattedNextAiring = nextAiringTime
        ? nextAiringTime.toLocaleString(undefined, {
              weekday: "long",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
          })
        : "No Schedule";

    const totalEpisodes = anime.episodes;
    const airedEpisodes = anime.nextAiringEpisode
        ? anime.nextAiringEpisode.episode - 1
        : totalEpisodes ?? 0;

    return (
        <Card className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors p-0">
            <div className="flex flex-col h-full">
                <div className="relative aspect-[5/5]">
                    <Image
                        src={anime.coverImage.large}
                        alt={anime.title.romaji}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        quality={100}
                        className="object-cover"
                        loading="eager"
                    />
                    <Badge className="absolute top-2 right-2 bg-zinc-800 dark:bg-zinc-700 text-white">
                        EP {airedEpisodes} / {anime.episodes ?? "?"}
                    </Badge>
                </div>
                <CardContent className="flex-1 flex flex-col p-4">
                    <div className="flex flex-col gap-2 mb-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                            {anime.title.romaji}
                        </h3>
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold">
                                Score:{" "}
                                {anime.averageScore
                                    ? anime.averageScore / 10
                                    : "N/A"}
                            </h4>
                            <AnilistButton animeLink={anime.siteUrl}/>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className="flex whitespace-nowrap items-center gap-1 text-zinc-600 dark:text-zinc-300 text-xs mb-2">
                            <Calendar className="size-4" />
                            <span>Upcoming Episode: {formattedNextAiring}</span>
                        </div>

                        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-3 mt-4">
                            <div className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 text-xs mb-1">
                                <Clock className="size-4" />
                                <span>
                                    Countdown to Episode{" "}
                                    {anime.nextAiringEpisode?.episode
                                        ? anime.nextAiringEpisode.episode
                                        : 1}
                                </span>
                            </div>
                            <Countdown targetTime={nextAiringTime} />
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};

export default AnimeCard;
