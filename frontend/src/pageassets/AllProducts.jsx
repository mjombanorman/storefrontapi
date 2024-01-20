// import React, { useEffect, useState } from "react";
// import api from "../helpers/Gateway";

// function AllProducts() {
//   const [items, setItems] = useState([]);
//   const [cartId, setCartId] = useState(() => {
//     // Retrieve cartId from localStorage on component mount
//     const storedCartId = localStorage.getItem("cartId");
//     return storedCartId ? JSON.parse(storedCartId) : null;
//   });
//   const [cartItems, setCartItems] = useState([]);
//   const [cartTotal, setCartTotal] = useState(0);

//   const addToCart = async (id) => {
//     try {
//       if (!cartId) {
//         const createCartResponse = await api.post("/store/carts/");
//         setCartId(createCartResponse.data.id);
//         localStorage.setItem("cartId", JSON.stringify(createCartResponse.data.id));
//       }else{
//         console.log("Cart already exists:", cartId);
//         const cartData = await api.get(`/store/carts/${cartId}/`);
//         setCartItems(cartData.data);
//           const postItemResponse = await api.post(
//                 `/store/carts/${cartId}/items/`,
//                 { product_id: id, quantity: 1 }
//               );

//               console.log("Item added to cart:", postItemResponse.data);

//               // Fetch updated cart items and update state
//               const updatedCartItems = await api.get(
//                 `/store/carts/${cartId}/items/`
//               );
//               setCartItems(updatedCartItems.data);

//               // Calculate and update cart total
//               const newTotalValue = updatedCartItems.data.reduce(
//                 (total, item) =>
//                   total + item.product.unit_price * item.quantity,
//                 0
//               );
//               setCartTotal(newTotalValue);
//       }


//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await api.get("/store/products/");
//       setItems(response.data.results);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <>
//       <ul>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <li key={item.id}>
//               Qty: {item.quantity} Product: {item.product.title} :::: Subtotal: $ {(
//                 item.product.unit_price * item.quantity
//               ).toFixed(2)}
//             </li>
//           ))
//         ) : (
//           <p>Loading cart...</p>
//         )}
//       </ul>
//       Total::{cartTotal.toFixed(2)}
//       <hr />
//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>
//             {item.title}
//             <button onClick={() => addToCart(item.id)}>Add to Cart</button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default AllProducts;

import React, { useEffect, useState } from "react";
import api from "../helpers/Gateway";

function AllProducts() {
  const [items, setItems] = useState([]);
  const [cartId, setCartId] = useState(() => {
    // Retrieve cartId from localStorage on component mount
    const storedCartId = localStorage.getItem("cartId");
    return storedCartId ? JSON.parse(storedCartId) : null;
  });
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCart = async (id) => {
    try {
      if (!cartId) {
        // If cartId doesn't exist, create a new cart
        const createCartResponse = await api.post("/store/carts/");
        setCartId(createCartResponse.data.id);
        localStorage.setItem(
          "cartId",
          JSON.stringify(createCartResponse.data.id)
        );
      }

      // Fetch current cart data
      const cartData = await api.get(`/store/carts/${cartId}/`);
      setCartItems(cartData.data);

      // Add item to the cart
      const postItemResponse = await api.post(`/store/carts/${cartId}/items/`, {
        product_id: id,
        quantity: 1,
      });

      console.log("Item added to cart:", postItemResponse.data);

      // Fetch updated cart items and update state
      const updatedCartItems = await api.get(`/store/carts/${cartId}/items/`);
      setCartItems(updatedCartItems.data);

      // Calculate and update cart total
      const newTotalValue = updatedCartItems.data.reduce(
        (total, item) => total + item.product.unit_price * item.quantity,
        0
      );
      setCartTotal(newTotalValue);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/store/products/");
      setItems(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Preload cart data if cartId exists
  useEffect(() => {
    const preloadCart = async () => {
      try {
        if (cartId) {
          const cartData = await api.get(`/store/carts/${cartId}/`);
          setCartItems(cartData.data.items);
          console.log("Cart data preloaded:", cartData.data);
          // Calculate and update cart total
          const newTotalValue = cartData.data.items.reduce(
            (total, item) => total + item.product.unit_price * item.quantity,
            0
          );
          setCartTotal(newTotalValue);
        }
      } catch (error) {
        console.error("Error preloading cart data:", error);
      }
    };

    preloadCart();
  }, [cartId]);

  return (
    <>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.id}>
              Qty: {item.quantity} Product: {item.product.title} :::: Subtotal:
              $ {(item.product.unit_price * item.quantity).toFixed(2)}
            </li>
          ))
        ) : (
          <p>Loading cart...</p>
        )}
      </ul>
      Total: ${cartTotal.toFixed(2)}
      <hr />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => addToCart(item.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AllProducts;
