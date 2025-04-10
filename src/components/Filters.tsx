'use client';

import { AnimeSeasons, capitalize, Seasons } from "@/types/anime";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";

interface FiltersProps {
    query: { season: AnimeSeasons; year: number; };
    setQuery: (query: { season: AnimeSeasons; year: number; }) => void;
}

const Filters = ({ query, setQuery }: FiltersProps ) => {

    return (
        <div className="flex gap-4 items-center">
            <Select value={query.season} onValueChange={(value) => setQuery({...query, season: value as AnimeSeasons})}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                    {Seasons.map((season) => (
                        <SelectItem key={season} value={season}>{capitalize(season)}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Input  type="number" value={query.year} onChange={(e) => setQuery({...query, year: Number(e.target.value)})} className="w-[100px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"/>
        </div>
    )
}

export default Filters;