import AOS from "aos";
import "./orderItem.styles.css";

export default function OrderItem({ order }) {
  AOS.init();

  return (
    <div data-aos="zoom-in" className="orders-container col-md-8">
      <div className="flex-container">
        <div className="text-left w-100 m-1">
          <h2 className="topic">Products</h2>
          {order.orderItems.map((item) => {
            return (
              <div id="multiple-items" className="custom-order-item">
                <p>
                  {item.name} [{item.varient}] * {item.quantity} ={item.price}
                </p>
              </div>
            );
          })}
        </div>
        <div className="text-left w-100 m-1">
          <h2 className="topic">Address</h2>
          <div className="custom-order-item">
            <p>Street: {order.shippingAddress.street}</p>
            <p>City: {order.shippingAddress.city}</p>
            <p>Country: {order.shippingAddress.country}</p>
            <p>Postal Code: {order.shippingAddress.pincode}</p>
          </div>
        </div>
        <div className="text-left w-100 m-1">
          <h2 className="topic">Order Info</h2>
          <div className="custom-order-item">
            <p>Order amount: {order.orderAmount} /$</p>
            <p>Order date: {order.createdAt.substring(0, 10)}</p>
            <p>Transaction id: {order.transactionId}</p>
            <p>Order id: {order._id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
