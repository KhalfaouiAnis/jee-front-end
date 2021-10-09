import {
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  TOGGLE_ROLE_REQUEST,
  TOGGLE_ROLE_SUCCESS,
  TOGGLE_ROLE_FAIL,
  GET_MANAGERS_REQUEST,
  GET_MANAGERS_SUCCESS,
  GET_MANAGERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../action-types/userActionTypes";
import axios from "axios";

export const getAllUsers = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_USER_REQUEST,
  });

  try {
    const { data } = await axios.get("/users/allusers");
    dispatch({
      type: GET_ALL_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userDetails = (id) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`/users/findbyid/${id}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user, userId) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const { data } = await axios.put(`/users/update/${userId}`, user);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getManagers = () => async (dispatch) => {
  dispatch({
    type: GET_MANAGERS_REQUEST,
  });

  try {
    const { data } = await axios.get("/users/findbyroleName/Manager");
    dispatch({
      type: GET_MANAGERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MANAGERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({
    type: DELETE_USER_REQUEST,
  });

  try {
    const {
      data: { deletedUserId },
    } = await axios.post("/users/deleteuser", { userId });

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: deletedUserId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toggleCurrentRole = (roleName) => async (dispatch) => {
  dispatch({
    type: TOGGLE_ROLE_REQUEST,
  });
  try {
    localStorage.setItem("currentRole", JSON.stringify(roleName));
    dispatch({
      type: TOGGLE_ROLE_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: TOGGLE_ROLE_FAIL,
      payload: "Error Accured !",
    });
  }
};
