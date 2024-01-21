// import React, { Component } from "react";

// class Product extends Component {
//   constructor(props) {
//     super(props);
//     this.handleAddToCart = this.handleAddToCart.bind(this);
//   }
//   handleAddToCart(e) {
//     this.props.handleItemClick(); //addToCart(this.props.item);
//   }
//   render() {
//     return (
//       <div className="items">
//         <img src={this.props.item.image}></img>
//         <div className="info">
//           <h3>{this.props.item.name}</h3>
//           <span>£ {this.props.item.price}</span>
//           <button
//             onClick={this.handleAddToCart}
//             disabled={this.props.item.inCart}
//             className={this.props.item.inCart ? "button-disabled" : ""}>
//             {this.props.item.inCart ? "Item in a cart" : "Add to cart"}
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default Product;

// Product.js
import React, { Component } from "react";

class Product extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart() {
    this.props.addToCart(this.props.item); // Call the addToCart prop with the item
  }

  render() {
    const { item } = this.props;

    return (
      <div className="items">
        {/* <img src={item.image} alt={item.name}></img> */}
        <div className="info">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <span>$ {item.unit_price}</span>

          <button
            onClick={this.handleAddToCart}
            disabled={item.inCart}
            className={item.inCart ? "button-disabled" : ""}>
            {item.inCart ? "Item in a cart" : "Add to cart"}
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
