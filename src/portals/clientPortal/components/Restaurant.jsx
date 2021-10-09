import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../../components/rating/Rating.component";
import { ListGroup, Button, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { makeReview } from "../../../redux/actions/reviewActions";
import Photo from "../../../assets/images/background.jpg";
import MenuCarousel from "../../../components/menu/MenuCaroussel.component";
import { getRestaurantById } from "../../../redux/actions/restaurantActions";
import { MAKE_REVIEW_RESET } from "../../../redux/action-types/reviewActionTypes";
import Swal from "sweetalert2";

import "../../../components/restaurant/restaurant.styles.css";

const Restaurant = ({ match }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const restaurantState = useSelector((state) => state.getRestaurantById);
  const {
    restaurant: { address, workingHours, name, menu, image, reviews, id },
    loading,
  } = restaurantState;

  const userLogin = useSelector((state) => state.userLogin);
  const { currentUser } = userLogin;

  const makeReviewState = useSelector((state) => state.makeReview);
  const {
    successReview,
    loadingReview,
    errorReview,
    message,
  } = makeReviewState;

  useEffect(() => {
    dispatch(getRestaurantById(match.params.id));
    dispatch({
      type: MAKE_REVIEW_RESET,
    });
  }, [dispatch, message, match.params.id]);

  useEffect(() => {
    if (successReview) {
      Swal.fire("", message, "success").then((_) => {
        setRating(0);
        setComment("");
        dispatch({
          type: MAKE_REVIEW_RESET,
        });
      });
    }
    if (errorReview) {
      Swal.fire("", message, "warning").then((_) => {
        setRating(0);
        setComment("");
        dispatch({
          type: MAKE_REVIEW_RESET,
        });
      });
    }
  }, [dispatch, successReview, message, errorReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment) {
      dispatch(
        makeReview({
          comment,
          rating,
          user: {
            id: currentUser.user.id,
          },
          restaurant: {
            id,
          },
        })
      );
    } else {
      dispatch(
        makeReview({
          rating,
          user: {
            id: currentUser.user.id,
          },
          restaurant: {
            id,
          },
        })
      );
    }
  };

  if (loading) {
    return (
      <div className="homepage-container">
        <div className="row justify-content-center">
          <div className="text-center" style={{ margin: "8rem" }}>
            <i className="fas fa-7x fa-spinner fa-spin text-primary"></i>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container d-flex shadow-sm mb-2 container">
      <div className="d-flex flex-column">
        <div className="d-flex restaurant-header">
          <div className="goback-link">
            <Link to="/client-portal/restaurants">
              <i className="far fa-arrow-alt-circle-left"></i>
            </Link>
          </div>
          <div className="restaurant-brand">
            <img
              src={image ? image : Photo}
              alt="restaurant-brand"
              className="img-fluid restaurant-image"
            />
          </div>
          <div className="restaurant-details">
            <p className="restaurant-name">{name}</p>
            {address?.country && (
              <p>
                <span>Country:</span> {address.country}
              </p>
            )}

            {address?.street && (
              <p>
                <span>Street:</span> {address.street}
              </p>
            )}
            {workingHours && (
              <a
                class="accordion btn btn-light w-100 mb-2"
                data-toggle="collapse"
                href={`#${name}`}
                aria-expanded="false"
                aria-controls={name}
              >
                Timing
              </a>
            )}
            <div class="collapse" id={name}>
              {workingHours?.openingHour && (
                <p>
                  <span>Opening at:</span> {workingHours.openingHour}
                </p>
              )}

              {workingHours?.closingHour && (
                <p>
                  <span>Closing at:</span> {workingHours.closingHour}
                </p>
              )}
            </div>
            <p>
              <Rating
                value={
                  reviews.reduce((acc, item) => item.rating + acc, 0) /
                  reviews.length
                }
                text={`${reviews.length}${
                  reviews.length === 1 ? " review" : " reviews"
                }`}
              />
            </p>
          </div>
        </div>
        {menu.length > 0 ? (
          <div>
            <MenuCarousel todaysMenu={menu} restoId={id} />
          </div>
        ) : (
          <h6 className="text-center">
            No meals available now for this restaurant, please check in again
            later !
          </h6>
        )}

        <div className="d-flex justify-content-center mt-4">
          <div className="flex-column" style={{ color: "#383836" }}>
            <h3 className="text-center">
              <i className="far fa-star" style={{ color: "orange" }}></i>{" "}
              Reviews{" "}
              <i className="far fa-star" style={{ color: "orange" }}></i>
            </h3>
            {reviews.length === 0 && (
              <p className="text-center">Be the first to rate us</p>
            )}
            <div
              className="d-flex justify-content-center"
              style={{ color: "#383836" }}
            >
              <ListGroup variant="flush">
                {reviews.map((review) => (
                  <ListGroup.Item key={review.id}>
                    <strong>
                      Username : {review.user.firstName} {review.user.lastName}
                    </strong>
                    <Rating value={review.rating} />
                    <p>on : {review.reviewDate.substring(0, 10)}</p>
                    {review && review.comment ? (
                      <p>comment : {review?.comment}</p>
                    ) : (
                      "No comment"
                    )}
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Rate us</h4>
                  {loadingReview && (
                    <div className="text-center" style={{ margin: "0.6rem" }}>
                      <i className="fas fa-3x fa-spinner fa-spin text-primary"></i>
                    </div>
                  )}
                  {currentUser ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          required
                        >
                          <option value="">Your opinion</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        className={`btn btn-block ${loadingReview} && "not-allowed"`}
                        disabled={loadingReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <p>
                      Please <Link to="/login">sign in</Link> to write a review
                    </p>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Restaurant);
