import { Menu } from "antd";
import type { MenuProps } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { getAllGenerations, getPokemonTypes } from "../services/external-api";
import { ThunderboltOutlined, BranchesOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { PokeContextType } from "@/providers/PokeContextType";
import { PokeContext } from "@/providers/Pokemons";
import Icon from "@/assets/PokeBall";

type MenuItem = Required<MenuProps>["items"][number];

const StyledMenu = styled(Menu)`
  ul {
    height: 68vh;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  }
`;

function MenuLayout() {
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [generations, setGenerations] = useState([]);

  const contextValue = useContext(PokeContext);
  const {
    loadPokemonsByType,
    loadPokemons,
    loadPokemonsByGeneration,
    selectedMenuItem,
    setSelectedMenuItem,
  } = contextValue as PokeContextType;

  const handleSelectType = async (e: any) => {
    setSelectedMenuItem([e.key]);

    if (e.key === "list") {
      await loadPokemons();
    }
    if (e.keyPath[1] === "types") {
      let keyFormated = e.key.toLowerCase();
      console.log("key", keyFormated);
      await loadPokemonsByType(keyFormated);
    }
    if (e.keyPath[1] === "generations") {
      const generation = Number(e.key) + 1;
      await loadPokemonsByGeneration(generation);
    }
  };

  const loadPokemonTypes = async () => {
    const PokemonTypes = await getPokemonTypes();
    setPokemonTypes(PokemonTypes);
  };

  const loadGenerations = async () => {
    const generations = await getAllGenerations();
    setGenerations(generations);
  };

  useEffect(() => {
    loadPokemonTypes();
    loadGenerations();
  }, []);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("All Pokemóns", "list", <Icon />),
    getItem(
      "Types",
      "types",
      <ThunderboltOutlined />,
      pokemonTypes.map((type) => {
        return getItem(type, type);
      })
    ),
    getItem(
      "Generations",
      "generations",
      <BranchesOutlined />,
      generations.map((generation: string, index) => {
        const capitalizedGeneration =
          generation.charAt(0).toUpperCase() + generation.slice(1);
        return getItem(capitalizedGeneration, index);
      })
    ),
  ];

  return (
    <StyledMenu
      theme="light"
      defaultSelectedKeys={selectedMenuItem}
      selectedKeys={selectedMenuItem}
      mode="inline"
      items={items}
      onClick={(e) => handleSelectType(e)}
    />
  );
}

export default MenuLayout;
