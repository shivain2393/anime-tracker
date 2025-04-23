"use client";

import AnimeCard from "@/components/AnimeCard";
import AnimeCardSkeleton from "@/components/AnimeCardSkeleton";
import Filters from "@/components/Filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wrapper from "@/components/Wrapper";
import { fetchSeasonalAnime } from "@/lib/anilist";
import { getCurrentAnimeSeason } from "@/lib/animeSeason";
import { capitalize } from "@/lib/utils";
import { Anime, Seasons, Query, SortBy, TabValue } from "@/types/anime";
import { useEffect, useState } from "react";

const Home = () => {
  const currentlyAiringAnime = getCurrentAnimeSeason();
  const [tabText, setTabText] = useState<string>("Upcoming Season");
  const [query, setQuery] = useState<Query>({
    season: currentlyAiringAnime.season,
    year: currentlyAiringAnime.year,
  });
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [tabValue, setTabValue] = useState<TabValue>("airing");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>({
    field: "popularity",
    order: "desc",
  });

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

  const sortAnimeList = (list: Anime[]): Anime[] => {
    const field = sortBy.field;

    const currentList = [...list];

    switch (field) {
      case "popularity":
        if (sortBy.order === "asc") {
          return currentList.sort((a, b) => a.popularity - b.popularity);
        }
        return currentList.sort((a, b) => b.popularity - a.popularity);

      case "score":
        if (sortBy.order === "asc") {
          return currentList.sort((a, b) => a.averageScore - b.averageScore);
        }
        return currentList.sort((a, b) => b.averageScore - a.averageScore);

      case "title":
        if (sortBy.order === "asc") {
          return currentList.sort((a, b) =>
            a.title.romaji.localeCompare(b.title.romaji)
          );
        }
        return currentList.sort((a, b) =>
          b.title.romaji.localeCompare(a.title.romaji)
        );

      case "start date":
        if (sortBy.order === "asc") {
          return currentList.sort(
            (a, b) =>
              new Date(a.startDate.year, a.startDate.month, a.startDate.day)
                .getTime() -
              new Date(b.startDate.year, b.startDate.month, b.startDate.day)
                .getTime()
          );
        }
        return currentList.sort(
          (a, b) =>
            new Date(b.startDate.year, b.startDate.month, b.startDate.day)
              .getTime() -
            new Date(a.startDate.year, a.startDate.month, a.startDate.day)
              .getTime()
        );
      default:
        return currentList;
    }
  };

  useEffect(() => {
    if(filteredAnimes.length > 0) {
      const sortedAnimes = sortAnimeList(filteredAnimes);
      setFilteredAnimes(sortedAnimes);
    }

    if (animeList.length > 0) {
      const sortedAnimes = sortAnimeList(animeList);
      setAnimeList(sortedAnimes);
    }
  }, [sortBy]);

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
  }, [selectedGenres, animeList]);

  const handleTabChange = () => {

    const currentSeasonIndex = Seasons.findIndex(
      (s) => s === currentlyAiringAnime.season
    );
    const nextSeasonIndex = (currentSeasonIndex + 1) % Seasons.length;
    const nextSeason = Seasons[nextSeasonIndex];
    const nextYear =
      nextSeasonIndex === 0 ? currentlyAiringAnime.year + 1 : currentlyAiringAnime.year;


    if (
      query.season === currentlyAiringAnime.season &&
      query.year === currentlyAiringAnime.year
    ) {
      setTabText("Upcoming Season");
      setTabValue("airing");
    } else if (
      query.season === nextSeason && query.year === nextYear
    ) {
      setTabText("Upcoming Season");
      setTabValue("queryAnimes");
    } else {
      setTabText(`${capitalize(query.season)}, ${query.year}`);
      setTabValue("queryAnimes");
    }

    setSortBy({
      field: "popularity",
      order: "desc",
    })
  };

  return (
    <Wrapper>
      <Tabs
        value={tabValue}
        onValueChange={(value) => setTabValue(value as TabValue)}
        className="w-full"
      >
        <div className="flex justify-between items-center flex-wrap mb-6 gap-4 xl:flex-nowrap">
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
            sortBy={sortBy}
            setSortBy={setSortBy}
            disabled={loading}
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
