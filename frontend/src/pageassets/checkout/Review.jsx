import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Review = ({
  cartItems,
  cartTotal,
  cartId,
  handleCheckout,
  updateQty,
  removeFromCart,
}) => {
  const addresses = ["123 Main St", "Cityville, CA", "98765"];

  return (
    <Paper elevation={2} sx={{ border: "2px solid #1976D2", padding: 1 }}>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.title}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    min="1"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => updateQty(item.id, e.target.value)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{item.product.unit_price}</TableCell>
                <TableCell>
                  <IconButton onClick={() => removeFromCart(item.id)}>
                    <RemoveShoppingCartIcon color="warning" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <List>
        <ListItem sx={{ py: 1, px: 0, display: "flex" }}>
          <ListItemText primary="Total" sx={{ flex: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {cartTotal.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleCheckout}>
        Place Order
      </Button>
    </Paper>
  );
};

export default Review;
