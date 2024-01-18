import React, { Component } from "react";
import Product from "./Product";

class ProductList extends Component {
  render() {
    let items = this.props.items.map((item, index) => {
      return (
        <Product key={item.id} item={item} addToCart={this.props.addToCart} />
      );
    });
    return <section id="list">{items}</section>;
  }
}

export default ProductList;
