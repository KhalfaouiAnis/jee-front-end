import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/error/Error.component";
import Success from "../components/success/Success.component";
import { registerUser } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import AOS from "aos";

const Registerscreen = () => {
  AOS.init();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [registerError, setError] = useState(null);

  const history = useHistory();

  const userState = useSelector((state) => state.userRegister);
  const { error, loading, success } = userState;

  const dispatch = useDispatch();

  function handleRegister() {
    if (password !== cPassword) {
      setError("Passwords do not match 🤐");
    } else {
      const user = {
        firstName,
        lastName,
        email,
        password,
        roles: [{ roleName: "Client" }],
      };
      dispatch(registerUser(user));
    }
  }

  useEffect(() => {
    success && history.push("/login");
  }, [success, history]);

  return (
    <div className="register" data-aos="zoom-in">
      <div className="row justify-content-center">
        <div className="col-md-3 p-3 mb-5 text-center register-container bg-white rounded shadow-lg">
          <h4 className="mt-2">Sign Up</h4>
          {error && <Error error={error} />}
          {registerError && <Error error={registerError} />}
          {success && <Success success="Your account is Created" />}
          <form onSubmit={handleRegister}>
            <input
              className="form-control"
              type="text"
              required
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder="First name"
            />
            <input
              className="form-control"
              type="text"
              required
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="Last name"
            />
            <input
              className="form-control"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
            <input
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              className="form-control"
              type="password"
              placeholder="Password"
            />
            <input
              value={cPassword}
              required
              onChange={(e) => {
                setCPassword(e.target.value);
                setError(null);
              }}
              className="form-control"
              type="password"
              placeholder="Confirm password"
            />
            <button
              disabled={loading}
              className={`auth-btn btn-block mt-3 mb-3 ${
                loading && "not-allowed"
              }`}
              onClick={handleRegister}
            >
              {loading ? (
                <i className="fas fa-2x fa-spinner fa-spin text-light"></i>
              ) : (
                "Register"
              )}
            </button>
            <div className="mb-3">
              <Link className="auth-link" to="/login">
                Already member ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registerscreen;
