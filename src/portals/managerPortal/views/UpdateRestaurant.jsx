import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantByManagerId,
  editRestaurant,
} from "../../../redux/actions/restaurantActions";

import "../styles/restaurant.css";

const UpdateRestaurant = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState({});
  const [address, setAddress] = useState({});
  const [workingHours, setWorkingHours] = useState({});
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin.currentUser;

  const restaurantState = useSelector(
    (state) => state.getRestaurantByManagerId
  );

  const editState = useSelector((state) => state.editRestaurant);
  const { editLoading } = editState;
  const { restaurant, loading } = restaurantState;

  useEffect(() => {
    if (restaurant.managers[0].id !== user.id) {
      dispatch(getRestaurantByManagerId(user.id));
    }
    setName(restaurant.name);
    setDescription(restaurant.description);
    setImage(restaurant.image);
    setCategory(restaurant.category);
    setAddress(restaurant.address);
    setWorkingHours(restaurant.workingHours);
  }, [dispatch, user, restaurant]);

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

  function submitHandler(e) {
    e.preventDefault();
    const newData = {
      name,
      description,
      image,
      category,
      address,
      workingHours,
    };
    dispatch(editRestaurant(newData, restaurant.id));
  }

  return (
    <div>
      {loading ? (
        <div className="row justify-content-center">
          <div className="text-center" style={{ margin: "8rem" }}>
            <i className="fas fa-7x fa-spinner fa-spin text-primary"></i>
          </div>
        </div>
      ) : (
        <div className="d-flex text-center flex-column">
          <h3>Update Restaurant Info</h3>
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
                <textarea
                  className="form-control mt-2"
                  rows={4}
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
                    value={address?.country}
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                  />
                  <input
                    name="street"
                    className="form-control"
                    type="text"
                    placeholder="Street"
                    value={address?.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <select
                  className="form-control w-100 custom-input"
                  value={category.code}
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

                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column mt-3">
                    <div className="d-flex align-items-center">
                      <label>Choose an Image</label>
                      <label htmlFor="fileInput" className="ml-3 mt-1">
                        <i
                          className="fas fa-2x fa-upload"
                          style={{
                            cursor: "pointer",
                            color: "rgb(255, 72, 0)",
                          }}
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
                  </div>
                  <img
                    alt="menu item"
                    src={image}
                    width="100px"
                    height="100px"
                    className="ml-4 mt-4"
                  />
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
                    value={
                      workingHours.openingHour &&
                      workingHours.openingHour.substring(0, 6)
                    }
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
                    value={
                      workingHours.closingHour &&
                      workingHours.closingHour.substring(0, 6)
                    }
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
            <div className="d-flex justify-content-center mt-2">
              <button
                style={{ width: "60%" }}
                className={`admin-btn btn mt-3 mb-4 ${
                  editLoading && "not-allowed"
                }`}
                onClick={submitHandler}
                disabled={editLoading}
              >
                {editLoading ? (
                  <i className="fas fa-2x fa-spinner fa-spin text-light"></i>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateRestaurant;
