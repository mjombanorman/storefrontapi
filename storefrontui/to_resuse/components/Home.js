import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import api from "./helpers/Gateway";

const Products = () => {
  // State to hold product data
  const [data, setData] = useState([]);
  // State to track if there is an error during data fetching
  const [isError, setIsError] = useState(false);

  // State to indicate loading state
  const [isLoading, setIsLoading] = useState(false);
  // State to indicate refetching state
  const [isRefetching, setIsRefetching] = useState(false);

  // State to hold the total number of rows for pagination
  const [rowCount, setRowCount] = useState(0);

  // State to manage pagination settings (current page index and page size)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  useEffect(() => {
    // Function to fetch data from the API based on pagination settings

    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      // Assuming you have a URL object like this
      let url = new URL("http://127.0.0.1:8000/store/products/");

      // Set the 'start' and 'size' parameters using regular JavaScript syntax
      url.searchParams.set("page", String(pagination.pageIndex + 1));
      url.searchParams.set("page_size", String(pagination.pageSize));

      try {
        // Fetch data from the API based on pagination settings
        // Now, you can use the updated URL in your API request
        const response = await api.get(url.toString());
        const output = response.data;

        // Update state with fetched data and total row count
        setData(output.results);
        setRowCount(output.count);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }

      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize]);

  // Definition of columns for the MaterialReactTable
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

  // Create a MaterialReactTable using the custom hook
  const table = useMaterialReactTable({
    columns,
    data,
    getRowId: (row) => row.id,
    rowCount,
    manualPagination: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onPaginationChange: setPagination, // Callback for pagination changes
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
  });

  // Render the MaterialReactTable component
  return (
    <>
      <section className="banner_area">
        <div className="booking_table d_flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset="0"
            data-background=""></div>
          <div className="container">
            <div className="banner_content text-center">
              <h6>Away from monotonous life</h6>
              <h2>Relax Your Mind</h2>
              <p>
                If you are looking at blank cassettes on the web, you may be
                very confused at the
                <br /> difference in price. You may see some for as low as $.17
                each.
              </p>
              <a href="#" className="btn theme_btn button_hover">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>


         <section className="accomodation_area section_gap">
            <div className="container">
                <div className="section_title text-center">
                    <h2 className="title_color">Hotel Accomodation</h2>
                    <p>We all live in an age that belongs to the young at heart. Life that is becoming extremely fast, </p>
          </div>
          <div className="row mb_30">
          {data.map((item) => {
              <div className="col-lg-3 col-sm-6">
                <div className="accomodation_item text-center">
                  <div className="hotel_img">
                    <img src="image/room1.jpg" alt="" />
                    <a href="#" className="btn theme_btn button_hover">
                      Book Now
                    </a>
                  </div>
                  <a href="#">
                    <h4 className="sec_h4">{item.title}</h4>
                  </a>
                  <h5>
                    $250<small>/night</small>
                  </h5>
                </div>
              </div>;
            
          })}
                         </div>
            </div>
        </section>
      <MaterialReactTable table={table} />;
    </>
  ); 
};

export default Products;
