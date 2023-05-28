"use client";
import React, { useContext, useEffect, useState } from "react";
import { IPokemon } from "@/Utils/types";
import { StyledRow, StyledSearch } from "./styled";
import { PokeContext } from "@/providers/Pokemons";
import { PokeContextType } from "@/providers/PokeContextType";
import PaginationComponent from "@/components/Pagination";
import PokemonCard from "@/components/Card";
import DetailsModal from "@/components/DetailsModal";

export default function Home() {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemon | undefined>(
    {} as IPokemon
  );
  const [searchText, setSearchText] = useState("");

  const contextValue = useContext(PokeContext);
  const { pokemons, loadPokemons, loadSearch } =
    contextValue as PokeContextType;

  const handleShowDetails = (pokemon: IPokemon) => {
    setSelectedPokemon(pokemon);
    setShowDetail(true);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      loadSearch(searchText);
    }, 1000);

    return () => {
      clearTimeout(delayedSearch);
    };
  }, [searchText]);

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <>
      <StyledSearch
        placeholder="Search by name"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
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

      <PaginationComponent />
    </>
  );
}
