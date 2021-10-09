import {
  ADD_TO_CART,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  DELETE_FROM_CART,
  DELETE_FROM_CART_REQUEST,
  DELETE_FROM_CART_SUCCESS,
} from "../action-types/cartActionTypes";

const initialState = {
  cartItems: [],
  loading: false,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_CART:
      const alreadyExist = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (alreadyExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_FROM_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
        loading: true,
      };

    case DELETE_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
