"use client";

import AnimeCard from "@/components/AnimeCard";
import AnimeCardSkeleton from "@/components/AnimeCardSkeleton";
import Filters from "@/components/Filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wrapper from "@/components/Wrapper";
import { fetchSeasonalAnime } from "@/lib/anilist";
import { getCurrentAnimeSeason } from "@/lib/animeSeason";
import { Anime, capitalize, Seasons } from "@/types/anime";
import { useEffect, useState } from "react";

const Home = () => {
  const currentlyAiringAnime = getCurrentAnimeSeason();
  const [tabText, setTabText] = useState<string>("Upcoming Season");
  const [query, setQuery] = useState({
    season: currentlyAiringAnime.season,
    year: currentlyAiringAnime.year,
  });
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [tabValue, setTabValue] = useState<string>("airing");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const renderAnimeCards = () => {
    if (loading) {
      return Array.from({ length: 20 }).map((_, index) => (
        <AnimeCardSkeleton key={index} />
      ));
    }

    if (selectedGenres.length > 0) {
      if (filteredAnimes.length > 0) {
        return filteredAnimes.map((anime, index) => (
          <AnimeCard key={index} anime={anime} />
        ));
      } else {
        return (
          <div className="font-semibold text-xl col-span-full mx-auto mt-20">
            No animes found with selected Genres.
          </div>
        );
      }
    } else {
      if (animeList.length > 0) {
        return animeList.map((anime, index) => (
          <AnimeCard key={index} anime={anime} />
        ));
      } else {
        return (
          <div className="font-semibold text-xl col-span-full mx-auto mt-20">
            No animes found
          </div>
        );
      }
    }
  };

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        setLoading(true);
        const data = await fetchSeasonalAnime(query.season, query.year);
        setAnimeList(data);
        setLoading(false);
      } catch (error) {
        setAnimeList([]);
        console.log("An error has occurred while fetching data: ", error);
        setLoading(false);
      }
    };

    handleTabChange();
    fetchAnimes();
  }, [query]);

  useEffect(() => {
    if (selectedGenres.length === 0) return;

    const filtered = animeList.filter((anime) =>
      anime.genres.some((genre) => selectedGenres.includes(genre))
    );

    setFilteredAnimes(filtered);
  }, [selectedGenres]);

  const handleTabChange = () => {
    if (
      query.season === currentlyAiringAnime.season &&
      query.year === currentlyAiringAnime.year
    ) {
      setTabText("Upcoming Season");
      setTabValue("airing");
    } else if (
      query.season ===
      Seasons[
        (Seasons.findIndex((s) => s === currentlyAiringAnime.season) + 1) %
          Seasons.length
      ]
    ) {
      setTabText("Upcoming Season");
      setTabValue("queryAnimes");
    } else {
      setTabText(`${capitalize(query.season)}, ${query.year}`);
      setTabValue("queryAnimes");
    }
  };

  return (
    <Wrapper>
      <Tabs
        value={tabValue}
        onValueChange={(value) => setTabValue(value)}
        className="w-full"
      >
        <div className="flex justify-between items-center flex-wrap mb-6 gap-4 lg:flex-nowrap">
          <TabsList className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full max-w-md">
            <TabsTrigger
              onClick={() => setQuery(currentlyAiringAnime)}
              value="airing"
              className="w-1/2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100"
            >
              Currently Airing
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                if (query.season === "FALL") {
                  setQuery({ ...query, year: query.year + 1 });
                }

                setQuery({
                  ...query,
                  season:
                    Seasons[
                      (Seasons.findIndex(
                        (s) => s === currentlyAiringAnime.season
                      ) +
                        1) %
                        Seasons.length
                    ],
                });
              }}
              value="queryAnimes"
              className="w-1/2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100"
            >
              {tabText}
            </TabsTrigger>
          </TabsList>
          <Filters
            query={query}
            setQuery={setQuery}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
        </div>

        {/* Currently Airing Anime */}
        <TabsContent value="airing" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {renderAnimeCards()}
          </div>
        </TabsContent>

        {/* filtered anime */}
        <TabsContent value="queryAnimes" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {renderAnimeCards()}
          </div>
        </TabsContent>
      </Tabs>
    </Wrapper>
  );
};

export default Home;
