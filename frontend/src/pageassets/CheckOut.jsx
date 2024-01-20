import React, { useState, useEffect } from "react";
import api from "../helpers/Gateway";

const Checkout = ({ cartItems, cartTotal,cartId }) => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    // Add other shipping information fields as needed
  });

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async () => {
    try {
      // Create an order with the selected items and shipping information
      const orderResponse = await api.post(`/store/orders/`, {
        //   items: cartItems.map((item) => ({
        //   product_id: item.product.id,
        //   unit_price:item.product.unit_price,
        //   quantity: item.quantity,
        // })),
        // shipping_info: shippingInfo,
        cart_id: cartId,
      });

      // Handle the order response as needed (e.g., show confirmation message)
      console.log("Order placed successfully:", orderResponse.data);
      // Remove cartId from localStorage
      localStorage.removeItem("cartId");

      // //Delete the cart object and return to homepage
      // const deleteCart = api.delete(`/store/carts/${cartID}/`);

      // console.log("Cart Deleted")
      // Clear the cart
      // Redirect to a thank you page
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Checkout</h2>

      <div>
        <h3>Selected Items</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.product.title} - Qty: {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Shipping Information</h3>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
            />
          </label>
          {/* Add other shipping information fields here */}
        </form>
      </div>

      <div>
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        <button onClick={handleCheckout}>Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
