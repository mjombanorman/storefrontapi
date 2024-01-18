import React, { Component } from "react";
import Header from "./Header";
import ShoppingCartOverlay from "./ShoppingCartOverlay";
import ProductList from "./ProductList";
import api from "../helpers/Gateway";

class ShoppingCartApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      quantity: 0,
      amountToPay: 0,
      itemsInCart: [],
      cartId: "", // Add a state to store the cart ID
      cartURL: "", // Add a state to store the cart ID
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  async handleItemClick(itemId) {
    try {
      // Check if a cart ID exists in the state
      if (!this.state.cartId) {
        // If no cart ID, create a new cart
        const cartResponse = await api.post("store/carts/");

        if (cartResponse.status === 201) {
          // Update the state with the new cart ID
          this.setState({
            cartId: cartResponse.data.id,
            cartURL: `store/carts/${cartResponse.data.id}/items/`,
          });
        } else {
          console.error("Failed to create a new cart");
          return;
        }
      }

      // Fetch the existing items in the cart using fetch
      console.log("cartURL", this.state.cartURL);
      const response = await api.get(this.state.cartURL);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const responseData = await response; // Parse the response as JSON

      // Check if the items property exists in the response data
      const cartItems = responseData.items || [];

      // Check if the item you are trying to add already exists in the cart
      const existingItem = cartItems.find(
        (item) => item.product.id === itemId.id
      );

      if (existingItem) {
        // If the same item is already in the cart, update the quantity
        const updatedItemsInCart = this.state.itemsInCart.map((item) =>
          item.product.id === itemId.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        this.setState({
          quantity: this.state.quantity + 1,
          amountToPay: this.state.amountToPay + existingItem.product.unit_price,
          itemsInCart: updatedItemsInCart,
        });
      } else {
        // If the item is not in the cart, add it
        const addToCartResponse = await api.post(this.state.cartURL, {
          product_id: itemId.id,
          quantity: 1, // Adjust the quantity as needed
        });

        if (addToCartResponse.status === 201) {
          console.log("Item added to cart successfully");

          // Update the state with the new item in the cart
          this.setState((prevState) => ({
            quantity: prevState.quantity + 1,
            amountToPay:
              prevState.amountToPay + addToCartResponse.data.total_price,
            itemsInCart: [...prevState.itemsInCart, addToCartResponse.data],
          }));
          console.log("itemsInCart", this.state.itemsInCart);
        } else {
          // Handle error response
          console.error(
            "Failed to add item to cart. Server returned:",
            addToCartResponse.status,
            addToCartResponse.statusText
          );
          // You can also log more details from addToCartResponse.data if it's available
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Other methods remain the same...

  render() {
    return (
      <main>
        <Header
          quantity={this.state.quantity}
          amountToPay={this.state.amountToPay}
        />
        <ShoppingCartOverlay
          data={this.state}
          removeFromCart={this.removeFromCart}
        />
        <ProductList
          items={this.props.items}
          addToCart={this.handleItemClick}
        />
      </main>
    );
  }
}

export default ShoppingCartApp;
