import {
  ADD_TO_CART,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  DELETE_FROM_CART,
  DELETE_FROM_CART_REQUEST,
  DELETE_FROM_CART_SUCCESS,
} from "../action-types/cartActionTypes";

export const addToCart = (menuItem, id, quantity) => (dispatch, getState) => {
  let cartItem = {
    ...menuItem,
    subTotal: menuItem.price * quantity,
    quantity,
    restaurant: id,
  };
  dispatch({
    type: ADD_TO_CART_REQUEST,
    payload: cartItem,
  });

  dispatch({
    type: ADD_TO_CART,
    payload: cartItem,
  });
  const cartItems = getState().cart.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({
    type: ADD_TO_CART_SUCCESS,
    payload: cartItem,
  });
};

export const deleteFromCart = (item) => (dispatch, getState) => {
  dispatch({
    type: DELETE_FROM_CART_REQUEST,
  });
  dispatch({
    type: DELETE_FROM_CART,
    payload: item,
  });

  const cartItems = getState().cart.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  dispatch({
    type: DELETE_FROM_CART_SUCCESS,
  });
};
