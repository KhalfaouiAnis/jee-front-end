import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  restaurantListReducer,
  addRestaurantReducer,
  getRestaurantByIdReducer,
  editRestaurantReducer,
  deleteRestaurantReducer,
  featuredRestaurantListReducer,
  getRestaurantByManagerIdReducer,
} from "./reducers/restaurantReducers";
import {
  menuItemDetailsReducer,
  createMenuItemReducer,
  updateMenuItemReducer,
  deleteMenuItemReducer,
} from "./reducers/menuReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  placeOrderReducer,
  fetchOrderReducer,
  getUserOrdersReducer,
  getAllOrdersReducer,
  deliverOrderReducer,
  getTodaysOrdersReducer,
  getRestoOrdersReducer,
} from "./reducers/orderReducer";
import {
  usersListReducer,
  toggleRoleReducer,
  managersListReducer,
  userDetailsReducer,
  updateUserReducer,
  deleteUserReducer,
} from "./reducers/userReducer";
import { userRegisterReducer, userLoginReducer } from "./reducers/authReducer";
import { makeReviewReducer } from "./reducers/reviewReducer";

const mainReducer = combineReducers({
  restaurantsList: restaurantListReducer,
  featuredRestaurantList: featuredRestaurantListReducer,
  addRestaurant: addRestaurantReducer,
  editRestaurant: editRestaurantReducer,
  deleteRestaurant: deleteRestaurantReducer,
  getRestaurantById: getRestaurantByIdReducer,
  getRestaurantByManagerId: getRestaurantByManagerIdReducer,
  menuItemDetails: menuItemDetailsReducer,
  createMenuItem: createMenuItemReducer,
  updateMenuItem: updateMenuItemReducer,
  deleteMenuItem: deleteMenuItemReducer,
  makeReview: makeReviewReducer,
  cart: cartReducer,
  placeOrder: placeOrderReducer,
  fetchOrder: fetchOrderReducer,
  getUserOrders: getUserOrdersReducer,
  getAllOrders: getAllOrdersReducer,
  deliverOrder: deliverOrderReducer,
  getTodaysOrder: getTodaysOrdersReducer,
  getRestoOrders: getRestoOrdersReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  toggleRole: toggleRoleReducer,
  usersList: usersListReducer,
  userDetails: userDetailsReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer,
  managersList: managersListReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItems,
  },
  userLogin: {
    currentUser: currentUser,
    error: null,
  },
};

const middleware = [thunk];
const store = createStore(
  mainReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
