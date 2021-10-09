import { Link } from "react-router-dom";
import "../styles/menuItem.css";

export default function MenuItem({ menuItem, handleDelete }) {
  return (
    <div className="card custom m-1 shadow-sm">
      <img className="card-img-top" src={menuItem.image} alt="Item"></img>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h4 className="text-center">{menuItem.name}</h4>
          <p className="text-center">{menuItem.description}</p>
        </div>
        <div className="card-actions bg-dark mt-2">
          <Link className="btn" to={`update-menu/${menuItem.id}`}>
            <i className="fas fa-edit text-light"></i>
          </Link>
          <button
            onClick={() => handleDelete(menuItem)}
            className="btn"
            style={{ background: "none", color: "crimson" }}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
