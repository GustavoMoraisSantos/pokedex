import { Input, Row } from "antd";
import styled from "styled-components";

const { Search } = Input;

export const StyledRow = styled(Row)`
display: flex;
margin: 8px;
justify-content: center;
height: 72vh; /* Define a altura fixa */
overflow-y: auto; /* Adiciona o scroll vertical */
/* Estilizando o scroll vertical */
::-webkit-scrollbar {
  width: 8px; /* Largura do scroll */
}
::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Cor de fundo do track */
}
::-webkit-scrollbar-thumb {
  background-color: #888; /* Cor do thumb */
  border-radius: 4px; /* Forma do thumb */
}
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Cor do thumb ao passar o mouse */
}
`;

export const StyledSearch = styled(Search)`
  width: 20%;
`;
