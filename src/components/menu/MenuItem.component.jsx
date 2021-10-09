import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";

import "./menu-item.styles.css";

export default function MenuItem({ menuItem = {} }) {
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  // const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function addtotart() {
  //   dispatch(addToCart(menuItem, quantity));
  // }

  return (
    <div className="pizza-container shadow-lg p-2 bg-white">
      <div onClick={handleShow} className="pizza-header">
        <h6 className="text-center">{menuItem.name}</h6>
        <img src={menuItem.image} className="img-fluid" alt="Menu Item" />
      </div>
      <div className="flex-container">
        <div className="m-1 w-100">
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            {[...Array(10).keys()].map((_, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="flex-container">
        <div className="m-1 w-100">
          <h1 className="mt-1">Price: {menuItem.price * quantity}£</h1>
        </div>
        <div className="m-1 w-100">
          <button className="shake-btn btn">
            {/*onClick={addtotart}*/}
            Add To Cart
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation centered>
        <Modal.Header closeButton>
          <Modal.Title>{menuItem.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <img
            className="img-fluid modal-image"
            src={menuItem.image}
            alt="Item"
          />
          <p className="modal-description">{menuItem.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="shake-btn btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
