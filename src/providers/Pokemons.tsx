import {
  getPokemons,
  getPokemonsByGeneration,
  getPokemonsByType,
  getPokemsByName,
} from "@/services/external-api";
import { createContext, useState } from "react";
import { ReactNode } from "react";
import { PokeContextType } from "./PokeContextType";
import { IDefaultParam } from "@/Utils/types";

export const PokeContext = createContext<PokeContextType | undefined>(
  undefined
);

export const PokeProvider = (props: { children: ReactNode }) => {
  const [pokemons, setPokemons] = useState<any[]>();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string[]>(["list"]);
  const [totalItems, setTotalItems] = useState<number>(50);
  const [visiblePagination, setVisiblePagination] = useState<boolean>(true);
  const [defaultParams, setDefaultParams] = useState<IDefaultParam>({
    offset: 0,
    limit: 50,
  });

  const loadPokemons = async (defaultParams: IDefaultParam) => {
    setVisiblePagination(true);
    const response = await getPokemons(defaultParams);
    const pokemons = response?.pokemons;
    setTotalItems(response?.totalItems);
    setPokemons(pokemons);
  };

  const loadPokemonsByType = async (type: string) => {
    setVisiblePagination(false);
    const pokemons = await getPokemonsByType(type);
    setPokemons(pokemons);
  };

  const loadPokemonsByGeneration = async (generation: number) => {
    setVisiblePagination(false);
    const pokemons = await getPokemonsByGeneration(generation);
    setPokemons(pokemons);
  };

  const loadSearch = async (name: string) => {
    setVisiblePagination(false);
    const pokemon = await getPokemsByName(name);
    setPokemons(pokemon);
  };

  const values = {
    pokemons,
    loadPokemons,
    loadPokemonsByType,
    loadPokemonsByGeneration,
    loadSearch,
    selectedMenuItem,
    setSelectedMenuItem,
    defaultParams,
    setDefaultParams,
    totalItems,
    visiblePagination,
  };
  return (
    <PokeContext.Provider value={values}>{props.children}</PokeContext.Provider>
  );
};
