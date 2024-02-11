import { Pagination } from "@mui/material";

function Paginate({ rowCount, pagination,handleChange }) {
  return (
    <Pagination
      count={Math.ceil(rowCount / pagination.pageSize)}
      page={pagination.pageIndex}
      onChange={handleChange}
    />
  );
}

export default Paginate;
