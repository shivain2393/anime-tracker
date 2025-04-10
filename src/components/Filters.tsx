"use client";

import { Anime, AnimeSeasons, capitalize, Seasons } from "@/types/anime";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

type Query = { season: AnimeSeasons; year: number };

interface FiltersProps {
  query: Query;
  setQuery: (query: Query | ((prev: Query) => Query)) => void;
}

const Filters = ({ query, setQuery }: FiltersProps) => {

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: (currentYear + 2) - 1940 }, (_, i) => (currentYear + 1) - i);

  return (
    <div className="flex gap-4 items-center">
      <Select
        value={query.season}
        onValueChange={(value) =>
          setQuery({ ...query, season: value as AnimeSeasons })
        }
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

      <Select value={query.year.toString()} onValueChange={(value) => setQuery({ ...query, year: parseInt(value)})}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Year" />
            <SelectContent className="max-h-60">
                <ScrollArea className="h-60 w-full">
                    {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                </ScrollArea>
            </SelectContent>
          </SelectTrigger>
      </Select>
    </div>
  );
};

export default Filters;
