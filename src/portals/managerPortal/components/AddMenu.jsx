import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem } from "../../../redux/actions/menuActions";
import { createMenu } from "../../../redux/action-types/menuActionTypes";
import Swal from "sweetalert2";

const AddMenu = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  // const [images, setImages] = useState([]);
  const [available, setAvailable] = useState(true);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const menuState = useSelector((state) => state.createMenuItem);
  const { loading, error, success } = menuState;

  const {
    restaurant: { id },
  } = useSelector((state) => state.getRestaurantByManagerId);

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
    setPrice(0);
    setImage("");
    setAvailable(true);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createMenuItem({
        name,
        description,
        price,
        image,
        available,
        restaurant: {
          id,
        },
      })
    );
    emptyState();
  };

  useEffect(() => {
    if (success) {
      Swal.fire("", success, "success").then((_) => {
        dispatch({
          type: createMenu.CREATE_RESET,
        });
      });
    }
    if (error) {
      Swal.fire("Error", error, "error").then((_) => {
        dispatch({
          type: createMenu.CREATE_RESET,
        });
      });
    }
  }, [dispatch, success, error]);

  return (
    <div className="row justify-content-center">
      <div className="col-md-10 text-center shadow-md p-3 mb-3 mt-2 bg-white rounded">
        <h3>New Menu Item</h3>
        <form onSubmit={submitHandler}>
          <div className="d-flex col-md-12">
            <div className="col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="form-control mt-2"
                placeholder="Description"
                rows="6"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                type="number"
                placeholder="Price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column mt-3">
                  <div className="d-flex align-items-center">
                    <label>Choose an Image</label>
                    <label htmlFor="fileInput" className="ml-3 mt-1">
                      <i
                        className="fas fa-2x fa-plus-circle"
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
                  {
                    //TODO: add here the image name once it's loaded
                  }
                </div>
                {image && (
                  <img
                    src={image}
                    alt="menu item"
                    width="100px"
                    height="100px"
                    className="m-1 mt-4"
                  />
                )}
              </div>

              <select
                className="form-control"
                onChange={(e) => setAvailable(e.target.value)}
                required
              >
                <option style={{ display: "none" }}>Availability</option>
                <option value="true">In Stock</option>
                <option value="false">Out of stock</option>
              </select>
            </div>
          </div>

          <button
            style={{ width: "60%" }}
            className={`admin-btn btn mt-3 mb-4 ${loading && "not-allowed"}`}
            onClick={submitHandler}
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
};

export default AddMenu;
