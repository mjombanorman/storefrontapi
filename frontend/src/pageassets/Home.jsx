import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navigation from "./pagesections/Navigation";
import Container from "@mui/material/Container";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useEffect, useState } from "react";
import api from "../helpers/Gateway";
import Checkout from "./CheckOut";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { IconButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Chip from "@mui/material/Chip";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
export default function Home() {
  // State variables
  const [items, setItems] = useState([]); // Products from the API
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  // State to indicate refetching state
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 12 });
  const [rowCount, setRowCount] = useState(0);
  const [cartId, setCartId] = useState(() => {
    const storedCartId = localStorage.getItem("cartId");
    return storedCartId ? JSON.parse(storedCartId) : null;
  });
  const [cartItems, setCartItems] = useState([]); // Items in the cart
  const [cartTotal, setCartTotal] = useState(0); // Total cart value
  const [isCheckingOut, setIsCheckingOut] = useState(false); // Checkout mode
  // Handle page change
  // Function to handle page changes
  const handleChange = (event, newPage) => {
    setPagination({ ...pagination, pageIndex: newPage });
  };
  //Search from the database
  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const productResponse = await api.get("store/products/", {
        params: {
          page: pagination.pageIndex,
          page_size: pagination.pageSize,
          search: searchQuery,
        },
      });
      setItems(productResponse.data.results);
      setRowCount(productResponse.data.count);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Map products to their respective collection names
  const productsWithCollectionName = items.map((item) => {
    const collection = collections.find(
      (collection) => collection.id === item.collection
    );
    return {
      ...item,
      collectionName: collection ? collection.title : "Unknown Collection",
    };
  });
  //Fetch Collections
  const fetchCollections = async () => {
    try {
      const response = await api.get("/store/collections/");
      console.log(response);
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };
  // Function to toggle checkout mode
  const toggleCheckout = () => {
    setIsCheckingOut((prev) => !prev);
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
    fetchCollections();
  }, [searchQuery, pagination.pageIndex, pagination.pageSize]);

  // Preload cart data if cartId exists
  useEffect(() => {
    const preloadCart = async () => {
      try {
        if (cartId) {
          const cartData = await api.get(`/store/carts/${cartId}/`);
          setCartItems(cartData.data.items);
          setCartTotal(calculateCartTotal(cartData.data.items));
        }
      } catch (error) {
        console.error("Error preloading cart data:", error);
      }
    };
    preloadCart();
  }, [cartId]);
  // Helper function to calculate cart total
  const calculateCartTotal = (items) => {
    return items.reduce(
      (total, item) => total + item.product.unit_price * item.quantity,
      0
    );
  };

  // Add item to the cart function
  const addToCart = async (id) => {
    try {
      const cart = cartId
        ? await api.get(`/store/carts/${cartId}/`)
        : await api.post("/store/carts/");
      const item = await api.post(`/store/carts/${cart.data.id}/items/`, {
        product_id: id,
        quantity: 1,
      });
      const updatedCart = await api.get(`/store/carts/${cart.data.id}/`);
      setCartItems(updatedCart.data.items);
      setCartTotal(calculateCartTotal(updatedCart.data.items));
      setCartId(cart.data.id);
      localStorage.setItem("cartId", JSON.stringify(cart.data.id));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Update quantity function
  const updateQty = (id, quantity) => {
    // Convert quantity to a number and check if it's a valid number
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      // Handle the case where the quantity is not a valid positive number
      console.error("Invalid quantity:", quantity);
      return;
    }

    // Find the item in cartItems by id and update its quantity
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parsedQuantity } : item
    );

    // Update the cartItems state with the updated items
    setCartItems(updatedCartItems);

    // Calculate and update the total
    const updatedTotal = calculateCartTotal(updatedCartItems);
    setCartTotal(updatedTotal);

    // Update the quantity in the API
    api.patch(`/store/carts/${cartId}/items/${id}/`, {
      quantity: parsedQuantity,
    });
  };

  // Filter products by collection
  const handleCollectionFilter = async (collectionId) => {
    try {
      const productResponse = await api.get("store/products/", {
        params: {
          collection_id: collectionId,
          page: pagination.pageIndex,
          page_size: pagination.pageSize,
        },
      });
      setItems(productResponse.data.results);
      setRowCount(productResponse.data.count);
      setSelectedCollection(collectionId); // Set the selected collection
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  // Remove product from the cart
  const removeFromCart = (id) => {
    try {
      // Make an API request to remove the item from the cart
      api.delete(`/store/carts/${cartId}/items/${id}/`);

      // Update the local state to reflect the removal
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCartItems);

      // Recalculate and update the total
      const updatedTotal = calculateCartTotal(updatedCartItems);
      setCartTotal(updatedTotal);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <>
      <Navigation cartItems={cartItems} toggleCheckout={toggleCheckout} />

     
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Search..."
          variant="standard"
          name="search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>

      <Box sx={{ flexGrow: 1, marginTop: "4%" }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <Box
              sx={{
                width: "100%",
                maxWidth: 300,
                bgcolor: "background.paper",
                marginLeft: "4%",
              }}>
              <nav>
                <List>
                  {collections.map((collection) => (
                    <ListItem key={collection.id}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          handleCollectionFilter(collection.id);
                          setSearchQuery(""); // Clear the search query
                        }}
                        sx={{
                          backgroundColor:
                            selectedCollection === collection.id
                              ? "#aaffaa"
                              : "inherit",
                        }}>
                        {collection.title} - {collection.products_count}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </nav>
            </Box>
          </Grid>
          <Grid xs={8}>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Container fixed>
                <>
                  {isCheckingOut ? (
                    // Render the Checkout component if isCheckingOut is true
                    <>
                      <Checkout
                        cartItems={cartItems}
                        cartTotal={cartTotal}
                        cartId={cartId}
                        updateQty={updateQty}
                        removeFromCart={removeFromCart}
                      />
                    </>
                  ) : (
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}>
                      {productsWithCollectionName.map((product) => (
                        <Grid
                          sx={{ marginTop: "2%" }}
                          item
                          xs={2}
                          sm={3}
                          md={3}
                          key={product.id}>
                          <Card sx={{ margin: 1 }}>
                            <CardMedia
                              component="img"
                              alt={product.title}
                              height="300"
                              image={product.image}
                              title={product.title}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div">
                                {product.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary">
                                {product.description}
                                <br />
                                <Chip
                                  icon={<LocalOfferIcon />}
                                  label={product.collectionName}
                                  color="warning"
                                  variant="outlined"
                                />
                              </Typography>
                            </CardContent>
                            <CardActions
                              sx={{
                                flexGrow: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}>
                              <IconButton
                                onClick={() => addToCart(product.id)}
                                size="small">
                                <AddShoppingCartIcon />
                              </IconButton>
                              <IconButton>
                                <ReadMoreIcon />
                              </IconButton>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                      {/* Display pagination controls */}
                      <Stack
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "2%",
                          marginBottom: "2%",
                        }}
                        spacing={2}>
                        <Typography>Page: {pagination.pageIndex}</Typography>
                        <Pagination
                          count={Math.ceil(rowCount / pagination.pageSize)}
                          page={pagination.pageIndex}
                          onChange={handleChange}
                        />
                      </Stack>
                    </Grid>
                  )}
                </>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
