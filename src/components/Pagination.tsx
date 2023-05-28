import { Pagination } from "antd";

const PaginationComponent = () => {
  return (
    <div
      style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}
    >
      <Pagination defaultCurrent={6} total={500} />
    </div>
  );
};
export default PaginationComponent;
