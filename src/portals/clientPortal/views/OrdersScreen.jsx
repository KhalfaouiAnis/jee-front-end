import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserOrders } from "../../../redux/actions/orderActions";

export default function OrdersList() {
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.getUserOrders);
  const { error, loading, orders } = ordersState;

  const userState = useSelector((state) => state.userLogin);
  const {
    user: { id },
  } = userState.currentUser;

  useEffect(() => {
    dispatch(getUserOrders(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="row justify-content-center">
        <div className="text-center" style={{ margin: "8rem" }}>
          <i className="fas fa-7x fa-spinner fa-spin text-primary"></i>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center">My Orders</h2>
      {error && <h1 error={error}></h1>}
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Order Price</th>
            <th>Order Date</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders
              .sort((a, b) => b.id - a.id)
              .map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.subtotal} (dt)</td>
                    <td>
                      {order.orderDate && order.orderDate.substring(0, 10)}
                    </td>
                    <td
                      className={
                        order.orderStatus === "Delivered" && "text-success"
                      }
                    >
                      <h5>{order.orderStatus}</h5>
                    </td>
                  </tr>
                );
              })
          ) : (
            <h4 className="text-right">No orders found</h4>
          )}
        </tbody>
      </table>
    </div>
  );
}
