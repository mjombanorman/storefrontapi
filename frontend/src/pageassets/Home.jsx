
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


export default function Home() {
  // State variables
  const [items, setItems] = useState([]); // Products from the API
  const [cartId, setCartId] = useState(() => {
    const storedCartId = localStorage.getItem("cartId");
    return storedCartId ? JSON.parse(storedCartId) : null;
  });
  const [cartItems, setCartItems] = useState([]); // Items in the cart
  const [cartTotal, setCartTotal] = useState(0); // Total cart value
  const [isCheckingOut, setIsCheckingOut] = useState(false); // Checkout mode

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const response = await api.get("/store/products/");
      setItems(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to toggle checkout mode
  const toggleCheckout = () => {
    setIsCheckingOut((prev) => !prev);
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

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
//   const removeFromCart = (id) => async () => {
//     try {
//       await api.delete(`/store/carts/${cartId}/items/${id}/`);
//       const updatedCart = await api.get(`/store/carts/${cartId}/`);
//       setCartItems(updatedCart.data.items);
//       setCartTotal(calculateCartTotal(updatedCart.data.items));
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//     }
//   };

  return (
    <>
          <Navigation cartItems={cartItems} toggleCheckout={toggleCheckout} />
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url("https://cdn.pixabay.com/photo/2017/03/01/09/11/shop-2107911_960_720.png")`,
          pt: 10,
          pb: 10,
          height: "20vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#ffffff",
          overflow: "hidden",
        }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
          }}></Box>
        <Container maxWidth="md" zIndex="1">
          {/* Your content goes here */}
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#ffffff", fontWeight: "bold" }}>
            Welcome to My Website
          </Typography>
          <Typography
            variant="body1"
            align="center"
            paragraph
            sx={{ color: "#ffffff" }}>
            This is some content with a background image and overlay.
          </Typography>
          {/* Add more components as needed */}
        </Container>
      </Box>
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
                          <Checkout cartItems={cartItems} cartTotal={cartTotal} cartId={cartId} updateQty={updateQty} removeFromCart={removeFromCart} />
                          
                              </>
                      ) : (
                          <Grid
                              container
                              spacing={{ xs: 2, md: 3 }}
                              columns={{ xs: 4, sm: 8, md: 12 }}>
                              {items.map((product) => (
                                  <Grid item xs={2} sm={4} md={4} key={product.id}>
                                      <Card sx={{ margin: 1 }}>
                                          <CardMedia
                                              component="img"
                                              alt={product.title}
                                              height="340"
                                              image={product.image}
                                              title={product.title}
                                          />
                                          <CardContent>
                                              <Typography gutterBottom variant="h6" component="div">
                                                  {product.title}
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary">
                                                  {product.description}
                                              </Typography>
                                          </CardContent>
                                          <CardActions>
                                              <Button onClick={() => addToCart(product.id)} size="small">
                                                  <AddShoppingCartIcon />
                                              </Button>
                                              <Button size="small">Learn More</Button>
                                          </CardActions>
                                      </Card>
                                  </Grid>
                              ))}
                          </Grid>)}
                      </>
        </Container>
      </Box>
    </>
  );
}
