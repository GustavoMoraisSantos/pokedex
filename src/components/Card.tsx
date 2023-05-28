"use client";
import { IPokemon } from "@/Utils/types";
import { SettingOutlined } from "@ant-design/icons";
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
        title={pokemon.name}
        extra={<Image src={pokemon.imageUrl} width={100} height={100} alt="" />}
        style={{ minWidth: 240, width: 350 }}
        actions={[
          <SettingOutlined
            onClick={() => handleShowDetail(pokemon)}
            key="setting"
          />,
        ]}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Col>
  );
};
export default PokemonCard;
