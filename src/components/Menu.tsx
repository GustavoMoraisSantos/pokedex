import { Menu } from "antd";
import type { MenuProps } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { getAllGenerations, getPokemonTypes } from "../services/external-api";
import {
  DesktopOutlined,
  ThunderboltOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
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
  const { loadPokemonsByType, loadPokemons, loadPokemonsByGeneration } =
    contextValue as PokeContextType;

  const handleSelectType = async (e: any) => {
    console.log(e);
    if (e.key === "list") {
      await loadPokemons();
    }
    if (e.keyPath[1] === "types") await loadPokemonsByType(e.key);
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
      generations.map((generation, index) => {
        return getItem(generation, index);
      })
    ),
  ];

  return (
    <StyledMenu
      theme="light"
      defaultSelectedKeys={["list"]}
      mode="inline"
      items={items}
      onClick={(e) => handleSelectType(e)}
    />
  );
}

export default MenuLayout;
