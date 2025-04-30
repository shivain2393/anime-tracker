"use client";

import { AnimeSeasons, Seasons, Query, SortBy, sortOptions } from "@/types/anime";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { fetchAllGenres } from "@/lib/anilist";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
} from "lucide-react";
import { capitalize } from "@/lib/utils";

interface FiltersProps {
  query: Query;
  setQuery: (query: Query | ((prev: Query) => Query)) => void;
  selectedGenres: string[];
  setSelectedGenres: (
    genres: string[] | ((prev: string[]) => string[])
  ) => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy | ((prev: SortBy) => SortBy)) => void;
  disabled? : boolean;
}

const Filters = ({
  query,
  setQuery,
  selectedGenres,
  setSelectedGenres,
  sortBy,
  setSortBy,
  disabled = false
}: FiltersProps) => {

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear + 2 - 1940 },
    (_, i) => currentYear + 1 - i
  );
  const [genres, setGenres] = useState<string[]>([]);

  const toggleGenres = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  useEffect(() => {
    const getGenres = async () => {
      const data = await fetchAllGenres();
      setGenres(data);
    };

    getGenres();
  }, []);

  return (
    <div className="flex gap-4 items-center flex-wrap">
      <Popover modal={true}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className="w-[140px] justify-between hover:bg-transparent font-normal focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 border-input bg-transparent"
          >
            <span className="flex items-center gap-2">
              {capitalize(sortBy.field)}
              {sortBy.order === "asc" ? (
                <ArrowUp className="size-4 opacity-80" />
              ) : (
                <ArrowDown className="size-4 opacity-80" />
              )}
            </span>
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[140px] text-sm p-1">
            <div className="flex flex-col gap-2">
              {sortOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className="flex justify-between hover:bg-accent py-1.5 px-2"
                  onClick={() => setSortBy((prev) => ({
                    field: option,
                    order: prev.field === option ? (prev.order === "asc" ? "desc" : "asc") : "desc"
                  }))}
                >
                  <span className="flex items-center gap-2">
                    {capitalize(option)}
                    {sortBy.field === option && (
                      sortBy.order === "asc" ?
                      <ArrowUp className="size-4 opacity-80" /> :
                      <ArrowDown className="size-4 opacity-80" />
                    )}
                  </span>
                </button>
              ))}
            </div>
        </PopoverContent>
      </Popover>
      <Popover modal={true}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className="w-[140px] justify-between hover:bg-transparent font-normal focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 border-input bg-transparent"
          >
            {selectedGenres.length > 0
              ? `${selectedGenres.length} selected`
              : "Genres"}
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[140px] text-sm p-1">
          <ScrollArea className="h-60 w-full">
            <div className="flex flex-col gap-2">
              {genres.map((genre) => (
                <button
                  type="button"
                  key={genre}
                  className="flex justify-between hover:bg-accent py-1.5 px-2"
                  onClick={() => toggleGenres(genre)}
                >
                  {genre}
                  {selectedGenres.includes(genre) && (
                    <Check className="size-4 mr-1" />
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <Select
        value={query.season}
        onValueChange={(value) =>
          setQuery({ ...query, season: value as AnimeSeasons })
        }
        disabled={disabled}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Season" />
        </SelectTrigger>
        <SelectContent>
          {Seasons.map((season) => (
            <SelectItem key={season} value={season}>
              {capitalize(season)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={query.year.toString()}
        onValueChange={(value) => setQuery({ ...query, year: parseInt(value) })}
        disabled={disabled}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Year" />
          <SelectContent className="max-h-60">
            <ScrollArea className="h-60 w-full">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </SelectTrigger>
      </Select>
    </div>
  );
};

export default Filters;
