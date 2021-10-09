import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Image } from "react-bootstrap";
import { addToCart, deleteFromCart } from "../../../redux/actions/cartActions";
import { Link } from "react-router-dom";

export default function CartScreen() {
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;

  function groupBy(dataArray, property) {
    return dataArray.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const grouped = groupBy(cartItems, "restaurant");

  return (
    <div className="row">
      <div className="col-md-12">
        <h1 className="text-center m-3">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h2 className="text-center">
            Your cart is empty: <Link to="/client-portal/">Home Page</Link>
          </h2>
        ) : (
          <ListGroup variant="flush">
            {Object.keys(grouped).map((item) => {
              const subTotal = grouped[item].reduce(
                (x, item) => (x += item.subTotal),
                0
              );
              return (
                <div key={item} className="row ml-1 mb-1 shadow-md">
                  <div className="col-md-9 shadow-sm">
                    <div key={item}>
                      {grouped[item].map((itm) => {
                        const limitUp = itm.quantity > 4;
                        return (
                          <div
                            key={itm.id}
                            className="row m-1 align-items-center"
                          >
                            <div className="col-md-4">
                              <Image
                                style={{
                                  width: "14rem",
                                  height: "9rem",
                                }}
                                src={itm.image}
                                alt={itm.name}
                                fluid
                                rounded
                              />
                            </div>
                            <div className="col-md-4">
                              <h5 className="text-center">{itm.name}</h5>
                              <h6 className="text-center">
                                {itm.subTotal} (dt)
                              </h6>
                            </div>
                            <div className="col-md-2 text-center">
                              <p>Quantity</p>
                              <div className="d-flex justify-content-around">
                                <i
                                  className={`plus-cart-icon mr-2 fas fa-plus ${
                                    limitUp && "not-allowed"
                                  }`}
                                  onClick={() => {
                                    if (!limitUp) {
                                      dispatch(
                                        addToCart(itm, item, itm.quantity + 1)
                                      );
                                    }
                                  }}
                                ></i>
                                <strong>{itm.quantity}</strong>
                                <i
                                  className="-cart-icon ml-2 fas fa-minus"
                                  onClick={() => {
                                    if (itm.quantity > 1) {
                                      dispatch(
                                        addToCart(itm, item, itm.quantity - 1)
                                      );
                                    } else {
                                      dispatch(deleteFromCart(itm));
                                    }
                                  }}
                                ></i>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="d-flex col-md-3 flex-column  justify-content-center">
                    <h3 className="subtotal">
                      <span>SubTotal:</span> {subTotal} (dt)
                    </h3>
                    <Link to={`/client-portal/checkout/${item}`}>
                      <button className="btn btn-block checkout-btn">
                        Checkout
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </ListGroup>
        )}
      </div>
    </div>
  );
}
