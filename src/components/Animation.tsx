import React, { useEffect, useState } from "react";
import axios from "axios";

const PokemonAnimationChecker = ({ pokemonId }: { pokemonId: number }) => {
  const [hasAnimation, setHasAnimation] = useState(false);

  useEffect(() => {
    const checkAnimationAvailability = async () => {
      try {
        const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`;
        const response = await axios.get(url);
        if (response.status === 200) {
          setHasAnimation(true);
        } else {
          setHasAnimation(false);
        }
      } catch (error) {
        setHasAnimation(false);
      }
    };

    checkAnimationAvailability();
  }, [pokemonId]);

  return (
    <div>
      {hasAnimation ? (
        <p>O Pokémon {pokemonId} tem uma animação disponível.</p>
      ) : (
        <p>O Pokémon {pokemonId} não tem uma animação disponível.</p>
      )}
    </div>
  );
};

export default PokemonAnimationChecker;
