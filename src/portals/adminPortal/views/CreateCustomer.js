import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/actions/authActions";
import { getAllRestaurants } from "../../../redux/actions/restaurantActions";
import Error from "../../../components/error/Error.component";
import Swal from "sweetalert2";
import { USER_REGISTER_RESET } from "../../../redux/action-types/authActionTypes";

export default function CreateCustomerScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [registerError, setError] = useState(null);

  const registerState = useSelector((state) => state.userRegister);
  const { error, loading, success } = registerState;

  const restaurantsState = useSelector((state) => state.restaurantsList);
  const { restaurants } = restaurantsState;

  const dispatch = useDispatch();

  useEffect(() => {
    roles[0] && roles[0].roleName === "Manager"
      ? dispatch(getAllRestaurants())
      : setRestaurant(null);
  }, [roles, dispatch]);

  function emptyState() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setCPassword("");
    setRoles([]);
    setRestaurant({});
    setError("");
  }

  useEffect(() => {
    if (success) {
      Swal.fire("Success !", "Account created", "success").then((_) => {
        dispatch({
          type: USER_REGISTER_RESET,
        });
      });
    }
    if (error) {
      Swal.fire("Oops !", error, "error").then((_) => {
        dispatch({
          type: USER_REGISTER_RESET,
        });
      });
    }
  }, [dispatch, success, error]);

  function submitHandler(e) {
    e.preventDefault();
    if (password !== cPassword) setError("Passwords do not match !");
    if (registerError === null) {
      if (restaurant !== null) {
        const user = {
          firstName,
          lastName,
          email,
          password,
          roles,
          restaurant,
        };
        dispatch(registerUser(user));
      } else {
        const user = {
          firstName,
          lastName,
          email,
          password,
          roles,
        };
        dispatch(registerUser(user));
      }
      emptyState();
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 text-center shadow-lg p-3 mb-3 mt-2 bg-white rounded">
        <h3>Add Customer</h3>
        {registerError && <Error error={registerError} />}
        <form onSubmit={submitHandler}>
          <div className="d-flex col-md-12">
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="First name"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="form-control"
                type="text"
                placeholder="Last Name"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
              />
              <input
                className="form-control"
                type="password"
                placeholder="Confirm password"
                value={cPassword}
                required={true}
                onChange={(e) => {
                  setCPassword(e.target.value);
                  setError(null);
                }}
              />
              <select
                className="form-control mt-3"
                onChange={(e) => setRoles([{ roleName: e.target.value }])}
                required
              >
                <option style={{ display: "none" }}>Select a role</option>
                <option value="Client">Client</option>
                <option value="Manager">Restaurant manager</option>
              </select>
            </div>
          </div>

          {roles[0] && roles[0].roleName === "Manager" && (
            <select
              style={{ width: "60%" }}
              className="form-control btn mt-3"
              onChange={(e) => setRestaurant({ id: e.target.value })}
            >
              <option style={{ display: "none" }}>Select a restaurant</option>
              {restaurants.map((resto) => (
                <option key={resto.id} value={resto.id}>
                  {resto.name}
                </option>
              ))}
            </select>
          )}

          <button
            style={{ width: "60%" }}
            className={`admin-btn btn mt-3 mb-4 ${loading && "not-allowed"}`}
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? (
              <i className="fas fa-2x fa-spinner fa-spin text-light"></i>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
