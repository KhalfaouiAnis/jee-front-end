import {
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
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
  UPDATE_USER_RESET,
} from "../action-types/userActionTypes";

export const userDetailsReducer = (
  state = { fetching: false, error: null, user: {} },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        fetching: false,
        user: action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// admin reducers
export const usersListReducer = (
  state = { users: [], loading: false },
  action
) => {
  switch (action.type) {
    case GET_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_ALL_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const managersListReducer = (
  state = { managers: [], loading: false },
  action
) => {
  switch (action.type) {
    case GET_MANAGERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MANAGERS_SUCCESS:
      return {
        ...state,
        managers: action.payload,
        loading: false,
      };
    case GET_MANAGERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const initialDeleteState = {
  deleteLoading: false,
  deleteSuccess: false,
  deletedUserId: null,
  deleteError: null,
};

export const updateUserReducer = (
  state = { updating: false, success: null, error: null },
  action
) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        updating: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updating: false,
        success: action.payload,
      };
    case UPDATE_USER_RESET:
      return {};
    case UPDATE_USER_FAIL:
      return {
        ...state,
        updating: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = initialDeleteState, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteLoading: false,
        deletedUserId: action.payload,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        deleteError: action.payload,
        deleteLoading: false,
      };
    default:
      return state;
  }
};

const initialToggleRoleState = {
  toggleLoading: false,
  currentRole: JSON.parse(localStorage.getItem("currentRole")),
  toggleError: null,
};

export const toggleRoleReducer = (state = initialToggleRoleState, action) => {
  switch (action.type) {
    case TOGGLE_ROLE_REQUEST:
      return {
        ...state,
        toggleLoading: true,
      };
    case TOGGLE_ROLE_SUCCESS:
      return {
        ...state,
        toggleLoading: false,
        currentRole: action.payload,
      };
    case TOGGLE_ROLE_FAIL:
      return {
        ...state,
        toggleLoading: false,
        toggleError: action.payload,
      };

    default:
      return state;
  }
};
