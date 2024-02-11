import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProductItem from "./components/product-item/product-item.component";
import { Container } from "react-bootstrap";
import Header from "./components/header/header.component";
const App = () => {
  const [cartItems, setCartItems] = useState([]); // Initialize cartItems state
  const [toggleCheckout, setToggleCheckout] = useState(false); // Initialize toggleCheckout state

  return (
    <>
      <Header cartItems={cartItems} toggleCheckout={toggleCheckout} />
      <Container fluid>
        <HomePage />
      </Container>

      {/* Pass props to Header */}
      {/* <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
              // setCartItems={setCartItems}
              // setToggleCheckout={setToggleCheckout}
              />
            }
          />
          {/* <Route path="/checkout" component={CheckOut} />
          <Route path="/payment" component={PaymentForm} />
          <Route path="/review" component={ReviewForm} /> */}
      {/* </Routes>
      </Router> */}

      {/* <ProductItem /> */}
    </>
  );
};

export default App;
