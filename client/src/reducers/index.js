import { combineReducers } from "redux";

const shopeeReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, products: action.products };
    case "ADD_TO_CART":
      let newCart = [];
      newCart.push(state.products[action.index]);
      if (state.cart) {
        let toReturn = state.cart;
        toReturn.push(state.products[action.index]);
        return {
          ...state,
          cart: toReturn
        };
      }
      return { ...state, cart: newCart };
    case "DELETE_FROM_CART":
      let newCartEx = state.cart.filter(item => {
        if (item.name != state.products[action.index]["name"]) {
          return item;
        }
      });
      return { ...state, cart: newCartEx };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  shoppe: shopeeReducer
});

export default rootReducer;
