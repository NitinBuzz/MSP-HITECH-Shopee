import { Products } from "../data/index";

export const addToCart = index => ({
  type: "ADD_TO_CART",
  index
});

export const deleteFromCart = index => ({
  type: "DELETE_FROM_CART",
  index
});

export const getProduct = () => ({
  type: "GET_PRODUCT",
  products: Products.slice(0, 10)
});

export const placeOrder = () => ({
  type: "PLACE_ORDER"
});
