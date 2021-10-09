import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { toggleCurrentRole } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";

import "./navbar.styles.css";

import { useHistory } from "react-router";

export default function Navbar() {
  const [portal, setPortal] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const { cartItems, loading } = cartState;
  const userState = useSelector((state) => state.userLogin);
  const { currentUser } = userState;
  const currentRole = JSON.parse(localStorage.getItem("currentRole"));

  useEffect(() => {
    switch (currentRole) {
      case "Client":
        setPortal("/client-portal/");
        break;
      case "Manager":
        setPortal("/manager-portal/");
        break;
      case "Admin":
        setPortal("/admin-portal/");
        break;
      default:
        setPortal("/client-portal/");
    }
  }, [currentRole, portal]);

  return (
    <div>
      <nav className="navbar custom-navbar-bg fixed-top navbar-expand-lg shadow-md p-3 mb-3">
        <Link
          className="logo navbar-brand"
          to={portal}
          title="Fast Food Fast Delivery"
        >
          Fast Food Fast Delivery{" "}
          <i
            className="fas fx-2 fa-shipping-fast"
            style={{ color: "#ff4800" }}
          ></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fas fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {currentUser ? (
              <Fragment>
                {currentUser.user.roles.length > 1 && (
                  <div className="dropdown">
                    <Link
                      className="dropdown-toggle nav-link"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      ({currentRole?.toLowerCase()})
                    </Link>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenuButton"
                    >
                      {currentUser.user.roles.map((role) => (
                        <Link
                          className="dropdown-item"
                          onClick={() => {
                            dispatch(toggleCurrentRole(role.roleName));
                          }}
                        >
                          {role.roleName.toLowerCase()}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <div className="dropdown">
                  <Link
                    className="dropdown-toggle nav-link"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {currentUser.user.firstName}
                  </Link>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {
                      // <Link className="dropdown-item" to={`${portal}profile`}>
                      //                     <i className="fas fa-user-circle"></i> Profile
                      //                   </Link>
                    }
                    {
                      <Link className="dropdown-item" to={`${portal}orders`}>
                        <i
                          style={{ color: "#ff4800" }}
                          className="fas fa-truck"
                        ></i>{" "}
                        My Orders
                      </Link>
                    }
                    <Link className="dropdown-item" to={`${portal}settings`}>
                      <i
                        style={{ color: "#ff4800" }}
                        className="fas fa-cog"
                      ></i>{" "}
                      Settings
                    </Link>
                    <Link
                      className="dropdown-item"
                      onClick={() => {
                        dispatch(logoutUser());
                        history.push("/login");
                      }}
                    >
                      <li>
                        <i
                          style={{ color: "#ff4800" }}
                          className="fas fa-power-off"
                        ></i>{" "}
                        Logout
                      </li>
                    </Link>
                  </div>
                </div>
                <li className="nav-item">
                  <Link
                    className="d-flex align-items-center nav-link"
                    to={`${portal}notifications`}
                  >
                    <i className="fas fa-bell" style={{ color: "#ff4800" }}></i>
                    <sup>
                      <span className="badge badge-pill">12</span>
                    </sup>
                  </Link>
                </li>
                {currentUser.user.roles[0].roleName.toLowerCase() ===
                  "client" && (
                  <li className="nav-item">
                    <Link
                      className="d-flex align-items-center nav-link"
                      to="/client-portal/cart"
                    >
                      <i
                        className="fas fa-shopping-cart"
                        style={{ color: "#ff4800" }}
                      >
                        <span className="inline-space"></span>
                      </i>
                      <sup>
                        <span
                          className={
                            loading ? "badge badge-pill" : "badge badge-pill"
                          }
                        >
                          {cartItems.length}
                        </span>
                      </sup>
                    </Link>
                  </li>
                )}
              </Fragment>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
