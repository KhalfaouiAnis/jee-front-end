import { Switch, Route, Link } from "react-router-dom";
import "../../styles/adminscreen.styles.css";
import CustomersScreen from "./views/CustomersScreen";
import RestaurantsScreen from "./views/RestaurantsScreen";
import CreateCustomerScreen from "./views/CreateCustomer";
import UpdateCustomerScreen from "./views/UpdateCustomer";
import CreateRestaurantScreen from "./views/CreateRestaurant";

const AdminPortal = () => {
  return (
    <div className="text-center">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-left">Admin Panel</h2>
          <ul className="admin-features d-flex ">
            <li>
              <ul className="navbar-nav ml-auto">
                <div className="dropdown">
                  <Link
                    className="dropdown-toggle custom-nav-link"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Customers
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link
                      className="dropdown-item"
                      to="/admin-portal/customers"
                    >
                      Customers
                    </Link>
                  </div>
                </div>
              </ul>
            </li>
            <li>
              <ul className="navbar-nav ml-auto">
                <div className="dropdown">
                  <Link
                    className="dropdown-toggle custom-nav-link"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Restaurants
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link
                      className="dropdown-item"
                      to="/admin-portal/restaurants"
                    >
                      Restaurants
                    </Link>
                  </div>
                </div>
              </ul>
            </li>
            <li>
              <ul className="navbar-nav ml-auto">
                <div className="dropdown">
                  <Link
                    className="dropdown-toggle custom-nav-link"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Settings
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link
                      className="dropdown-item"
                      to="/admin-portal/restaurants"
                    >
                      Global
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/admin-portal/add-restaurant"
                    >
                      User Guide
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/admin-portal/add-restaurant"
                    >
                      Feedbacks
                    </Link>
                  </div>
                </div>
              </ul>
            </li>
            <li>
              <ul className="navbar-nav ml-auto">
                <div className="dropdown">
                  <Link
                    className="dropdown-toggle custom-nav-link"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Data Analysis
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link
                      className="dropdown-item"
                      to="/admin-portal/restaurants"
                    >
                      Global Data
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/admin-portal/add-restaurant"
                    >
                      Users Data
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/admin-portal/add-restaurant"
                    >
                      Restaurants Data
                    </Link>
                  </div>
                </div>
              </ul>
            </li>
            <li>
              <Link className="custom-nav-link" type="button">
                About Us
              </Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/admin-portal/" component={CustomersScreen} />
            <Route
              exact
              path="/admin-portal/customers"
              component={CustomersScreen}
            />
            <Route
              exact
              path="/admin-portal/restaurants"
              component={RestaurantsScreen}
            />
            <Route
              exact
              path="/admin-portal/add-restaurant"
              component={CreateRestaurantScreen}
            />
            <Route
              exact
              path="/admin-portal/add-customer"
              component={CreateCustomerScreen}
            />
            <Route
              exact
              path="/admin-portal/update-customer/:userId"
              component={UpdateCustomerScreen}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
