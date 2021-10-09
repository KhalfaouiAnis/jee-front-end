import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder, deliverOrder } from "../../../redux/actions/orderActions";
import Swal from "sweetalert2";

export default function OrderDetails({ match }) {
  const orderId = Number(match.params.id);
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.fetchOrder);
  const { loading, order } = orderState;

  console.log("order: ", order);

  const deliverState = useSelector((state) => state.deliverOrder);
  const { deliverLoading, deliverSuccess } = deliverState;

  useEffect(() => {
    dispatch(fetchOrder(orderId));
  }, [orderId, dispatch, deliverSuccess]);

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
            dispatch(fetchOrder(orderId));
          } catch (error) {
            Swal.fire("error", "Error accured", "error");
          }
        }
      })
      .catch((err) => {
        Swal.fire("error", err, "error");
      });
  }

  return (
    <div className="row flex-column">
      {loading ? (
        <div className="row justify-content-center">
          <div className="text-center" style={{ margin: "8rem" }}>
            <i className="fas fa-7x fa-spinner fa-spin text-primary"></i>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center">
            <div
              className={
                "shadow-sm p-3 m-1 " +
                (order.orderStatus === "Delivered" ? "col-md-5" : "col-md-4")
              }
            >
              <h5>
                Order ID: <span>{order.id}</span>
              </h5>
              <h5>
                Order Status:{" "}
                <span
                  className={
                    order.orderStatus === "Delivered" ? "text-success" : ""
                  }
                >
                  {order.orderStatus}
                </span>
              </h5>
              <h5>
                Order Price: <span>{order.subtotal} (dt)</span>
              </h5>
              <h5>
                Delivery address:{" "}
                <span>
                  {order.user?.address ? order.user.address : "Not specified"}
                </span>
              </h5>
            </div>
            <div
              className={
                "shadow-sm m-1 p-3 " +
                (order.orderStatus === "Delivered" ? "col-md-6" : "col-md-5")
              }
            >
              <h5>
                Customer name:{" "}
                <span>
                  {order.user?.firstName} {order.user?.lastName}
                </span>
              </h5>
              <h5>
                Customer email: <span>{order.user?.email}</span>
              </h5>
              <h5>
                Customer Phone:{" "}
                <span>
                  {order.user?.phoneNumber
                    ? order.user.phoneNumber
                    : "Not specified"}
                </span>
              </h5>
            </div>
            {order.orderStatus === "Pending" && (
              <div className="d-flex col-md-2 shadow-sm m-1 p-3 align-items-center justify-content-center">
                <button
                  disabled={deliverLoading}
                  className={`btn btn-success btn-block ${
                    deliverLoading && "not-allowed"
                  }`}
                  onClick={() => {
                    handleSetStatus(order.id);
                  }}
                >
                  {deliverLoading ? (
                    <i className="fas fa-2x fa-spinner fa-spin text-light"></i>
                  ) : (
                    "Deliver"
                  )}
                </button>
              </div>
            )}
          </div>
          <h1 className="d-flex justify-content-center text-danger mt-3">
            Order Items
          </h1>
          <div className="d-flex justify-content-center">
            {order.items &&
              order.items.map((item) => (
                <div className="card custom shadow-sm m-1">
                  <img
                    className="card-img-top"
                    src={item.image}
                    alt="Item"
                  ></img>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h4 className="text-center">{item.name}</h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
