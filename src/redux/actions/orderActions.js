import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAIL,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  DELIVER_ORDER_SUCCESS,
  DELIVER_ORDER_FAIL,
  DELIVER_ORDER_REQUEST,
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
import axios from "axios";

export const placeOrder = (order, restaurantid) => async (dispatch) => {
  dispatch({ type: PLACE_ORDER_REQUEST });

  try {
    await axios.post(`/orders/placeorder/${restaurantid}`, order);
    dispatch({ type: PLACE_ORDER_SUCCESS });
  } catch (error) {
    dispatch({ type: PLACE_ORDER_FAIL });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const {
    user: { id },
  } = getState().userLogin.currentUser;
  dispatch({
    type: GET_USER_ORDERS_REQUEST,
  });

  try {
    const { data } = await axios.get(`/orders/customer/${id}`);
    dispatch({
      type: GET_USER_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getALLOrders = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_ORDERS_REQUEST,
  });

  try {
    const { data } = await axios.get("/orders/allorders");
    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchOrder = (orderid) => async (dispatch) => {
  dispatch({
    type: FETCH_ORDER_REQUEST,
  });

  try {
    const { data } = await axios.get(`/orders/findbyid/${orderid}`);
    dispatch({
      type: FETCH_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (id) => async (dispatch) => {
  dispatch({
    type: DELIVER_ORDER_REQUEST,
  });

  try {
    await axios.get(`/orders/deliver/${id}`);
    dispatch({
      type: DELIVER_ORDER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELIVER_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTodaysOrders = (restoid) => async (dispatch) => {
  dispatch({
    type: GET_TODAYS_ORDERS_REQUEST,
  });
  try {
    const { data } = await axios.get(`/orders/todayresto/${restoid}`);
    dispatch({
      type: GET_TODAYS_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TODAYS_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRestoOrders = (restoid) => async (dispatch) => {
  dispatch({
    type: GET_RESTO_ORDERS_REQUEST,
  });
  try {
    const { data } = await axios.get(`/orders/allRestoOrders/${restoid}`);
    dispatch({
      type: GET_RESTO_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RESTO_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
