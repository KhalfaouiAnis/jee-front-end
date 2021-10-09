import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/error/Error.component";
import { loginUser } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import AOS from "aos";

const Loginscreen = ({ history }) => {
  AOS.init();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.userLogin);
  const { error, loading, currentUser } = userState;

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    } else {
      switch (currentUser.user.roles[0].roleName) {
        case "Client":
          history.push("/client-portal");
          break;
        case "Admin":
          history.push("/admin-portal");
          break;
        case "Manager":
          history.push("/manager-portal");
          break;
        case "Shipper":
          history.push("/shipper-portal");
          break;
        default:
          history.push("/client-portal");
          break;
      }
    }
  }, [history, currentUser]);

  function handleLogin() {
    dispatch(loginUser(email, password));
  }

  return (
    <div className="login" data-aos="zoom-in">
      <div className="row justify-content-center">
        <div className="col-md-3 mt-5 text-center login-container shadow-lg p-3 mb-5 bg-white rounded">
          <h4 className="mt-4">Sign In</h4>
          {error && <Error error={error} />}
          <form onSubmit={handleLogin}>
            <input
              className="form-control"
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              placeholder="Email"
            />
            <input
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
              type="password"
              placeholder="Password"
            />
            <div className="mt-3 text-left">
              <Link className="auth-link" to="#">
                Forgot password ?
              </Link>
            </div>
            <button
              disabled={loading}
              className={`auth-btn btn-block mt-3 mb-3 ${
                loading && "not-allowed"
              }`}
              onClick={handleLogin}
            >
              {loading ? (
                <i className="fas fa-2x fa-spinner fa-spin text-light"></i>
              ) : (
                "Login"
              )}
            </button>
            <div className="mb-2">
              <Link className="auth-link" to="/register">
                don't have an account ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginscreen;
