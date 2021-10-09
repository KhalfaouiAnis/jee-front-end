import { useState } from "react";
import { Modal as MyModal } from "react-bootstrap";

import "./modal.styles.css";

export default function Modal({ message, title }) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  return (
    <div className="main-modal">
      <MyModal show={show} onHide={handleClose} animation centered>
        <MyModal.Header closeButton>
          <MyModal.Title>{title}</MyModal.Title>
        </MyModal.Header>

        <MyModal.Body className="modal-body">
          <h4>{message}</h4>
        </MyModal.Body>

        <MyModal.Footer>
          <button className="shake-btn btn" onClick={handleClose}>
            CLOSE
          </button>
        </MyModal.Footer>
      </MyModal>
    </div>
  );
}
