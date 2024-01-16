import React, { Component } from "react";
import Header from "./Header";
import ShoppingCartOverlay from "./ShoppingCartOverlay";
import ProductList from "./ProductList";
/*
App structure:

ShoppingCartApp
  Header
    Navigation
    ShoppingCart
  ShoppingCartOverlay
    ShoppingCartProduct
    ShoppingCartTotal
  ProductList
    Product
*/

class ShoppingCartApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      quantity: 0,
      amountToPay: 0,
      itemsInCart: [],
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }
  addToCart(item) {
    let itemsInCart = this.state.itemsInCart;
    itemsInCart.push(this.props.items[item.id]);
    this.props.items[item.id].inCart = true;
    this.props.items[item.id].quantityInCart = 1;
    this.setState({
      quantity: this.state.quantity + 1,
      amountToPay: this.state.amountToPay + this.props.items[item.id].price,
      itemsInCart: itemsInCart,
      items: this.props.items,
    });
  }
  removeFromCart(item, indexInCart) {
    let itemsInCart = this.state.itemsInCart;
    this.props.items[item.id].inCart = false;
    this.props.items[item.id].quantityInCart = 0;
    itemsInCart.splice(indexInCart, 1);
    this.setState({
      quantity: this.state.quantity - 1,
      amountToPay: this.state.amountToPay - this.props.items[item.id].price,
      itemsInCart: itemsInCart,
      items: this.props.items,
    });
  }
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
        <ProductList items={this.props.items} addToCart={this.addToCart} />
      </main>
    );
  }
}

export default ShoppingCartApp;