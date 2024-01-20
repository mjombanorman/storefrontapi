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

  const addToCart = (id) => async () => {
    try {
      // Check if there is an existing cartId
      if (!cartId) {
        // If no cartId, create a new cart
        const createCartResponse = await api.post("/store/carts/");
        setCartId(createCartResponse.data.id);
        // Store the new cartId in localStorage
        localStorage.setItem(
          "cartId",
          JSON.stringify(createCartResponse.data.id)
        );
      }

      // Add item to the cart using the obtained cartId
      const postItem = await api.post(`/store/carts/${cartId}/items/`, {
        product_id: id,
        quantity: 1,
      });
      console.log("Item added to cart:", postItem.data);



      // You can update cartItems and cartTotal if needed
       const cartedProducts = await api.get(
              `/store/carts/${cartId}/items/`
            );
            console.log("Carted Products:", cartedProducts.data);
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        ...cartedProducts.data,
      ]);

      console.log("CartItems", cartItems);
      // setCartTotal(newTotalValue);
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
  useEffect(() => {
    console.log("CartItems Updated:", cartItems);
  }, [cartItems]);

  return (
    <>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.product.title} {item.product.unit_price}
          </li>
        ))}
      </ul>
      <hr />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title}{" "}
            <button onClick={addToCart(item.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AllProducts;
