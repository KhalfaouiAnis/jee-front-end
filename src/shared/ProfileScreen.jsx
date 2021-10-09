import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userDetails, updateUser } from "../redux/actions/userActions";
import { UPDATE_USER_RESET } from "../redux/action-types/userActionTypes";

import "../styles/profileScreen.css";

const ProfileScreen = ({ history }) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [passError, setPassError] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetailsState = useSelector((state) => state.userDetails);
  const { loading } = userDetailsState;

  const userLogin = useSelector((state) => state.userLogin);
  const {
    currentUser: { user },
  } = userLogin;

  const updateUserProfile = useSelector((state) => state.updateUser);
  const { success } = updateUserProfile;

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: UPDATE_USER_RESET });
        dispatch(userDetails(user.id));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, user, success]);

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

      setProfilePic(fileDownloadUri);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassError("Passwords do not match");
    } else {
      dispatch(
        updateUser({ firstName, lastName, email, password, phone }, user.id)
      );
    }
  };

  return (
    <div className="row container">
      <div className="col-md-6">
        <h2 className="text-center">Your Profile</h2>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <Form onSubmit={submitHandler}>
            <div className="parent-wrapper">
              <div className="wrapper">
                <input
                  type="file"
                  onChange={uploadFileHandler}
                  className="my_file"
                />
              </div>
            </div>
            <Form.Group controlId="name">
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </div>
      <div className="col-md-6">
        <h2>Your ❤️ restaurants</h2>
        {!user ? (
          <h1>Loading</h1>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
