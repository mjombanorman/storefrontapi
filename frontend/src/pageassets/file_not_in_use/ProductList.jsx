// // // import React, { Component } from "react";
// // // import Product from "./Product";

// // // class ProductList extends Component {
// // //   render() {
// // //     let items = this.props.items.map((item, index) => {
// // //       return (
// // //         <Product key={item.id} item={item} addToCart={this.props.handleClickItem} />
// // //       );
// // //     });
// // //     return <section id="list">{items}</section>;
// // //   }
// // // }

// // // export default ProductList;
// // import React, { Component } from "react";
// // import Product from "./Product";

// // class ProductList extends Component {
// //   render() {
// //     let items = this.props.items.map((item, index) => {
// //       return (
// //         <Product
// //           key={item.id}
// //           item={item}
// //           handleItemClick={this.props.handleItemClick}
// //         />

// //         // <Product
// //         //   key={item.id}
// //         //   item={item}
// //         //   handleAddToCart={this.props.handleItemClick}
// //         // />
// //       );
// //     });
// //     return <section id="list">{items}</section>;
// //   }
// // }

// // export default ProductList;
// // ProductList.js
// import React, { Component } from "react";
// import Product from "./Product";

// class ProductList extends Component {
//   constructor(props) {
//     super(props);
//   //  this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
//     this.fetchProducts = this.fetchProducts.bind(this);
//       this.state = {
//         items:[],
     
//       };
//   }


//   async fetchProducts() {
//       try {
//         const response = await api.get("store/products/");

//         if (response.ok) {
//           // Handle success
//           this.setState({ items: response.data });
//           console.log(response.data);
//           console.log("POST request successful");
//         } else {
//           // Handle error
//           console.error("POST request failed");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
  
//   render() {
//     let items = this.items.map((item, index) => {
//       return (
//         <Product
//           key={item.id}
//           item={item.title}
//           addToCart={this.props.addToCart} // Use addToCart instead of handleItemClick
//         />
//       );
//     });
//     return <section id="list">{items}</section>;
//   }
// }

// export default ProductList;
import React, { Component } from "react";
import Product from "./Product";
import api from "../helpers/Gateway"; // Import your API helper

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  // Call fetchProducts when the component mounts
  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() {
    try {
      const response = await api.get("store/products");

      if (response.status !== 200) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.data.results;
      this.setState({ items: data });
      console.log("data",data);
      console.log("GET request successful");
    } catch (error) {
      console.error("Error:", error.message);
      // You can add additional error handling logic here, e.g., displaying an error message to the user.
    }
  }

  
  render() {
    //send item as props to product page
    console.log("items",this.state.items);
    let items = this.state.items.map((item) => {
      return (
        <Product
          key={item.id}
          item={item} // Pass the whole item object to Product
          addToCart={this.props.addToCart}
        />
      );
    });

    return <section id="list">{items}</section>;
  }
}

export default ProductList;
