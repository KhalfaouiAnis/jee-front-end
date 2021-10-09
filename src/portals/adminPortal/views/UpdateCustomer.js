import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetails, updateUser } from "../../../redux/actions/userActions";
import Swal from "sweetalert2";
import { UPDATE_USER_RESET } from "../../../redux/action-types/userActionTypes";

export default function UpdateCustomerScreen({ match }) {
  const userId = Number(match.params.userId);

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const userState = useSelector((state) => state.userDetails);
  const { fetching, user } = userState;

  const updateState = useSelector((state) => state.updateUser);
  const { updating, error: updateError, success: updateSuccess } = updateState;

  useEffect(() => {
    if (user.id !== userId) {
      dispatch(userDetails(userId));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [dispatch, user, userId]);

  function emptyState() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
  }

  useEffect(() => {
    if (updateSuccess) {
      Swal.fire("Success !", updateSuccess, "success").then((_) => {
        dispatch({
          type: UPDATE_USER_RESET,
        });
        emptyState();
      });
    }
    if (updateError) {
      Swal.fire("Oops !", updateError, "error").then((_) => {
        dispatch({
          type: UPDATE_USER_RESET,
        });
      });
    }
  }, [dispatch, updateSuccess, updateError]);

  function submitHandler(e) {
    e.preventDefault();
    dispatch(
      updateUser(
        {
          firstName,
          lastName,
          email,
          phone,
          address,
        },
        userId
      )
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 text-center shadow-lg p-3 mb-3 mt-2 bg-white rounded">
        <h3>Update Customer</h3>
        {fetching ? (
          <div className="row justify-content-center">
            <div className="text-center" style={{ marginTop: "1rem" }}>
              <i className="fas fa-5x fa-spinner fa-spin text-primary"></i>
            </div>
          </div>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="d-flex col-md-12">
              <div className="col-md-6">
                <input
                  className="form-control"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  type="phone"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
            </div>

            <button
              style={{ width: "60%" }}
              className={`admin-btn btn mt-3 mb-4 ${updating && "not-allowed"}`}
              onClick={submitHandler}
            >
              {updating ? (
                <i className="fas fa-2x fa-spinner fa-spin text-light"></i>
              ) : (
                "Update"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
