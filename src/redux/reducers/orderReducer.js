import {
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_RESET,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_SUCCESS,
  DELIVER_ORDER_FAIL,
  GET_TODAYS_ORDERS_REQUEST,
  GET_TODAYS_ORDERS_SUCCESS,
  GET_TODAYS_ORDERS_FAIL,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL,
  GET_RESTO_ORDERS_REQUEST,
  GET_RESTO_ORDERS_SUCCESS,
  GET_RESTO_ORDERS_FAIL,
} from "../action-types/orderActionTypes";

const initialOrdersState = {
  orders: [],
  loading: false,
  error: null,
  success: false,
};

export const placeOrderReducer = (state = initialOrdersState, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case PLACE_ORDER_RESET:
      return {};
    case PLACE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// export const deliverOrderReducer = (state = initialOrdersState, action) => {
//   switch (action.type) {
//     case DELIVER_ORDER_REQUEST:
//       return {
//         ...state,
//         deliverLoading: true,
//       };
//     case DELIVER_ORDER_SUCCESS:
//       return {
//         ...state,
//         deliverLoading: false,
//         success: true,
//       };
//     case DELIVER_ORDER_FAIL:
//       return {
//         ...state,
//         deliverLoading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };

export const getUserOrdersReducer = (state = initialOrdersState, action) => {
  switch (action.type) {
    case GET_USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        success: true,
      };
    case GET_USER_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const fetchOrderReducer = (
  state = { loading: false, order: {} },
  action
) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
      };
    case FETCH_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const getAllOrdersReducer = (state = initialOrdersState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        success: true,
      };
    case GET_ALL_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const deliverOrderReducer = (
  state = { deliverLoading: false, deliverSuccess: false },
  action
) => {
  switch (action.type) {
    case DELIVER_ORDER_REQUEST:
      return {
        ...state,
        deliverLoading: true,
      };

    case DELIVER_ORDER_SUCCESS:
      return {
        ...state,
        deliverLoading: false,
        deliverSuccess: true,
      };

    case DELIVER_ORDER_FAIL:
      return {
        ...state,
        deliverLoading: false,
        deliverSuccess: false,
      };

    default:
      return state;
  }
};
const todaysOrderState = {
  loading: false,
  orders: [],
  error: null,
};
export const getTodaysOrdersReducer = (state = todaysOrderState, action) => {
  switch (action.type) {
    case GET_TODAYS_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TODAYS_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case GET_TODAYS_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        orders: [],
      };
    default:
      return state;
  }
};

export const getRestoOrdersReducer = (state = todaysOrderState, action) => {
  switch (action.type) {
    case GET_RESTO_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_RESTO_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case GET_RESTO_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        orders: [],
      };
    default:
      return state;
  }
};
