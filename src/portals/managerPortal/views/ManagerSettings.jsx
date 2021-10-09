import { Switch, Route, Link } from "react-router-dom";
import AddMenu from "../components/AddMenu";

export default function ManagerSettings() {
  return (
    <div className="row flex-row">
      <div className="col-md-3 h-100 mt-5 shadow-md">
        <h2 className="text-center mt-2">Settings</h2>
        <ul className="admin-features ml-3 flex-column">
          <li>
            <Link className="custom-nav-link m-3" to="/manager-portal/menu">
              My Menu
            </Link>
          </li>
          <li>
            <Link
              className="custom-nav-link m-3"
              to="/manager-portal/settings/add-menu"
            >
              Add Menu Item
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-md-9 shadow-sm">
        <Switch>
          <Route
            path="/manager-portal/settings/add-menu"
            component={<h1>Hello</h1>}
          />
          <Route
            exact
            path="/manager-portal/customers"
            //component={CustomersScreen}
          />
          <Route
            exact
            path="/manager-portal/restaurants"
            //component={RestaurantsScreen}
          />
          <Route
            exact
            path="/manager-portal/add-restaurant"
            //component={CreateRestaurantScreen}
          />
          <Route
            exact
            path="/manager-portal/add-customer"
            //component={CreateCustomerScreen}
          />
          <Route
            exact
            path="/manager-portal/edit-user/:userId"
            //component={CustomersScreen}
          />
        </Switch>
      </div>
    </div>
  );
}
