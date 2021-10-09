import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllRestaurants,
  deleteRestaurant,
} from "../../../redux/actions/restaurantActions";
import Error from "../../../components/error/Error.component";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import "../../../styles/users-list.styles.css";

export default function RestaurantsScreen() {
  const dispatch = useDispatch();
  const restaurantState = useSelector((state) => state.restaurantsList);
  const { error, loading, restaurants } = restaurantState;

  const [filtered, setFiltered] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  function handleDelete(restaurant) {
    Swal.fire({
      title: "Delete this Restaurant ?",
      confirmButtonText: "Continue",
      cancelButtonText: "Cancel",
      focusCancel: true,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      showCloseButton: true,
    })
      .then((result) => {
        if (result.value) {
          dispatch(deleteRestaurant(restaurant));
        }
      })
      .catch((err) => {
        Swal.fire("error", err, "error");
      });
  }

  useEffect(() => {
    if (!q) {
      setFiltered([]);
    }
  }, [q, setFiltered]);

  function handleFilter() {
    setFiltered(
      restaurants.filter((resto) =>
        resto.name.toLocaleLowerCase().includes(q.toLocaleLowerCase())
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
            <h2 className="col-md-3">Restaurants</h2>
            <div className="col-md-7 d-flex justify-content-around ">
              <div className="col-md-8 w-100 p-2">
                <input
                  className="form-control w-100 custom-input"
                  placeholder="Restaurant name..."
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
            <Link className="col-md-2" to="/admin-portal/add-restaurant">
              <i className="fa fa-plus-circle"></i>
            </Link>
          </div>
          {error && <Error error={error} />}
          <table className="table table-striped" style={{ width: "100%" }}>
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Address</th>
                <th>Opening / Closing</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(filtered && filtered.length > 0 ? filtered : restaurants).map(
                (restaurant) => {
                  return (
                    <tr key={restaurant.id}>
                      <td>{restaurant.id}</td>
                      <td>{restaurant.name}</td>
                      <td>{restaurant.category?.label}</td>
                      <td>{restaurant.address?.country}</td>
                      <td>
                        {restaurant.workingHours?.openingHour}{" "}
                        {restaurant.workingHours
                          ? restaurant.workingHours.closingHour
                          : "--:--"}
                      </td>
                      <td>
                        <i
                          onClick={() => handleDelete(restaurant)}
                          className="fas fa-trash text-danger"
                          style={{ cursor: "pointer" }}
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
