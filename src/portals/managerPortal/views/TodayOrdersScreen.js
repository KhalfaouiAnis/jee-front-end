import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getTodaysOrders,
  deliverOrder,
} from "../../../redux/actions/orderActions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function TodayOrdersScreen() {
  const dispatch = useDispatch();

  const restaurantState = useSelector(
    (state) => state.getRestaurantByManagerId
  );

  const { id } = restaurantState.restaurant;

  const ordersState = useSelector((state) => state.getTodaysOrder);
  const { error, loading, orders } = ordersState;

  function handleSetStatus(orderId) {
    Swal.fire({
      title: "Set status as delivered ?",
      confirmButtonText: "Continue",
      cancelButtonText: "Cancel",
      focusCancel: false,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      showCloseButton: true,
    })
      .then((result) => {
        if (result.value) {
          try {
            dispatch(deliverOrder(orderId));
            Swal.fire("success", "Order delivered !", "suceess");
            dispatch(getTodaysOrders(orderId));
          } catch (error) {
            Swal.fire("error", error.message, "error");
          }
        }
      })
      .catch((err) => {
        Swal.fire("error", err, "error");
      });
  }

  useEffect(() => {
    dispatch(getTodaysOrders(id));
  }, [dispatch, id]);

  const earnings = orders.reduce((acc, o) => {
    return o.orderStatus === "Delivered" ? acc + o.subtotal : acc + 0;
  }, 0);

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="row justify-content-center">
          <div className="text-center" style={{ margin: "8rem" }}>
            <i className="fas fa-7x fa-spinner fa-spin text-primary"></i>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between">
            <h1 className="orders text-center">Today's Orders</h1>
            <span className="m-1">
              Today's Revenu: {earnings}{" "}
              <i className="fas fa-comment-dollar text-warning"></i>
            </span>
          </div>
          <hr></hr>
          <div className="row justify-content-center">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Customer Email</th>
                  <th>Delivery address</th>
                  <th>Odrer Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders
                    .sort((a, b) => b.id - a.id)
                    .map((order) => {
                      return (
                        <tr>
                          <td>{order.user.email}</td>
                          <td>
                            {order.user.address
                              ? order.user.address
                              : "Not specified"}
                          </td>
                          <td>{order.subtotal} (dt)</td>
                          <td>
                            <div className="d-flex justify-content-around">
                              {order.orderStatus === "Pending" ? (
                                <i
                                  style={{ cursor: "pointer" }}
                                  className="fas fa-2x fa-check-circle"
                                  onClick={() => {
                                    handleSetStatus(order.id);
                                  }}
                                ></i>
                              ) : (
                                <i
                                  style={{ cursor: "not-allowed" }}
                                  className="fas fa-2x fa-check-circle text-success"
                                ></i>
                              )}
                              <Link to={`/manager-portal/orders/${order.id}`}>
                                <i className="fas fa-2x fa-info-circle"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
