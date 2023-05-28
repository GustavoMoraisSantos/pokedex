import { IPokemon } from "@/Utils/types";
import { Modal } from "antd";
import Image from "next/image";

interface Props {
  selectedPokemon: IPokemon;
  showDetail: boolean;
  onCancel: () => void;
}

const DetailsModal = ({ selectedPokemon, showDetail, onCancel }: Props) => {
  return (
    <Modal
      title={selectedPokemon.name}
      open={showDetail}
      footer={null}
      onCancel={onCancel}
    >
      <div style={{ display: "flex" }}>
        <div>
          <p>{selectedPokemon.name}</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
        <div>
          <Image
            width={150}
            height={150}
            src={selectedPokemon.imageUrl}
            // src={
            //   "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif"
            // }
            alt={selectedPokemon.name}
          />
        </div>
      </div>
    </Modal>
  );
};
export default DetailsModal;
