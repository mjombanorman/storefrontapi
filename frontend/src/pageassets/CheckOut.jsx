
import React, { useState } from "react";
import AddressForm from "./checkout/AddressForm";
import PaymentForm from "./checkout/PaymentForm";
import Review from "./checkout/Review";
import { Box } from "@mui/material";
import { Button, Stepper, Step, StepLabel } from "@mui/material";
import api from "../helpers/Gateway";

const steps = ["Shipping Address", "Payment Details", "Review Your Order"];

const Checkout = ({
  cartItems,
  cartTotal,
  cartId,
  updateQty,
  removeFromCart,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    // Add other shipping information fields as needed
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  function cleanupCart(cartId) {
    api.delete(`/store/carts/${cartId}/`);
    localStorage.removeItem("cartId");
  }

  // later in handleCheckout

  const handleCheckout = async () => {
    try {
      // Create an order with the selected items and shipping information
      const orderResponse = await api.post(`/store/orders/`, {
        cart_id: cartId,
      });
      console.log("Order placed successfully:", orderResponse.data);
      await cleanupCart(cartId);
      window.location.href = "/";

      // Handle the order response as needed (e.g., show confirmation message)

      // api.delete(`/store/carts/${cartID}/`);
      console.log("Cart Deleted");
      console.log("Local Storage Removed");
      // Remove cartId from localStorage
      // localStorage.removeItem("cartId");
      // Redirect to the home page

      // window.location.href = "/";
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error, show error message, etc.
    }
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm handleNext={handleNext} />;
      case 1:
        return <PaymentForm handleNext={handleNext} />;
      case 2:
        return (
          <Review
            cartItems={cartItems}
            cartTotal={cartTotal}
            handleCheckout={handleCheckout}
            updateQty={updateQty}
            removeFromCart={removeFromCart}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
      }}>
      <Stepper
        sx={{ marginTop: "2%", marginBottom: "2%" }}
        activeStep={activeStep}
        alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
       
          marginBottom: "2%",
          width: "70%",
        }}>
        <div>
          {getStepContent(activeStep)}
          <div>
            {activeStep !== 0 && (
              <Button onClick={handleBack} color="primary">
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 && (
              <Button onClick={handleNext} color="primary">
                Next
              </Button>
            )}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Checkout;
