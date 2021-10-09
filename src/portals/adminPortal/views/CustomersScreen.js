import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../../redux/actions/userActions";
import Error from "../../../components/error/Error.component";
import { Link } from "react-router-dom";

import "../../../styles/users-list.styles.css";

export default function CustomersScreen() {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.usersList);
  const { error, deleteLoading, loading, users } = usersState;

  const [filtered, setFiltered] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  function handleDelete(userId) {
    dispatch(deleteUser(userId));
  }

  useEffect(() => {
    if (!q) {
      setFiltered([]);
    }
  }, [q, setFiltered]);

  function handleFilter() {
    setFiltered(
      users.filter((user) =>
        user.lastName.toLocaleLowerCase().includes(q.toLocaleLowerCase())
      )
    );
  }

  return (
    <div>
      {loading ? (
        <div className="row justify-content-center">
          <div className="text-center" style={{ margin: "8rem" }}>
            <i className="fas fa-7x fa-spinner fa-spin text-primary"></i>
          </div>
        </div>
      ) : (
        <div>
          <div className="customers-header">
            <h2 className="col-md-3">Customers</h2>
            <div className="col-md-7 d-flex justify-content-around ">
              <div className="col-md-8 w-100 p-2">
                <input
                  className="form-control w-100 custom-input"
                  placeholder="Last name..."
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <div className="col-md-4 w-100 p-2 custom-input">
                <button
                  style={{
                    backgroundColor: "#00245f",
                    color: "#fff",
                    fontSize: "18px",
                  }}
                  className="btn w-100"
                  onClick={handleFilter}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <Link className="col-md-2" to="/admin-portal/add-customer">
              <i class="fa fa-plus-circle"></i>
            </Link>
          </div>
          {error && <Error error={error} />}
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Customer ID</th>
                <th>Customer Firstname</th>
                <th>Customer Lastname</th>
                <th>Customer Email</th>
                <th>Date Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(filtered && filtered.length > 0 ? filtered : users).map(
                (user) => {
                  return (
                    <tr>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.creationDate.substring(0, 10)}</td>
                      <td>
                        <Link
                          className="btn"
                          to={`/admin-portal/update-customer/${user.id}`}
                        >
                          <i
                            className="fas fa-edit"
                            style={{ background: "none" }}
                          ></i>
                        </Link>
                        <i
                          style={{ background: "none" }}
                          className="fas fa-users mr-2"
                        ></i>
                        <i
                          style={{ background: "none", cursor: "pointer" }}
                          onClick={() => handleDelete(user)}
                          className="fas fa-trash ml-1 text-danger"
                        ></i>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
