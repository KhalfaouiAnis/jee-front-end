import { Switch, Route } from "react-router-dom";

import HomeScreen from "./views/HomeScreen";
import Restaurant from "./components/Restaurant";
import MenuItemDetailsScreen from "./views/MenuItemDetailsScreen";
import CartScreen from "./views/CartScreen";
import CheckoutScreen from "./views/CheckoutScreen";
import OrdersScreen from "./views/OrdersScreen";
import ProfileScreen from "../../shared/ProfileScreen";

const ClientPortal = () => {
  return (
    <Switch>
      <Route exact path="/client-portal/restaurants/" component={HomeScreen} />
      <Route exact path="/client-portal/" component={HomeScreen} />
      <Route
        exact
        path="/client-portal/restaurants/:id"
        component={Restaurant}
      />
      <Route exact path="/client-portal/cart" component={CartScreen} />
      <Route
        exact
        path="/client-portal/checkout/:item"
        component={CheckoutScreen}
      />
      <Route exact path="/client-portal/orders" component={OrdersScreen} />
      <Route exact path="/client-portal/profile" component={ProfileScreen} />
      <Route
        exact
        path="/client-portal/restaurants/:id/menu/:menuitemid"
        component={MenuItemDetailsScreen}
      />
    </Switch>
  );
};

export default ClientPortal;
