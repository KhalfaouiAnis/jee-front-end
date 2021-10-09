import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById } from "../../../redux/actions/restaurantActions";
import { useEffect } from "react";
import { placeOrder } from "../../../redux/actions/orderActions";
import { PLACE_ORDER_RESET } from "../../../redux/action-types/orderActionTypes";
import { Image } from "react-bootstrap";
import Swal from "sweetalert2";

export default function CheckoutScreen({ match, history }) {
  const dispatch = useDispatch();
  const item = Number(match.params.item);

  const cartState = useSelector((state) => state.cart);
  const orderState = useSelector((state) => state.placeOrder);
  const userState = useSelector((state) => state.userLogin);

  const { loading, success, error } = orderState;
  const { user } = userState.currentUser;
  const orderItems = cartState.cartItems.filter(
    (itm) => Number(itm.restaurant) === item
  );

  const subTotal = orderItems.reduce((x, item) => (x += item.subTotal), 0);

  useEffect(() => {
    dispatch(getRestaurantById(item));
  }, [dispatch, item]);

  useEffect(() => {
    if (success) {
      Swal.fire("", "Order placed successfully !", "success").then((_) => {
        dispatch({
          type: PLACE_ORDER_RESET,
        });
      });
    }
    if (error) {
      Swal.fire("", error, "error").then((_) => {
        dispatch({
          type: PLACE_ORDER_RESET,
        });
      });
    }
  }, [dispatch, success, error]);

  const handleOrderPayLater = (e) => {
    e.preventDefault();
    const order = {
      user: {
        id: user.id,
      },
      items: orderItems.map((item) => ({ id: Number(item.id) })),
      subtotal: subTotal,
    };
    dispatch(placeOrder(order, item));
    console.log("order: ", order);
  };

  return (
    <div>
      <div className="col-md-7 d-flex align-items-center ml-2 justify-content-between">
        <i
          onClick={() => history.goBack()}
          className="far fa-2x fa-arrow-alt-circle-left text-primary"
          style={{ cursor: "pointer" }}
        ></i>
        <h1 className="text-center m-3 text-primary">Checkout And Payment</h1>
      </div>
      <div className="row mt-3">
        <div className="col-md-8 justify-content-between">
          {orderItems &&
            orderItems.map((order) => {
              return (
                <div key={order.id} className="d-flex align-items-center">
                  <div className="col-md-3">
                    <Image
                      style={{
                        width: "14rem",
                        height: "9rem",
                      }}
                      src={order.image}
                      alt={order.name}
                      fluid
                      rounded
                    />
                  </div>
                  <div className="col-md-5">
                    <p>Name: {order.name}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Subtotal: {order.subTotal} (dt)</p>
                  </div>
                  <div className="text-center col-md-4">
                    <p>{order.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="col-md-4 text-center">
          <h1 className="text-center m-3">
            Total amout: <span className="text-danger">{subTotal} (dt) </span>
          </h1>
          {loading ? (
            <button className="btn checkout-btn m-1">
              <i className="fas fa-2x fa-spinner fa-spin text-light"></i>
            </button>
          ) : (
            <button
              onClick={(e) => handleOrderPayLater(e)}
              className="btn checkout-btn m-1"
            >
              Order Now & Pay Later
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
