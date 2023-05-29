"use client";
import React, { useContext, useEffect, useState } from "react";
import { IPokemon } from "@/Utils/types";
import { StyledRow, StyledSearch } from "./styled";
import { PokeContext } from "@/providers/Pokemons";
import { PokeContextType } from "@/providers/PokeContextType";
import PaginationComponent from "@/components/Pagination";
import PokemonCard from "@/components/Card";
import DetailsModal from "@/components/DetailsModal";
import { debounce } from "lodash";
import { Empty } from "antd";

export default function Home() {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemon | undefined>(
    {} as IPokemon
  );
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);

  const contextValue = useContext(PokeContext);
  const {
    pokemons,
    loadPokemons,
    loadSearch,
    setSelectedMenuItem,
    defaultParams,
    visiblePagination,
  } = contextValue as PokeContextType;

  const handleShowDetails = (pokemon: IPokemon) => {
    setSelectedPokemon(pokemon);
    setShowDetail(true);
  };

  const handleSearch = debounce(async (text: string) => {
    setSelectedMenuItem(["list"]);
    setIsLoadingSearch(true);

    if (!text) {
      loadPokemons(defaultParams);
      setIsLoadingSearch(false);
      return;
    }

    await loadSearch(text.toLocaleLowerCase());
    setIsLoadingSearch(false);
  }, 1000);

  useEffect(() => {
    loadPokemons(defaultParams);
  }, [defaultParams]);

  return (
    <>
      <StyledSearch
        placeholder="Search by name or number"
        onSearch={handleSearch}
        loading={isLoadingSearch}
      />

      <StyledRow gutter={{ xs: 16, sm: 14, md: 12, lg: 12, xl: 8, xxl: 4 }}>
        {pokemons &&
          pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              handleShowDetail={handleShowDetails}
            />
          ))}
        {pokemons?.length === 0 && <Empty />}
      </StyledRow>

      {selectedPokemon && (
        <DetailsModal
          showDetail={showDetail}
          onCancel={() => {
            setSelectedPokemon(undefined);
            setShowDetail(false);
          }}
          selectedPokemon={selectedPokemon}
        />
      )}

      {visiblePagination && <PaginationComponent />}
    </>
  );
}
