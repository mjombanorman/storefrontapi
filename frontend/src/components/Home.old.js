import { React, useMemo, useEffect, useState } from "react";
import api from "./helpers/Gateway";
import { MaterialReactTable } from "material-react-table";
import Dayjs from "dayjs";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useMaterialReactTable } from "material-react-table";
// const Home = () => {

//   const [data, setMyData] = useState();
//   const [loading, setLoading] = useState(true);

//   const getData = () => {
//     api.get(`store/products/`).then((res) => {
//       setMyData(res.data);
//       setLoading(false);
//     });
//   };

//   useEffect(() => {
//     getData();
//   }, []);



//   //should be memoized or stable
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "title", //access nested data with dot notation
//         header: "Product",
//         size: 150,
//       },

//       {
//         accessorKey: "unit_price",
//         header: "Unit Price",
//         size: 150,
//       },
//       {
//         accessorKey: "description", //normal accessorKey
//         header: "Description",
//         size: 200,
//       },
//       { accessorKey: "inventory", header: "Inventory", size: 200 },
//       { accessorKey: "price_with_tax", header: "Price + Tax", size: 200 },
//       { accessorKey: "collection", header: "Collection", size: 200 },
//     ],
//     []
//   );
//   const table = useMaterialReactTable({columns, data });
//   return (
//     <div>
//       {loading ? (
//         <p>Loading....</p>
//       ) : (
//           <MaterialReactTable table={table} />

 
//       )}
//     </div>
//   );
// };

// Move data fetching logic outside component
const fetchData = async () => {
  try {
    const res = await api.get(`store/products/`);
    return res.data;
  } catch (err) {
    console.error('Error fetching data', err);
  }
}
const Home = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

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

  // Check if data exists before creating the table
  const table = useMaterialReactTable({ columns, data });

  return (
    <div>
      {
        loading ? (<p>Loading....</p>) :    
      
         (<MaterialReactTable
         table={table}
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
       />) 
      }
      );
    </div>
  );
};

export default Home;
      //  <MaterialReactTable
      //    columns={columns}
      //    data={myData}
      //    enableRowActions
      //    renderRowActions={({ row }) => (
      //      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
      //        <IconButton
      //          color="secondary"
      //          component={Link}
      //          to={`edit/${row.original.id}`}>
      //          <EditIcon />
      //        </IconButton>

      //        <IconButton
      //          color="error"
      //          component={Link}
      //          to={`delete/${row.original.id}`}>
      //          <DeleteIcon />
      //        </IconButton>
      //      </Box>
      //    )}
      //  />;