import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_RESET,
} from "../action-types/authActionTypes";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case USER_REGISTER_RESET:
      return {};

    default:
      return state;
  }
};

const initialLoginState = {
  success: false,
  logoutSuccess: false,
  error: null,
  loading: false,
  currentUser: null,
  currentRole: null,
};

export const userLoginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        currentUser: action.payload,
        currentRole: action.payload.user.roles[0].roleName,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT_SUCCESS:
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentRole");
      return {
        ...state,
        logoutSuccess: true,
        error: null,
        loading: false,
        currentUser: null,
      };

    default:
      return state;
  }
};
