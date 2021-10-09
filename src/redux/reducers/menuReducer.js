import {
  getMenuItemDetails,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../action-types/menuActionTypes";

export const menuItemDetailsReducer = (
  state = { loading: false, menuItem: {} },
  action
) => {
  switch (action.type) {
    case getMenuItemDetails.GET_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case getMenuItemDetails.GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        menuItem: action.payload,
      };
    case getMenuItemDetails.GET_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createMenuItemReducer = (
  state = { loading: false, success: null, error: null },
  action
) => {
  switch (action.type) {
    case createMenu.CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case createMenu.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case createMenu.CREATE_RESET:
      return {};
    case createMenu.CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateMenuItemReducer = (
  state = { loading: false, success: null, error: null },
  action
) => {
  switch (action.type) {
    case updateMenu.M_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case updateMenu.M_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case updateMenu.M_UPDATE_RESET:
      return {};
    case updateMenu.M_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteMenuItemReducer = (
  state = { loading: false, success: null, error: null },
  action
) => {
  switch (action.type) {
    case deleteMenu.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case deleteMenu.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case deleteMenu.DELETE_RESET:
      return {};
    case deleteMenu.DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
