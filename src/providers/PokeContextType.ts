import { IPokemon } from "@/Utils/types";

export interface PokeContextType {
  pokemons:IPokemon[] | undefined;
  loadPokemons: () => Promise<void>;
  loadPokemonsByType:(key:string) => Promise<void>;
  loadPokemonsByGeneration: (generation: number) => Promise<void>;
  loadSearch: (name: string) =>  Promise<void>;
}