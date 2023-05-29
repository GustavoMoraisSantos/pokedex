import { IDefaultParam, IPokemon } from "@/Utils/types";

export interface PokeContextType {
  pokemons:IPokemon[] | undefined;
  loadPokemons: (params: IDefaultParam) => Promise<void>;
  loadPokemonsByType:(key:string) => Promise<void>;
  loadPokemonsByGeneration: (generation: number) => Promise<void>;
  loadSearch: (name: string) =>  Promise<void>;
  selectedMenuItem: string[];
  setSelectedMenuItem: React.Dispatch<React.SetStateAction<string[]>>;
  defaultParams: IDefaultParam;
  setDefaultParams:  React.Dispatch<React.SetStateAction<any>>;
  totalItems: number;
  visiblePagination: boolean;
}