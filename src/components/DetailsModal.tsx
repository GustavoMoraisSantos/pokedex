import { IPokemon } from "@/Utils/types";
import { Col, Modal, Row, Tag } from "antd";
import Image from "next/image";

interface Props {
  selectedPokemon: IPokemon;
  showDetail: boolean;
  onCancel: () => void;
}

const DetailsModal = ({ selectedPokemon, showDetail, onCancel }: Props) => {
  const statColor = (stat: string) => {
    switch (stat) {
      case "hp":
        return "red";
      case "attack":
        return "orange";
      case "defense":
        return "blue";
      case "special-attack":
        return "purple";
      case "special-defense":
        return "green";
      case "speed":
        return "yellow";
      default:
        return "";
    }
  };
  return (
    <Modal
      title={
        selectedPokemon?.name?.charAt(0).toUpperCase() +
        selectedPokemon?.name?.slice(1)
      }
      open={showDetail}
      footer={null}
      onCancel={onCancel}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Row gutter={[0, 0]}>
            {selectedPokemon?.stats?.map((stat: any) => (
              <Col span={24} key={stat.name}>
                <Tag color={statColor(stat.name)}>
                  {stat.name}: {stat.base_stat}
                </Tag>
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={12}>
          <Image
            width={150}
            height={150}
            src={selectedPokemon.imageUrl}
            alt={selectedPokemon.name}
          />
        </Col>
      </Row>
    </Modal>
  );
};
export default DetailsModal;
