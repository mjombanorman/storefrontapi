import React, { Component } from "react";
import api from "../../helpers/Gateway";
import ProductItem from "../../components/product-item/product-item.component";
import Collection from "../../components/collections/collections.component";
import SearchBar from "../../components/search/search.componet";
import Paginate from "../../components/pagination/pagination.component";
import { Container } from "react-bootstrap";

class HomePage extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      items: [], // Products from the API
      collections: [],
      selectedCollection: null,
      searchQuery: "",
      pagination: { pageIndex: 1, pageSize: 12 },
      rowCount: 0,
      cartId: localStorage.getItem("cartId")
        ? JSON.parse(localStorage.getItem("cartId"))
        : null,
      cartItems: [], // Items in the cart
      cartTotal: 0, // Total cart value
      isCheckingOut: false, // Checkout mode
    };
  }

  // Fetch products from the API
  // Fetch products from the API
  fetchProducts = async () => {
    try {
      const { pagination, searchQuery } = this.state;
      const productResponse = await api.get("store/products/", {
        params: {
          page: pagination.pageIndex,
          page_size: pagination.pageSize,
          search: searchQuery, // Pass the searchQuery directly
        },
      });
      console.log(productResponse);
      this.setState({
        items: productResponse.data.results,
        rowCount: productResponse.data.count,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch collections from the API
  fetchCollections = async () => {
    try {
      const response = await api.get("/store/collections/");
      this.setState({ collections: response.data });
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  // Preload cart data if cartId exists
  preloadCart = async () => {
    try {
      const { cartId } = this.state;
      if (cartId) {
        const cartData = await api.get(`/store/carts/${cartId}/`);
        this.setState({
          cartItems: cartData.data.items,
          cartTotal: this.calculateCartTotal(cartData.data.items),
        });
      }
    } catch (error) {
      console.error("Error preloading cart data:", error);
    }
  };

  // Helper function to calculate cart total
  calculateCartTotal = (items) => {
    return items.reduce(
      (total, item) => total + item.product.unit_price * item.quantity,
      0
    );
  };

  // Handle page change
  handleChange = (event, newPage) => {
    this.setState(
      (prevState) => ({
        pagination: { ...prevState.pagination, pageIndex: newPage },
      }),
      () => {
        this.fetchProducts();
      }
    );
  };

  // Update state and fetch products using searchQuery
  handleSearch = (searchQuery) => {
    this.setState({ searchQuery }, () => this.fetchProducts());
  };
  // Filter products by collection
  handleCollectionFilter = async (collectionId) => {
    try {
      const { pagination } = this.state;
      const productResponse = await api.get("store/products/", {
        params: {
          collection_id: collectionId,
          page: pagination.pageIndex,
          page_size: pagination.pageSize,
        },
      });
      this.setState({
        items: productResponse.data.results,
        rowCount: productResponse.data.count,
        selectedCollection: collectionId,
      });
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  // Add item to the cart
  addToCart = async (id) => {
    try {
      const { cartId } = this.state;
      const cart = cartId
        ? await api.get(`/store/carts/${cartId}/`)
        : await api.post("/store/carts/");
      const item = await api.post(`/store/carts/${cart.data.id}/items/`, {
        product_id: id,
        quantity: 1,
      });
      const updatedCart = await api.get(`/store/carts/${cart.data.id}/`);
      this.setState(
        {
          cartItems: updatedCart.data.items,
          cartTotal: this.calculateCartTotal(updatedCart.data.items),
          cartId: cart.data.id,
        },
        () => {
          localStorage.setItem("cartId", JSON.stringify(cart.data.id));
        }
      );
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Remove product from the cart
  removeFromCart = async (id) => {
    try {
      const { cartId } = this.state;
      await api.delete(`/store/carts/${cartId}/items/${id}/`);
      const updatedCart = await api.get(`/store/carts/${cartId}/`);
      this.setState({
        cartItems: updatedCart.data.items,
        cartTotal: this.calculateCartTotal(updatedCart.data.items),
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Update quantity of item in the cart
  updateQty = async (id, quantity) => {
    try {
      const { cartId } = this.state;
      await api.patch(`/store/carts/${cartId}/items/${id}/`, { quantity });
      const updatedCart = await api.get(`/store/carts/${cartId}/`);
      this.setState({
        cartItems: updatedCart.data.items,
        cartTotal: this.calculateCartTotal(updatedCart.data.items),
      });
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  // Toggle checkout mode
  toggleCheckout = () => {
    this.setState((prevState) => ({
      isCheckingOut: !prevState.isCheckingOut,
    }));
  };

  // Lifecycle method: fetch data on component mount
  componentDidMount() {
    this.fetchProducts();
    this.fetchCollections();
    this.preloadCart();
  }

  render() {
    const {
      collections,
      searchQuery,
      cartItems,
      cartTotal,
      pagination,
      rowCount,
      isCheckingOut,
      items,
    } = this.state;
    // Map products to their respective collection names
    const productsWithCollectionName = items.map((item) => {
      const collection = collections.find(
        (collection) => collection.id === item.collection
      );
      return {
        ...item,
        collectionName: collection ? collection.title : "Unknown Collection",
      };
    });

    return (
      <Container fluid>
        <div className="row mt-5">
          <div className="col-2">
     
              <SearchBar
                handleSearch={this.handleSearch}
                searchQuery={this.state.searchQuery}
              />
            

              {collections.map(({ id, ...otherProps }) => (
                <Collection
                  key={id}
                  {...otherProps}
                  handleCollectionFilter={() => this.handleCollectionFilter(id)}
                />
              ))}
          
          </div>
          <div className="col-10">
            <div className="container">
              <div className="row justify-content-between">
                {!isCheckingOut ? (
                  productsWithCollectionName.length !== 0 ? (
                    productsWithCollectionName.map((product, index) => (
                      <div key={index} className="col-lg-3 mb-3">
                        <ProductItem product={product} addToCart={this.addToCart(product.id)} />
                      </div>
                    ))
                  ) : (
                    <p>No products found</p>
                  )
                ) : (
                  <Checkout
                    cartItems={cartItems}
                    cartTotal={cartTotal}
                    updateQty={this.updateQty}
                    removeFromCart={this.removeFromCart}
                  />
                )}

                <Paginate
                  rowCount={rowCount}
                  pagination={pagination}
                  handleChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default HomePage;
