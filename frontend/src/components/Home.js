// import { useMemo,useEffect, useState } from "react";
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from "material-react-table";
// import { IconButton, Tooltip } from "@mui/material";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import api from "./helpers/Gateway";
// import {
//   QueryClient,
//   QueryClientProvider,
//   keepPreviousData,
//   useQuery,
// } from "@tanstack/react-query"; //note: this is TanStack React Query V5

// const Example = () => {
//   //manage our own state for stuff we want to pass to the API
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [sorting, setSorting] = useState([]);
//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//       const [loading, setLoading] = useState(true);
//       const [data, setData] = useState([]);
//       const [isLoading, setIsLoading] = useState(false);
//       const [isError, setIsError] = useState(false);

// const useQuery = ({ columnFilters, globalFilter, pagination, sorting }) => {

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//           const fetchURL = api.get("store/products/");
//       fetchURL.searchParams.set(
//         "start",
//         `${pagination.pageIndex * pagination.pageSize}`
//       );
//       fetchURL.searchParams.set("size", `${pagination.pageSize}`);
//       fetchURL.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
//       fetchURL.searchParams.set("globalFilter", globalFilter ?? "");
//       fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));

//         const response = await fetchURL;
//       setData(response.data.results);
//       setIsLoading(false);
//     } catch (error) {
//       setIsError(true);
//       setIsLoading(false);
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [columnFilters, globalFilter, pagination, sorting]);

//   return {
//     data,
//     isLoading,
//     isError,
//     refetch: fetchData,
//   };
// };

//   // Memoized columns definition
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "title",
//         header: "Product",
//         size: 150,
//       },
//       {
//         accessorKey: "unit_price",
//         header: "Unit Price",
//         size: 150,
//       },
//       {
//         accessorKey: "description",
//         header: "Description",
//         size: 200,
//       },
//       { accessorKey: "inventory", header: "Inventory", size: 200 },
//       { accessorKey: "price_with_tax", header: "Price + Tax", size: 200 },
//       { accessorKey: "collection", header: "Collection", size: 200 },
//     ],
//     []
//   );

//   const table = useMaterialReactTable({
//     columns,
//     data,
//     initialState: { showColumnFilters: true },
//     manualFiltering: true, //turn off built-in client-side filtering
//     manualPagination: true, //turn off built-in client-side pagination
//     manualSorting: true, //turn off built-in client-side sorting
//    muiToolbarAlertBannerProps: isError
//       ? {
//           color: "error",
//           children: "Error loading data",
//         }
//       : undefined,
//     onColumnFiltersChange: setColumnFilters,
//     onGlobalFilterChange: setGlobalFilter,
//     onPaginationChange: setPagination,
//     onSortingChange: setSorting,
//     renderTopToolbarCustomActions: () => (
//       <Tooltip arrow title="Refresh Data">
//         <IconButton onClick={() => refetch()}>
//           <RefreshIcon />
//         </IconButton>
//       </Tooltip>
//     ),
//     rowCount: meta?.totalRowCount ?? 0,
//     state: {
//       columnFilters,
//       globalFilter,
//       isLoading,
//       pagination,
//       showAlertBanner: isError,
//       showProgressBars: isRefetching,
//       sorting,
//     },
//   });

//   return <MaterialReactTable table={table} />;
// };

// const queryClient = new QueryClient();

// const ExampleWithReactQueryProvider = () => (
//   //App.tsx or AppProviders file. Don't just wrap this component with QueryClientProvider! Wrap your whole App!
//   <QueryClientProvider client={queryClient}>
//     <Example />
//   </QueryClientProvider>
// );

// export default ExampleWithReactQueryProvider;

import { useMemo, useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import api from "./helpers/Gateway";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"; // note: TanStack React Query V5


// const fetchData = async () => {
//   try {
//     const response = await api.get(url);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data", error);
//     throw error;
//   }
// };
const Example = () => {
  // Manage state for filters, sorting, and pagination
  const [data, setData] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [isError, setIsError] = useState(false);

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const fetchData = async () => {
    try {
      // Update URL based on filters, sorting, and pagination
      const fetchURL = api.get("store/products/");
    //   fetchURL.searchParams.set(
    //     "start",
    //     `${pagination.pageIndex * pagination.pageSize}`
    //   );
    //   fetchURL.searchParams.set("size", `${pagination.pageSize}`);
    //   fetchURL.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
    //   fetchURL.searchParams.set("globalFilter", globalFilter ?? "");
    //   fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      const response = await fetchURL;
      setData(response.data.results);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [columnFilters, globalFilter, pagination, sorting]);

//   const { data, isLoading, isError } = useQuery({
//     columnFilters,
//     globalFilter,
//     pagination,
//     sorting,
//   });
useEffect(() => {
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [columnFilters, globalFilter, pagination, sorting]);

// const {
//   data,
//   //isLoading,
//  // isError,
// } = useQuery({
//   columnFilters,
//   globalFilter,
//   pagination,
//   sorting,
// });
  // Define columns
  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "Product", size: 150 },
      { accessorKey: "unit_price", header: "Unit Price", size: 150 },
      { accessorKey: "description", header: "Description", size: 200 },
      { accessorKey: "inventory", header: "Inventory", size: 200 },
      { accessorKey: "price_with_tax", header: "Price + Tax", size: 200 },
      { accessorKey: "collection", header: "Collection", size: 200 },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    // ... other configurations
  });

  return (
    <MaterialReactTable
      table={table}
      topToolbarCustomActions={() => (
        <Tooltip arrow title="Refresh Data">
          <IconButton onClick={fetchData}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
    />
  );
};

const queryClient = new QueryClient();

const ExampleWithReactQueryProvider = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;
