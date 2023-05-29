import { PokeContextType } from "@/providers/PokeContextType";
import { PokeContext } from "@/providers/Pokemons";
import { Pagination } from "antd";
import { useContext, useState } from "react";

const PaginationComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const contextValue = useContext(PokeContext);
  const { setDefaultParams, totalItems } = contextValue as PokeContextType;

  const pageSizeOptions = ["10", "20", "50", "100"];

  const onChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    const limit = pageSize;
    const offset = (page - 1) * limit;
    setDefaultParams({
      limit,
      offset,
    });
  };

  return (
    <div
      style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}
    >
      <Pagination
        responsive
        onChange={onChange}
        current={currentPage}
        total={totalItems}
        defaultPageSize={50}
        showSizeChanger
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
};

export default PaginationComponent;
