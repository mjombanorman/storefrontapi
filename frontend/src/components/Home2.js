import { React, useMemo, useEffect, useState } from "react";
import api from "./helpers/Gateway";

import Dayjs from "dayjs";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";


const Home = () => {
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

// const res = {
//   count: 1000,
//   next: "http://localhost:8000/store/products/?page=2",
//   previous: null,
//   results: [
//     {
//       id: 648,
//       title: "7up Diet, 355 Ml",
//       unit_price: 79.07,
//       slug: "-",
//       description:
//         "tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est",
//       inventory: 82,
//       price_with_tax: 86.977,
//       collection: 5,
//       images: [],
//     },
//     {
//       id: 905,
//       title: "Absolut Citron",
//       unit_price: 88.2,
//       slug: "-",
//       description:
//         "dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros",
//       inventory: 32,
//       price_with_tax: 97.02000000000001,
//       collection: 4,
//       images: [],
//     },
//     {
//       id: 288,
//       title: "Allspice - Jamaican",
//       unit_price: 46.53,
//       slug: "-",
//       description:
//         "rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis",
//       inventory: 71,
//       price_with_tax: 51.18300000000001,
//       collection: 4,
//       images: [],
//     },
//     {
//       id: 660,
//       title: "Amaretto",
//       unit_price: 96.34,
//       slug: "-",
//       description:
//         "tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id",
//       inventory: 57,
//       price_with_tax: 105.974,
//       collection: 4,
//       images: [],
//     },
//     {
//       id: 737,
//       title: "Anchovy Paste - 56 G Tube",
//       unit_price: 91.27,
//       slug: "-",
//       description:
//         "lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed",
//       inventory: 73,
//       price_with_tax: 100.397,
//       collection: 6,
//       images: [],
//     },
//     {
//       id: 520,
//       title: "Appetizer - Asian Shrimp Roll",
//       unit_price: 92.58,
//       slug: "-",
//       description:
//         "massa id lobortis convallis tortor risus dapibus augue vel accumsan",
//       inventory: 47,
//       price_with_tax: 101.83800000000001,
//       collection: 6,
//       images: [],
//     },
//   ],
// };
  const [mydata, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    try {
      const res = api.get(`store/products/`);
      setMyData(JSON.stringify(res.data));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data", err);
      setLoading(false);
       }
  };

  useEffect(() => {
    getData();
    console.log(mydata);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const data = mydata.results
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <div>
      {/* {loading ? (
        <p>Loading....</p>
      ) : ( */}
        <MaterialReactTable
          table={table}
          // renderRowActions={({ row }) => (
          //   <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          //     <IconButton
          //       color="secondary"
          //       component={Link}
          //       to={`edit/${row.original.id}`}>
          //       <EditIcon />
          //     </IconButton>

          //     <IconButton
          //       color="error"
          //       component={Link}
          //       to={`delete/${row.original.id}`}>
          //       <DeleteIcon />
          //     </IconButton>
          //   </Box>
          // )}
        />
      {/* )} */}
    </div>
  );
};

export default Home;
