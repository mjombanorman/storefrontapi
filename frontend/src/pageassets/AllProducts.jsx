import React, { useEffect, useState } from "react";
import api from "../helpers/Gateway";
import Checkout from "./CheckOut";

function AllProducts() {
  // State variables
  const [items, setItems] = useState([]); // Products from the API
  const [cartId, setCartId] = useState(() => {
    const storedCartId = localStorage.getItem("cartId");
    return storedCartId ? JSON.parse(storedCartId) : null;
  });
  const [cartItems, setCartItems] = useState([]); // Items in the cart
  const [cartTotal, setCartTotal] = useState(0); // Total cart value
  const [isCheckingOut, setIsCheckingOut] = useState(false); // Checkout mode

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
          setCartTotal(calculateCartTotal(cartData.data.items));
        }
      } catch (error) {
        console.error("Error preloading cart data:", error);
      }
    };
    preloadCart();
  }, [cartId]);
  // Helper function to calculate cart total
  const calculateCartTotal = (items) => {
    return items.reduce(
      (total, item) => total + item.product.unit_price * item.quantity,
      0
    );
  };

  // Add item to the cart function
  const addToCart = async (id) => {
    try {
      const cart = cartId
        ? await api.get(`/store/carts/${cartId}/`)
        : await api.post("/store/carts/");
      const item = await api.post(`/store/carts/${cart.data.id}/items/`, {
        product_id: id,
        quantity: 1,
      });
      const updatedCart = await api.get(`/store/carts/${cart.data.id}/`);
      setCartItems(updatedCart.data.items);
      setCartTotal(calculateCartTotal(updatedCart.data.items));
      setCartId(cart.data.id);
      localStorage.setItem("cartId", JSON.stringify(cart.data.id));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Update quantity function
  const updateQty = (id) => async (event) => {
    try {
      const userQty = event.target.value;
      await api.patch(`/store/carts/${cartId}/items/${id}/`, {
        quantity: userQty,
      });
      const updatedCart = await api.get(`/store/carts/${cartId}/`);
      setCartItems(updatedCart.data.items);
      setCartTotal(calculateCartTotal(updatedCart.data.items));
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  // Remove product from the cart
  const removeFromCart = (id) => async () => {
    try {
      await api.delete(`/store/carts/${cartId}/items/${id}/`);
      const updatedCart = await api.get(`/store/carts/${cartId}/`);
      setCartItems(updatedCart.data.items);
      setCartTotal(calculateCartTotal(updatedCart.data.items));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  // //  Add item to the cart function
  // const addToCart = async (id) => {
  //   try {
  //     if (!cartId) {
  //       // If cartId doesn't exist, create a new cart
  //       const createCartResponse = await api.post("/store/carts/");
  //       const newCartId = createCartResponse.data.id;
  //       await api.post(`/store/carts/${newCartId}/items/`, {
  //         product_id: id,
  //         quantity: 1,
  //       });

  //       // Fetch the updated cart items for the new cart
  //       const newCartData = await api.get(`/store/carts/${newCartId}/`);
  //       setCartItems(newCartData.data.items);

  //       setCartId(newCartId);
  //       localStorage.setItem("cartId", JSON.stringify(newCartId));
  //     } else {
  //       // Fetch current cart data
  //       const cartData = await api.get(`/store/carts/${cartId}/`);
  //       setCartItems(cartData.data.items);
  //     }

  //     // Check if the item is already in the cart
  //     const existingCartItem = cartItems.find((item) => item.product.id === id);

  //     if (existingCartItem) {
  //       // If the item is already in the cart, update its quantity
  //       const updatedItemResponse = await api.patch(
  //         `/store/carts/${cartId}/items/${existingCartItem.id}/`,
  //         { quantity: existingCartItem.quantity + 1 }
  //       );
  //       console.log("Item quantity updated:", updatedItemResponse.data);
  //     } else {
  //       // If the item is not in the cart, add it
  //       const postItemResponse = await api.post(
  //         `/store/carts/${cartId}/items/`,
  //         {
  //           product_id: id,
  //           quantity: 1,
  //         }
  //       );
  //       console.log("Item added to cart:", postItemResponse.data);
  //     }

  //     // Fetch updated cart items and update state
  //     const updatedCartItems = await api.get(`/store/carts/${cartId}/items/`);
  //     setCartItems(updatedCartItems.data);

  //     // Calculate and update cart total
  //     const newTotalValue = updatedCartItems.data.reduce(
  //       (total, item) => total + item.product.unit_price * item.quantity,
  //       0
  //     );
  //     setCartTotal(newTotalValue);
  //   } catch (error) {
  //     console.error("Error adding item to cart:", error);
  //   }
  // };

  // // Update quantity function
  // const updateQty = (id) => async (event) => {
  //   try {
  //     const userQty = event.target.value;
  //     console.log("Item id:", id);
  //     console.log("Item quantity:", userQty);

  //     // Update quantity using patch request
  //     const response = await api.patch(`/store/carts/${cartId}/items/${id}/`, {
  //       quantity: userQty,
  //     });
  //     console.log("Item quantity updated:", response.data);

  //     // Fetch updated cart items and update state
  //     const updatedCartItems = await api.get(`/store/carts/${cartId}/items/`);
  //     setCartItems(updatedCartItems.data);

  //     // Calculate and update cart total
  //     const newTotalValue = updatedCartItems.data.reduce(
  //       (total, item) => total + item.product.unit_price * item.quantity,
  //       0
  //     );
  //     setCartTotal(newTotalValue);
  //   } catch (error) {
  //     console.error("Error updating item quantity:", error);
  //   }
  // };

  // //Remove product from the cart
  // const removeFromCart = (id) => async () => {
  //   try {
  //     // Remove item from cart using delete request
  //     const response = await api.delete(`/store/carts/${cartId}/items/${id}/`);
  //     console.log("Item removed from cart:", response.data);

  //     // Fetch updated cart items and update state
  //     const updatedCartItems = await api.get(`/store/carts/${cartId}/items/`);
  //     setCartItems(updatedCartItems.data);

  //     // Calculate and update cart total
  //     const newTotalValue = updatedCartItems.data.reduce(
  //       (total, item) => total + item.product.unit_price * item.quantity,
  //       0
  //     );
  //     setCartTotal(newTotalValue);
  //   } catch (error) {
  //     console.error("Error removing item from cart:", error);
  //   }
  // };

  // // Fetch products function
  // const fetchProducts = async () => {
  //   try {
  //     const response = await api.get("/store/products/");
  //     setItems(response.data.results);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  // // Function to toggle checkout mode
  // const toggleCheckout = () => {
  //   setIsCheckingOut((prev) => !prev);
  // };
  // // Load products on component mount
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // // Preload cart data if cartId exists
  // useEffect(() => {
  //   const preloadCart = async () => {
  //     try {
  //       if (cartId) {
  //         const cartData = await api.get(`/store/carts/${cartId}/`);
  //         setCartItems(cartData.data.items);

  //         const newTotalValue = cartData.data.items.reduce(
  //           (total, item) => total + item.product.unit_price * item.quantity,
  //           0
  //         );
  //         setCartTotal(newTotalValue);
  //       }
  //     } catch (error) {
  //       console.error("Error preloading cart data:", error);
  //     }
  //   };

  //   preloadCart();
  // }, [cartId]);

  // JSX

  return (
    <>
      {isCheckingOut ? (
        // Render the Checkout component if isCheckingOut is true
        <Checkout cartItems={cartItems} cartTotal={cartTotal} cartId={cartId} />
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
