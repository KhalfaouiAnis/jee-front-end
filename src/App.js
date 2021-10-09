import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "aos/dist/aos.css";

import { useEffect, Fragment } from "react";
import { useHistory, withRouter } from "react-router-dom";

import { Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/Navbar.component";
import Loginscreen from "./shared/Loginscreen";
import Registerscreen from "./shared/Registerscreen";
import AdminPortal from "./portals/adminPortal/Admin.portal.jsx";
import ManagerPortal from "./portals/managerPortal/Manager.portal";
import ClientPortal from "./portals/clientPortal/Client.portal";

function App() {
  const history = useHistory();
  const currentRole = JSON.parse(localStorage.getItem("currentRole"));

  useEffect(() => {
    switch (currentRole) {
      case "Admin":
        history.push("/admin-portal");
        break;
      case "Manager":
        history.push("/manager-portal");
        break;
      case "Client":
        history.push("/client-portal");
        break;
      default:
        history.push("/login");
        break;
    }
  }, [currentRole, history]);

  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/login" exact component={Loginscreen} />
        <Route path="/register" exact component={Registerscreen} />
        <div style={{ marginTop: "4rem" }}>
          <Route path="/client-portal" component={ClientPortal} />
          <Route path="/manager-portal" component={ManagerPortal} />
          <Route path="/admin-portal/" component={AdminPortal} />
        </div>
      </Switch>
    </Fragment>
  );
}

export default withRouter(App);
