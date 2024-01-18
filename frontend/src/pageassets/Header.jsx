import React, { Component } from "react";
import ShoppingCart from "./ShoppingCart";
import Navigation from "./Navigation";


class Header extends Component {
  render() {
    return (
      <header>
        <Navigation />
        <ShoppingCart
          quantity={this.props.quantity}
          amountToPay={this.props.amountToPay}
        />
      </header>
    );
  }
}

export default Header;
