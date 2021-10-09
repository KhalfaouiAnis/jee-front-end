import { useDispatch } from "react-redux";
import { useState } from "react";
import { filterRestaurants } from "../../redux/actions/restaurantActions";
import AOS from "aos";

import "./filter.styles.css";

export default function Filter() {
  AOS.init({
    duration: 600,
  });
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategor] = useState("all");

  const dispatch = useDispatch();

  function handleFilter() {
    dispatch(filterRestaurants(searchKey, category));
  }

  return (
    <div className="custom-align d-flex justify-content-around mt-1 shadow-md">
      <div className="col-md-3 w-100 p-2">
        <input
          className="form-control w-100 custom-input"
          placeholder="name..."
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <div className="col-md-3 w-100 p-2">
        <select
          className="form-control w-100 custom-input"
          onChange={(e) => setCategor(e.target.value)}
        >
          <option style={{ display: "none" }}>Select category</option>
          <option value="all">All</option>
          <option value="familystyle">Family Style</option>
          <option value="fastcasual">Fast Casual</option>
          <option value="fastfood">Fast Food</option>
          <option value="cafe">Cafe</option>
          <option value="ghostrestaurant">Ghost Restaurant</option>
        </select>
      </div>
      <div className="col-md-3 w-100 p-2 custom-input">
        <button className="search-btn w-100" onClick={handleFilter}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}
