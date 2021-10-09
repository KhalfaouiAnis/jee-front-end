import {
  getMenuItemDetails,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../action-types/menuActionTypes";
import axios from "axios";

export const menuItemDetails = (id) => async (dispatch) => {
  dispatch({ type: getMenuItemDetails.GET_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`/menu/findbyid/${id}`);
    dispatch({ type: getMenuItemDetails.GET_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: getMenuItemDetails.GET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createMenuItem = (menuItem) => async (dispatch) => {
  dispatch({ type: createMenu.CREATE_REQUEST });
  try {
    const { data } = await axios.post(`/menu/save`, menuItem);
    dispatch({ type: createMenu.CREATE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: createMenu.CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMenuItem = (menuItem, menuId) => async (dispatch) => {
  dispatch({ type: updateMenu.M_UPDATE_REQUEST });
  try {
    const { data } = await axios.put(`/menu/update/${menuId}`, menuItem);
    dispatch({ type: updateMenu.M_UPDATE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: updateMenu.M_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteMenuItem = (menuItem) => async (dispatch) => {
  dispatch({ type: deleteMenu.DELETE_REQUEST });
  try {
    const { data } = await axios.post(`/menu/delete`, menuItem);
    dispatch({ type: deleteMenu.DELETE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: deleteMenu.DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
