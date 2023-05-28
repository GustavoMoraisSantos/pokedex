import {
  getPokemons,
  getPokemonsByGeneration,
  getPokemonsByType,
  getPokemsByName,
} from "@/services/external-api";
import { createContext, useState } from "react";
import { ReactNode } from "react";
import { PokeContextType } from "./PokeContextType";

export const PokeContext = createContext<PokeContextType | undefined>(
  undefined
);

export const PokeProvider = (props: { children: ReactNode }) => {
  const [pokemons, setPokemons] = useState<any[]>();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string[]>(["list"]);

  const loadPokemons = async () => {
    const pokemons = await getPokemons();
    setPokemons(pokemons);
  };

  const loadPokemonsByType = async (type: string) => {
    const pokemons = await getPokemonsByType(type);
    setPokemons(pokemons);
  };

  const loadPokemonsByGeneration = async (generation: number) => {
    const pokemons = await getPokemonsByGeneration(generation);
    setPokemons(pokemons);
  };

  const loadSearch = async (name: string) => {
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
  };
  return (
    <PokeContext.Provider value={values}>{props.children}</PokeContext.Provider>
  );
};
