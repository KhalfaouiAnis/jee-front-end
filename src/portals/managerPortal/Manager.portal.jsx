import { useSelector } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import HomeScreen from "./views/HomeScreen";
import TodayOrdersScreen from "./views/TodayOrdersScreen";
import MenuScreen from "./views/MenuScreen";
import AddMenu from "./components/AddMenu";
import UpdateMenu from "./components/UpdateMenu";
import OrderDetails from "./components/OrderDetails";
import RestoOrdersScreen from "./views/OrdersScreen";
import UpdateRestaurant from "./views/UpdateRestaurant";

const ManagerPortal = () => {
  const ordersState = useSelector((state) => state.getTodaysOrder);
  const { loading, orders } = ordersState;

  return (
    <div className="row flex-row" style={{ minHeight: "86vh" }}>
      <div className="col-md-3 shadow-md">
        <h2 className="text-center mt-2">Navigation</h2>
        <ul className="admin-features ml-3 flex-column">
          <li className="m-1">
            <Link
              className="custom-nav-link p-3"
              to="/manager-portal/restaurant"
            >
              My Restaurant
            </Link>
          </li>
          <li className="m-1">
            <Link
              className="custom-nav-link p-3"
              to="/manager-portal/restaurant/update"
            >
              Update Info
            </Link>
          </li>
          <li className="m-1">
            <Link
              className="custom-nav-link p-3"
              to="/manager-portal/todaysorders"
            >
              Today's Orders
              <sup>
                <span className="mngr-badge badge-pill">
                  {loading ? (
                    <i className="fas fa-spinner fa-spin text-light" />
                  ) : (
                    orders.length
                  )}
                </span>
              </sup>
            </Link>
          </li>
          <li className="m-1">
            <Link className="custom-nav-link p-3" to="/manager-portal/orders">
              All Orders
            </Link>
          </li>
          <li className="m-1">
            <Link className="custom-nav-link p-3" to="/manager-portal/menu">
              My Menu
            </Link>
          </li>
          <li className="m-1">
            <Link className="custom-nav-link p-3" to="/manager-portal/add-menu">
              Add Menu Item
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-md-8 shadow-sm ml-5 p-3">
        <Switch>
          <Route exact path="/manager-portal" component={HomeScreen} />
          <Route
            exact
            path="/manager-portal/restaurant"
            component={HomeScreen}
          />
          <Route
            exact
            path="/manager-portal/restaurant/update"
            component={UpdateRestaurant}
          />
          <Route
            exact
            path="/manager-portal/todaysorders"
            component={TodayOrdersScreen}
          />
          <Route
            exact
            path="/manager-portal/orders/:id"
            component={OrderDetails}
          />
          <Route
            exact
            path="/manager-portal/orders"
            component={RestoOrdersScreen}
          />
          <Route exact path="/manager-portal/add-menu" component={AddMenu} />
          <Route
            exact
            path="/manager-portal/update-menu/:menuId"
            component={UpdateMenu}
          />
          <Route exact path="/manager-portal/menu" component={MenuScreen} />
        </Switch>
      </div>
    </div>
  );
};

export default ManagerPortal;
