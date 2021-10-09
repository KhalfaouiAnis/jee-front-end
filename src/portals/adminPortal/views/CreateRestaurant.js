import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRestaurant } from "../../../redux/actions/restaurantActions";
import { getManagers } from "../../../redux/actions/userActions";
import Swal from "sweetalert2";
import { ADD_RESTAURANT_RESET } from "../../../redux/action-types/restaurantActionTypes";

import "../styles/create-restaurant.css";

export default function CreateRestaurantScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState({});
  const [address, setAddress] = useState({});
  const [workingHours, setWorkingHours] = useState({});
  const [managers, setManagers] = useState([]);
  const [uploading, setUploading] = useState(false);

  const managersState = useSelector((state) => state.managersList);
  const { managers: restoManagers } = managersState;

  const restaurantsState = useSelector((state) => state.addRestaurant);
  const { success, loading, error } = restaurantsState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getManagers());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      Swal.fire("Success !", "Restaurant created", "success").then((_) => {
        dispatch({ type: ADD_RESTAURANT_RESET });
      });
    }
    if (error) {
      Swal.fire("Oops !", error, "error").then((_) => {
        dispatch({ type: ADD_RESTAURANT_RESET });
      });
    }
  }, [dispatch, success, error]);

  const uploadFileHandler = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const {
        data: { fileDownloadUri },
      } = await axios.put("/files/", formData, config);
      setImage(fileDownloadUri);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  function emptyState() {
    setName("");
    setDescription("");
    setImage("");
    setCategory("");
    setAddress({});
    setWorkingHours({});
    setManagers([]);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (managers.length > 0) {
      const restaurant = {
        name,
        description,
        image,
        category,
        address,
        workingHours,
        managers,
      };
      dispatch(addRestaurant(restaurant));
    } else {
      const restaurant = {
        name,
        description,
        image,
        category,
        address,
        workingHours,
      };
      dispatch(addRestaurant(restaurant));
    }
    emptyState();
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 text-center shadow-lg p-3 mb-3 mt-2 bg-white rounded">
        <h3>Create Restaurant</h3>
        <form onSubmit={submitHandler}>
          <div className="d-flex col-md-12">
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="Restaurant name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="form-control"
                type="text-area"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <a
                class="accordion btn btn-light w-100 mt-4"
                data-toggle="collapse"
                href="#address"
                aria-expanded="false"
                aria-controls="address"
              >
                Address
              </a>
              <div class="collapse" id="address">
                <input
                  name="country"
                  className="form-control"
                  type="text"
                  placeholder="Country"
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                />
                <input
                  name="street"
                  className="form-control"
                  type="text"
                  placeholder="Street"
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <select
                className="form-control w-100 custom-input"
                onChange={(e) => {
                  let index = e.nativeEvent.target.selectedIndex;
                  let label = e.nativeEvent.target[index].text;
                  setCategory({
                    code: e.target.value,
                    label,
                  });
                }}
              >
                <option style={{ display: "none" }}>Select category</option>
                <option value="familystyle">Family Style</option>
                <option value="fastcasual">Fast Casual</option>
                <option value="fastfood">Fast Food</option>
                <option value="cafe">Cafe</option>
                <option value="ghostrestaurant">Ghost Restaurant</option>
              </select>

              <div className="d-flex align-items-center mt-3">
                <label>Choose an Image</label>
                <label htmlFor="fileInput" className="ml-3 mt-1">
                  <i
                    className="fas fa-2x fa-upload"
                    style={{ cursor: "pointer" }}
                  ></i>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  onChange={uploadFileHandler}
                  style={{ display: "none" }}
                />

                {uploading && (
                  <i className="fas fa-2x fa-spinner fa-spin text-primary ml-2"></i>
                )}
              </div>
              <a
                class="accordion btn btn-light w-100 mt-3"
                data-toggle="collapse"
                href="#timing"
                aria-expanded="false"
                aria-controls="timing"
              >
                Time Schedule
              </a>
              <div class="collapse" id="timing">
                <input
                  name="openingHour"
                  className="form-control"
                  type="time"
                  onChange={(e) =>
                    setWorkingHours({
                      ...workingHours,
                      openingHour: e.target.value + " AM",
                    })
                  }
                />
                <input
                  name="closingHour"
                  className="form-control"
                  type="time"
                  onChange={(e) =>
                    setWorkingHours({
                      ...workingHours,
                      closingHour: e.target.value + " PM",
                    })
                  }
                />
              </div>
            </div>
          </div>
          <select
            style={{ width: "60%" }}
            className="form-control btn mt-3"
            onChange={(e) => setManagers([{ id: e.target.value }])}
          >
            <option style={{ display: "none" }}>Select a Manager</option>
            {restoManagers.map((mngr) => (
              <option key={mngr.id} value={mngr.id}>
                {mngr.firstName} {mngr.lastName}
              </option>
            ))}
          </select>

          <button
            style={{ width: "60%" }}
            className={`admin-btn btn mt-3 mb-4 ${loading && "not-allowed"}`}
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? (
              <i className="fas fa-2x fa-spinner fa-spin text-light"></i>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
