import { React, useMemo, useEffect, useState } from "react";
import api from "./helpers/Gateway";
import { MaterialReactTable } from "material-react-table";
import Dayjs from "dayjs";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
const Home = () => {
  const [myData, setMyData] = useState();
  const [loading, setLoading] = useState(true);

  const getData = () => {
    api.get(`store/products/`).then((res) => {
      setMyData(res.data.results);
      setLoading(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  // //should be memoized or stable
  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: "name", //access nested data with dot notation
  //       header: "Name",
  //       size: 150,
  //     },

  //     {
  //       accessorKey: "status",
  //       header: "Status",
  //       size: 150,
  //     },
  //     {
  //       accessorKey: "comments", //normal accessorKey
  //       header: "Comments",
  //       size: 200,
  //     },
  //     {
  //       accessorFn: (row) => Dayjs(row.start_date).format("DD, MMM YYYY"), //custom accessor function with dot notation for nested data)
  //       header: "Start Date",
  //       size: 150,
  //     },
  //     {
  //       accessorFn: (row) => Dayjs(row.end_date).format("DD, MMM YYYY"),
  //       header: "End Date",
  //       size: 150,
  //     },
  //   ],
  //   []
  // );

  // Memoized columns definition
  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Product",
        size: 150,
      },
      {
        accessorKey: "unit_price",
        header: "Unit Price",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
      },
      { accessorKey: "inventory", header: "Inventory", size: 200 },
      { accessorKey: "price_with_tax", header: "Price + Tax", size: 200 },
      { accessorKey: "collection", header: "Collection", size: 200 },
    ],
    []
  );

  return (
    <div>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={myData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton
                color="secondary"
                component={Link}
                to={`edit/${row.original.id}`}>
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                component={Link}
                to={`delete/${row.original.id}`}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />
      )}
    </div>
  );
};

export default Home;
