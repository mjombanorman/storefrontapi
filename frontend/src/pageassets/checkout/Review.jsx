// // import React from "react";
// // import Typography from "@mui/material/Typography";
// // import List from "@mui/material/List";
// // import ListItem from "@mui/material/ListItem";
// // import ListItemText from "@mui/material/ListItemText";
// // import Grid from "@mui/material/Grid";
// // import Paper from "@mui/material/Paper";
// // import Button from "@mui/material/Button";
// // import { TextField } from "@mui/material";

// // const Review = ({
// //   cartItems,
// //   cartTotal,
// //     cartId,
// //   handleCheckout,
// //   updateQty,
// //   removeFromCart,
// // }) => {
// //   const addresses = ["123 Main St", "Cityville, CA", "98765"];
// //   const payments = [
// //     { name: "Card type", detail: "Visa" },
// //     { name: "Card holder", detail: "John Smith" },
// //     { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
// //     { name: "Expiry date", detail: "04/24" },
// //   ];

// //   return (
// //     <Paper elevation={3} sx={{ border: "2px solid #1976D2", padding: 2 }}>
// //       <Typography variant="h6" gutterBottom>
// //         Order summary
// //       </Typography>
// //       <List disablePadding>
// //         {cartItems.map((item) => (
// //           <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
// //             <ListItemText primary={item.product.title} />
// //             <TextField
// //                     variant="standard"
// //                     name="quantity"
// //               value={item.quantity}
// //               onChange={updateQty}
// //             />
// //             <Typography variant="body2">{item.product.unit_price}</Typography>
// //           </ListItem>
// //         ))}
// //         <ListItem sx={{ py: 1, px: 0 }}>
// //           <ListItemText primary="Total" />
// //           <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
// //             {cartTotal.toFixed(2)}
// //           </Typography>
// //         </ListItem>
// //       </List>
// //       <Grid container spacing={2}>
// //         <Grid item xs={12} sm={6}>
// //           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
// //             Shipping
// //           </Typography>
// //           <Typography gutterBottom>John Smith</Typography>
// //           <Typography gutterBottom>{addresses.join(", ")}</Typography>
// //         </Grid>
// //         {/* <Grid item container direction="column" xs={12} sm={6}>
// //           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
// //             Payment details
// //           </Typography>
// //           <Grid container>
// //             {payments.map((payment) => (
// //               <React.Fragment key={payment.name}>
// //                 <Grid item xs={6}>
// //                   <Typography gutterBottom>{payment.name}</Typography>
// //                 </Grid>
// //                 <Grid item xs={6}>
// //                   <Typography gutterBottom>{payment.detail}</Typography>
// //                 </Grid>
// //               </React.Fragment>
// //             ))}
// //           </Grid>
// //         </Grid> */}
// //       </Grid>
// //       <Button variant="contained" color="primary" onClick={handleCheckout}>
// //         Place Order
// //       </Button>
// //     </Paper>
// //   );
// // };

// // export default Review;
// import React from "react";
// import Typography from "@mui/material/Typography";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import { TextField } from "@mui/material";

// const Review = ({
//   cartItems,
//   cartTotal,
//   cartId,
//   handleCheckout,
//   updateQty,
//   removeFromCart,
// }) => {
//   const addresses = ["123 Main St", "Cityville, CA", "98765"];

//   return (
//     <Paper elevation={3} sx={{ border: "2px solid #1976D2", padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Order summary
//       </Typography>
//       <List>
//         {cartItems.map((item) => (
//           <ListItem key={item.id} sx={{ py: 1, px: 0, display: "flex" }}>
//             <ListItemText primary={item.product.title} sx={{ flex: 1 }} />

//             <input
//               type="number"
//               min="1"
//               name="quantity"
//               value={item.quantity}
//               onChange={(e) => updateQty(item.id, e.target.value)}
//             />
//             <Typography variant="body2">{item.product.unit_price}</Typography>
//             <Button onClick={() => removeFromCart(item.id)}>
//               Remove from Cart
//             </Button>
//           </ListItem>
//         ))}
//         <ListItem sx={{ py: 1, px: 0, display: "flex" }}>
//           <ListItemText primary="Total" sx={{ flex: 1 }} />
//           <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
//             {cartTotal.toFixed(2)}
//           </Typography>
//         </ListItem>
//       </List>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//             Shipping
//           </Typography>
//           <Typography gutterBottom>John Smith</Typography>
//           <Typography gutterBottom>{addresses.join(", ")}</Typography>
//         </Grid>
//       </Grid>
//       <Button variant="contained" color="primary" onClick={handleCheckout}>
//         Place Order
//       </Button>
//     </Paper>
//   );
// };

// export default Review;
import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
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
    <Paper elevation={3} sx={{ border: "2px solid #1976D2", padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <TableContainer>
        <Table>
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
                  />
                </TableCell>
                <TableCell>{item.product.unit_price}</TableCell>
                <TableCell>
                  <Button onClick={() => removeFromCart(item.id)}>
                    Remove from Cart
                  </Button>
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
