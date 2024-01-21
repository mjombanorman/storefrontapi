import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navigation from "./Navigation";
import Container from "@mui/material/Container";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import shoppingProducts from "./all_products";
import Stack from "@mui/material/Stack";

import Grid from "@mui/material/Grid";

export default function Home() {
  return (
    <>
      <Navigation />
      {/* <Box
        sx={{
          backgroundImage: `url("https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
          pt: 10,
          pb: 10,
          backgroundSize: "cover", // Adjust backgroundSize as needed
          backgroundPosition: "center", // Adjust backgroundPosition as needed
          color: "#ffffff", // Set text color to contrast with the background
        }}>
        <Container>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom>
         StoreFront
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph>
          Simply get the experience
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center">
         
            <Button variant="outlined">Take Charge</Button>
          </Stack>
        </Container>
      </Box> */}
      {/* <Box
        sx={{
          position: "relative",
          backgroundImage: `url("https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
          pt: 10,
          pb: 10,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#ffffff",
          overflow: "hidden", // Ensure the overlay doesn't overflow
        }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value for the overlay
          }}></Box>
        <Container maxWidth="md" zIndex="1">
      
          <Typography variant="h4" align="center" gutterBottom>
           StoreFront
          </Typography>
          <Typography variant="body1" align="center" paragraph>
           Quality meets minimalism.
          </Typography>
         
        </Container>
      </Box> */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url("https://cdn.pixabay.com/photo/2017/03/01/09/11/shop-2107911_960_720.png")`,
          pt: 10,
                  pb: 10,
          height:"30vh",
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
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}>
            {shoppingProducts.map((product) => (
              <Grid item xs={2} sm={4} md={4} key={product.id}>
                <Card sx={{ margin: 1 }}>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="340"
                    image={product.image}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <AddShoppingCartIcon />
                    </Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
