import {
  GET_RESTAURANTS_REQUEST,
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAIL,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAIL,
  ADD_RESTAURANT_REQUEST,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAIL,
  EDIT_RESTAURANT_REQUEST,
  EDIT_RESTAURANT_SUCCESS,
  EDIT_RESTAURANT_FAIL,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAIL,
  GET_FEATURED_RESTAURANTS_REQUEST,
  GET_FEATURED_RESTAURANTS_SUCCESS,
  GET_FEATURED_RESTAURANTS_FAIL,
  DELETE_RESTAURANT_RESET,
  getRestoByManager,
} from "../action-types/restaurantActionTypes";

export const restaurantListReducer = (
  state = { restaurants: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_RESTAURANTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_RESTAURANTS_SUCCESS:
      return {
        ...state,
        restaurants: action.payload,
        loading: false,
      };
    case GET_RESTAURANTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const featuredRestaurantListReducer = (
  state = { featured: [], fetching: false, errors: null },
  action
) => {
  switch (action.type) {
    case GET_FEATURED_RESTAURANTS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case GET_FEATURED_RESTAURANTS_SUCCESS:
      return {
        ...state,
        featured: action.payload,
        fetching: false,
      };
    case GET_FEATURED_RESTAURANTS_FAIL:
      return {
        ...state,
        errors: action.payload,
        fetching: false,
      };
    default:
      return state;
  }
};

export const getRestaurantByIdReducer = (
  state = {
    restaurant: { address: null, workingHours: null, menu: [], reviews: [] },
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_RESTAURANT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        restaurant: action.payload,
        loading: false,
      };
    case GET_RESTAURANT_BY_ID_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const getRestaurantByManagerIdReducer = (
  state = {
    restaurant: { address: null, workingHours: null, menu: [], reviews: [] },
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case getRestoByManager.GET_RESTAURANT_BY_MANAGER_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case getRestoByManager.GET_RESTAURANT_BY_MANAGER_ID_SUCCESS:
      return {
        ...state,
        restaurant: action.payload,
        loading: false,
      };
    case getRestoByManager.GET_RESTAURANT_BY_MANAGER_ID_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const addRestaurantReducer = (
  state = {
    success: false,
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case ADD_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_RESTAURANT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case ADD_RESTAURANT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DELETE_RESTAURANT_RESET:
      return {};
    default:
      return state;
  }
};

export const editRestaurantReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_RESTAURANT_REQUEST:
      return {
        ...state,
        editLoading: true,
      };
    case EDIT_RESTAURANT_SUCCESS:
      return {
        ...state,
        editSuccess: true,
        editLoading: false,
      };
    case EDIT_RESTAURANT_FAIL:
      return {
        ...state,
        editError: action.payload,
        editLoading: false,
      };
    case DELETE_RESTAURANT_RESET:
      return {};
    default:
      return state;
  }
};

const initialDeleteState = {
  deleteLoading: false,
  deleteSuccess: false,
  deleteError: null,
};
export const deleteRestaurantReducer = (state = initialDeleteState, action) => {
  switch (action.type) {
    case DELETE_RESTAURANT_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteLoading: false,
      };
    case DELETE_RESTAURANT_FAIL:
      return {
        ...state,
        deleteError: action.payload,
        deleteLoading: false,
      };
    case DELETE_RESTAURANT_RESET:
      return {};
    default:
      return state;
  }
};
