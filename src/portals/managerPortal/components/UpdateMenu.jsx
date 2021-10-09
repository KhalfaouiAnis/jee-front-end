import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMenuItem,
  menuItemDetails,
} from "../../../redux/actions/menuActions";
import { updateMenu } from "../../../redux/action-types/menuActionTypes";
import Swal from "sweetalert2";

const UpdateMenu = ({ match }) => {
  const menuId = Number(match.params.menuId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [available, setAvailable] = useState(true);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const menuState = useSelector((state) => state.menuItemDetails);
  const { loading, menuItem } = menuState;

  const updateState = useSelector((state) => state.updateMenuItem);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = updateState;

  useEffect(() => {
    if (menuItem.id !== menuId) {
      dispatch(menuItemDetails(menuId));
    } else {
      setName(menuItem.name);
      setDescription(menuItem.description);
      setImage(menuItem.image);
      setPrice(menuItem.price);
      setAvailable(menuItem.available);
    }
  }, [dispatch, menuItem, menuId]);

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
      updateMenuItem(
        {
          name,
          description,
          price,
          image,
          available,
        },
        menuId
      )
    );
    emptyState();
  };

  useEffect(() => {
    if (updateSuccess) {
      Swal.fire("", updateSuccess, "success").then((_) => {
        dispatch({
          type: updateMenu.M_UPDATE_RESET,
        });
      });
    }
    if (updateError) {
      Swal.fire("Error", updateError, "error").then((_) => {
        dispatch({
          type: updateMenu.M_UPDATE_RESET,
        });
      });
    }
  }, [dispatch, updateSuccess, updateError]);

  return (
    <div className="row justify-content-center">
      <div className="col-md-10 text-center shadow-md p-3 mb-3 mt-2 bg-white rounded">
        <h3>Update Menu Item</h3>
        {loading ? (
          <div className="row justify-content-center">
            <div className="text-center" style={{ marginTop: "3rem" }}>
              <i className="fas fa-5x fa-spinner fa-spin text-primary"></i>
            </div>
          </div>
        ) : (
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
                  </div>
                  <img
                    alt="menu item"
                    src={image}
                    width="100px"
                    height="100px"
                    className="m-1 mt-4"
                  />
                </div>
                <select
                  className="form-control "
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
              className={`admin-btn btn mt-3 mb-4 ${
                updateLoading && "not-allowed"
              }`}
              onClick={submitHandler}
            >
              {updateLoading ? (
                <i className="fas fa-2x fa-spinner fa-spin text-light"></i>
              ) : (
                "Update"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateMenu;
