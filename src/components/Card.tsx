"use client";
import { IPokemon } from "@/Utils/types";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Card, Col } from "antd";
import Image from "next/image";

interface Props {
  pokemon: IPokemon;
  handleShowDetail: (pokemon: IPokemon) => void;
}

const PokemonCard = ({ pokemon, handleShowDetail }: Props) => {
  return (
    <Col
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
      xs={16}
      sm={14}
      md={12}
      lg={12}
      xl={8}
      xxl={4}
      key={pokemon.name}
    >
      <Card
        title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        extra={<Image src={pokemon.imageUrl} width={100} height={100} alt="" />}
        style={{ minWidth: 240, width: 350 }}
        actions={[
          <PlusCircleOutlined
            onClick={() => handleShowDetail(pokemon)}
            key="setting"
          />,
        ]}
      >
        {pokemon?.id && <p>Number: #{pokemon.id}</p>}
        {pokemon?.types && <p>Type: {pokemon.types}</p>}
      </Card>
    </Col>
  );
};
export default PokemonCard;
