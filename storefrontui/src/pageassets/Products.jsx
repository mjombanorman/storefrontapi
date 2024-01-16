import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import api from "../helpers/Gateway";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";

const Products = () => {
  // State to hold product data
  const [data, setData] = useState([]);
  // State to track if there is an error during data fetching
  const [isError, setIsError] = useState(false);
  // State to indicate loading state
  const [isLoading, setIsLoading] = useState(false);
  // State to indicate refetching state
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 9 });
  const [rowCount, setRowCount] = useState(0);

  // Function to handle page changes
  const handleChange = (event, newPage) => {
    setPagination({ ...pagination, pageIndex: newPage });
  };

  // Effect hook to fetch data when the component mounts or pagination changes
  useEffect(() => {
    const fetchData = async () => {
      // Set loading state
      setIsLoading(true);

      try {
        // Fetch data from the API based on pagination settings
        const response = await api.get("store/products/", {
          params: {
            page: pagination.pageIndex,
            page_size: pagination.pageSize,
          },
        });

        const output = response.data;

        // Update state with fetched data and total row count
        setData(output.results);
        setRowCount(output.count);
      } catch (error) {
        // Set error state if there is an issue with data fetching
        setIsError(true);
        console.error(error);
      }

      // Reset loading state after data fetch
      setIsLoading(false);
    };

    // Call the fetchData function
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      {/* Display loading spinner when data is being fetched */}
      {isLoading && (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      )}

      {/* Display product cards in a grid */}
      <Grid container spacing={4}>
        {data.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              {/* Display product image */}
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: "56.25%",
                }}
                image="https://source.unsplash.com/random?wallpapers"
              />
              {/* Display product details */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography>{item.description}</Typography>
              </CardContent>
              {/* Display product actions */}
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Display pagination controls */}
      <Stack spacing={2}>
        <Typography>Page: {pagination.pageIndex}</Typography>
        <Pagination
          count={Math.ceil(rowCount / pagination.pageSize)}
          page={pagination.pageIndex}
          onChange={handleChange}
        />
      </Stack>
    </Container>
  );
};
export default Products;
