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
//         // If cartId doesn't exist, create a new cart
//         const createCartResponse = await api.post("/store/carts/");
//         setCartId(createCartResponse.data.id);
//         localStorage.setItem(
//           "cartId",
//           JSON.stringify(createCartResponse.data.id)
//         );
//       }

//       // Fetch current cart data
//       const cartData = await api.get(`/store/carts/${cartId}/`);
//       setCartItems(cartData.data);

//       // Add item to the cart
//       const postItemResponse = await api.post(`/store/carts/${cartId}/items/`, {
//         product_id: id,
//         quantity: 1,
//       });

//       console.log("Item added to cart:", postItemResponse.data);

//       // Fetch updated cart items and update state
//       const updatedCartItems = await api.get(`/store/carts/${cartId}/items/`);
//       setCartItems(updatedCartItems.data);

//       // Calculate and update cart total
//       const newTotalValue = updatedCartItems.data.reduce(
//         (total, item) => total + item.product.unit_price * item.quantity,
//         0
//       );
//       setCartTotal(newTotalValue);
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//     }
//   };

//   //Fucntion to update product quantity by getting the input form value on chnage the setting it quanity in patch request
//   const updateQty = (id) => {
//     try {
//       console.log("Item id:", id);
//       var userQty = document.getElementByName('quantity').value;
//       console.log("Item quantity:", userQty);
//       const response = api.patch(`/store/carts/${cartId}/items/${id}/`,{quantity:userQty});
//       console.log("Item quantity updated:", response.data);
//       // // Fetch updated cart items and update state
//       const updatedCartItems = api.get(`/store/carts/${cartId}/items/`);
//       setCartItems(updatedCartItems.data);
//     } catch (error) {
//       console.error("Error updating item quantity:", error);
//     }
//   }

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

//   // Preload cart data if cartId exists
//   useEffect(() => {
//     const preloadCart = async () => {
//       try {
//         if (cartId) {
//           const cartData = await api.get(`/store/carts/${cartId}/`);
//           setCartItems(cartData.data.items);
//           console.log("Cart data preloaded:", cartData.data);
//           // Calculate and update cart total
//           const newTotalValue = cartData.data.items.reduce(
//             (total, item) => total + item.product.unit_price * item.quantity,
//             0
//           );
//           setCartTotal(newTotalValue);
//         }
//       } catch (error) {
//         console.error("Error preloading cart data:", error);
//       }
//     };

//     preloadCart();
//   }, [cartId]);

//   return (
//     <>
//       <ul>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <li key={item.id}>
//              Product: {item.product.title} :::: Subtotal:
//               $ {(item.product.unit_price * item.quantity).toFixed(2)} ::::

//              QTY: <input name="quantity"  value={item.quantity} onChange={updateQty(item.id)} />

//               {/* <button onClick={removeItem(item.id)}> Remove from Cart</button> */}
//             </li>
//           ))
//         ) : (
//           <p>Loading cart...</p>
//         )}
//       </ul>
//       Total: ${cartTotal.toFixed(2)}
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
import Checkout from "./CheckOut";

function AllProducts() {
  // State variables
  const [items, setItems] = useState([]);
  const [cartId, setCartId] = useState(() => {
    const storedCartId = localStorage.getItem("cartId");
    return storedCartId ? JSON.parse(storedCartId) : null;
  });
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Add item to the cart function
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
      setCartItems(cartData.data.items);

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

  // Update quantity function
  const updateQty = (id) => async (event) => {
    try {
      const userQty = event.target.value;
      console.log("Item id:", id);
      console.log("Item quantity:", userQty);

      // Update quantity using patch request
      const response = await api.patch(`/store/carts/${cartId}/items/${id}/`, {
        quantity: userQty,
      });
      console.log("Item quantity updated:", response.data);

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
      console.error("Error updating item quantity:", error);
    }
  };

  //Remove product from the cart
  const removeFromCart = (id) => async () => {
    try {
      // Remove item from cart using delete request
      const response = await api.delete(`/store/carts/${cartId}/items/${id}/`);
      console.log("Item removed from cart:", response.data);

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
      console.error("Error removing item from cart:", error);
    }
  };

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const response = await api.get("/store/products/");
      setItems(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to toggle checkout mode
  const toggleCheckout = () => {
    setIsCheckingOut((prev) => !prev);
  };
  // Load products on component mount
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

  // JSX

  return (
    <>
      {isCheckingOut ? (
        // Render the Checkout component if isCheckingOut is true
        <Checkout cartItems={cartItems} cartTotal={cartTotal} cartID={cartId} />
      ) : (
        // Render the product list and cart summary
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                Product: {item.product.title} :::: Subtotal: $
                {(item.product.unit_price * item.quantity).toFixed(2)} :::: QTY:
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={updateQty(item.id)}
                />
                <button onClick={() => removeFromCart(item.id)}>
                  Remove from Cart
                </button>
              </li>
            ))}
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
          <button onClick={toggleCheckout}>Checkout</button>
        </>
      )}
    </>
  );

 
}

export default AllProducts;
