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

//   const addToCart = (id) => async () => {
//     try {
//       if (!cartId) {
//         const createCartResponse = await api.post("/store/carts/");
//         setCartId(createCartResponse.data.id);
//         localStorage.setItem(
//           "cartId",
//           JSON.stringify(createCartResponse.data.id)
//         );
//       }

//       const postItem = await api.post(`/store/carts/${cartId}/items/`, {
//         product_id: id,
//         quantity: 1,
//       });

//       console.log("Item added to cart:", postItem.data);

//           // You can update cartItems and cartTotal if needed
//       const cartedProducts = await api.get(`/store/carts/${cartId}/items/`);
//       console.log("products", cartedProducts.data); 
//       console.log("product id org", id);
//       setCartItems((prevCartItems) => [
//         ...prevCartItems,
//         ...cartedProducts.data,
//       ]);

//       console.log("products", cartedProducts.data);
//       console.log("product id org", id);
//       console.log("Carted Products:", cartedProducts.data);
//       console.log("cartItems", cartItems);
//       if (cartedProducts.data) {

//         const existingItem = cartedProducts.data.find(
//           (item) => item.product.id === 1
//         );

//         console.log("existingItem", existingItem);
//         if (existingItem) {
//           existingItem.quantity += 1;
//         } else {
//           cartItems.push(postItem.data);
//         }
//       }

   

//       // setCartTotal(newTotalValue);
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
//   useEffect(() => {
//     console.log("CartItems Updated:", cartItems);
//   }, [cartItems]);

//   return (
//     <>
//       <ul>
//         {cartItems ? 
          
//           cartItems.map((item) => (
//           <li key={item.id}>
//         qty:{item.quantity} product:{item.product.title}  subtotal: {item.product.price * item.quantity}
//           </li>
//         )) : <p>loading cart...</p>}
//       </ul>
//       <hr />
//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>
//             {item.title}{" "}
//             <button onClick={addToCart(item.id)}>Add to Cart</button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }
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
        const createCartResponse = await api.post("/store/carts/");
        setCartId(createCartResponse.data.id);
        localStorage.setItem("cartId", JSON.stringify(createCartResponse.data.id));
      }

      const postItemResponse = await api.post(
        `/store/carts/${cartId}/items/`,
        { product_id: id, quantity: 1 }
      );

      console.log("Item added to cart:", postItemResponse.data);

      // Fetch updated cart items and update state
      const updatedCartItems = await api.get(`/store/carts/${cartId}/items/`);
      setCartItems(updatedCartItems.data);

      // Calculate and update cart total
      const newTotalValue = updatedCartItems.data.reduce(
        (total, item) => total + item.product.price * item.quantity,
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

  return (
    <>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.id}>
              Qty: {item.quantity} Product: {item.product.title} Subtotal: ${(
                item.product.price * item.quantity
              ).toFixed(2)}
            </li>
          ))
        ) : (
          <p>Loading cart...</p>
        )}
      </ul>
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

// export default AllProducts;


   //find the sent cartID exists in the cartItems
     // const existingItem = cartItems.find((item) => item.id === id);
      //console.log("existingItem", existingItem);

      // setCartItems((prevCartItems) => {
      //   const existingItemIndex = prevCartItems.findIndex(
      //     (item) => item.id === postItem.data.product.id
      //   );
        //console.log("existingItemIndex", existingItemIndex);
        // if (existingItemIndex !== -1) {
        //   // If the item already exists, update the quantity
        //   const updatedCartItems = [...prevCartItems];
        //   updatedCartItems[existingItemIndex].quantity += 1;
        //   return updatedCartItems;
        // } else {
        //   // If the item is new, add it to the array
        //   return [...prevCartItems, postItem.data];
        // }
   // }
//);
      
    // console.log("Carted Products:", cartedProducts.data);
    // setCartItems((prevCartItems) => [
    //         ...prevCartItems,
    //         ...cartedProducts.data,
    //       ]);

//   const cartedProducts = await api.get(`/store/carts/${cartId}/items/`);
    


  // const addToCart = (id) => async () => {
  //   try {
  //     // Check if there is an existing cartId
  //     if (!cartId) {
  //       // If no cartId, create a new cart
  //       const createCartResponse = await api.post("/store/carts/");
  //       setCartId(createCartResponse.data.id);
  //       // Store the new cartId in localStorage
  //       localStorage.setItem(
  //         "cartId",
  //         JSON.stringify(createCartResponse.data.id)
  //       );
  //     }

  //     // Add item to the cart using the obtained cartId
  //     const postItem = await api.post(`/store/carts/${cartId}/items/`, {
  //       product_id: id,
  //       quantity: 1,
  //     });
  //     console.log("Item added to cart:", postItem.data);



  //     // You can update cartItems and cartTotal if needed
  //      const cartedProducts = await api.get(
  //             `/store/carts/${cartId}/items/`
  //           );
  //           console.log("Carted Products:", cartedProducts.data);
  //     setCartItems((prevCartItems) => [
  //       ...prevCartItems,
  //       ...cartedProducts.data,
  //     ]);

  //     console.log("CartItems", cartItems);
  //     // setCartTotal(newTotalValue);
  //   } catch (error) {
  //     console.error("Error adding item to cart:", error);
  //   }
  // };
