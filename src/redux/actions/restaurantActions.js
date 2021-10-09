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
  getRestoByManager,
} from "../action-types/restaurantActionTypes";
import axios from "axios";

export const getAllRestaurants = () => async (dispatch) => {
  dispatch({
    type: GET_RESTAURANTS_REQUEST,
  });

  try {
    const { data } = await axios.get("/restaurants/getallrestaurants");
    dispatch({
      type: GET_RESTAURANTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFeaturedRestaurants = () => async (dispatch) => {
  dispatch({
    type: GET_FEATURED_RESTAURANTS_REQUEST,
  });

  try {
    const { data } = await axios.get("/restaurants/getfeaturedrestaurants");
    dispatch({
      type: GET_FEATURED_RESTAURANTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FEATURED_RESTAURANTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRestaurantById = (restaurantId) => async (dispatch) => {
  dispatch({
    type: GET_RESTAURANT_BY_ID_REQUEST,
  });

  try {
    const { data } = await axios.get(`/restaurants/findbyid/${restaurantId}`);
    dispatch({
      type: GET_RESTAURANT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRestaurantByManagerId = (managerId) => async (dispatch) => {
  dispatch({
    type: getRestoByManager.GET_RESTAURANT_BY_MANAGER_ID_REQUEST,
  });

  try {
    const { data } = await axios.get(
      `/restaurants/findbymanagerid/${managerId}`
    );
    dispatch({
      type: getRestoByManager.GET_RESTAURANT_BY_MANAGER_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: getRestoByManager.GET_RESTAURANT_BY_MANAGER_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterRestaurants = (serachKey, category) => async (dispatch) => {
  let filteredRestaurants;
  dispatch({
    type: GET_RESTAURANTS_REQUEST,
  });

  try {
    const { data } = await axios.get("/restaurants/getallrestaurants");
    filteredRestaurants = data.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(serachKey)
    );
    if (category !== "all") {
      filteredRestaurants = data.filter(
        (resto) => resto.category.toLowerCase() === category
      );
    }
    dispatch({
      type: GET_RESTAURANTS_SUCCESS,
      payload: filteredRestaurants,
    });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addRestaurant = (restaurant) => async (dispatch) => {
  dispatch({
    type: ADD_RESTAURANT_REQUEST,
  });

  try {
    await axios.post("/restaurants/save", restaurant);
    dispatch({
      type: ADD_RESTAURANT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADD_RESTAURANT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editRestaurant = (updatedRestaurant, id) => async (dispatch) => {
  dispatch({
    type: EDIT_RESTAURANT_REQUEST,
  });

  try {
    const { data } = await axios.put(
      `/restaurants/update/${id}`,
      updatedRestaurant
    );

    dispatch({
      type: EDIT_RESTAURANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_RESTAURANT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteRestaurant = (restauant) => async (dispatch) => {
  dispatch({
    type: DELETE_RESTAURANT_REQUEST,
  });

  try {
    await axios.post("/restaurants/delete", { restauant });
    dispatch({
      type: DELETE_RESTAURANT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_RESTAURANT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
