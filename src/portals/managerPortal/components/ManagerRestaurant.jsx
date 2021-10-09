import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../../components/rating/Rating.component";
import { ListGroup } from "react-bootstrap";
import Photo from "../../../assets/images/background.jpg";
import MenuCarousel from "../../../components/menu/MenuCaroussel.component";
import { getRestaurantByManagerId } from "../../../redux/actions/restaurantActions";

import "../styles/restaurant.css";

const ManagerRestaurant = () => {
  const dispatch = useDispatch();

  const restaurantState = useSelector(
    (state) => state.getRestaurantByManagerId
  );
  const {
    restaurant: {
      address,
      workingHours,
      name,
      description,
      category,
      menu,
      image,
      reviews,
      id,
    },
    loading,
  } = restaurantState;

  const userLogin = useSelector((state) => state.userLogin);
  const { currentUser } = userLogin;

  useEffect(() => {
    dispatch(getRestaurantByManagerId(currentUser.user.id));
  }, [dispatch, currentUser]);

  return (
    <div>
      {loading ? (
        <div className="row justify-content-center">
          <div className="text-center" style={{ margin: "8rem" }}>
            <i className="fas fa-7x fa-spinner fa-spin text-primary"></i>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column">
          <div className="row restaurant-header-mngr">
            <div className="col-md-2 restaurant-brand-mngr">
              <img
                src={image ? image : Photo}
                alt="restaurant-brand"
                className="restaurant-image-mngr"
              />
            </div>
            <div className="col-md-6 restaurant-details-mngr">
              <p className="restaurant-name-mngr">{name}</p>
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
                  className="accordion btn btn-light w-100 mb-2"
                  data-toggle="collapse"
                  href={`#${name}`}
                  aria-expanded="false"
                  aria-controls={name}
                >
                  Timing
                </a>
              )}
              <div className="collapse" id={name}>
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
            <div className="col-md-4 mt-4">
              <p>Category: {category?.label}</p>
              <p>Description: {description}</p>
            </div>
          </div>
          <div className="row">
            {menu.length > 0 ? (
              <div className="col-md-12">
                <MenuCarousel todaysMenu={menu} restoId={id} />
              </div>
            ) : (
              <h4 className="d-flex justify-content-center m-5">
                The menu is empty
              </h4>
            )}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <div className="flex-column">
              <h3>
                <i className="far fa-star" style={{ color: "orange" }}></i>{" "}
                Reviews{" "}
                <i className="far fa-star" style={{ color: "orange" }}></i>
              </h3>
              <div
                className="d-flex justify-content-center"
                style={{ color: "#383836" }}
              >
                {reviews.length === 0 && <p>No Reviews Yet</p>}
                <ListGroup variant="flush">
                  {reviews.map((review) => (
                    <ListGroup.Item key={review.id}>
                      <strong>User : {review.user.firstName}</strong>
                      <Rating value={review.rating} />
                      <p>on : {review.reviewDate.substring(0, 10)}</p>
                      {review && review.comment ? (
                        <p>comment : {review?.comment}</p>
                      ) : (
                        "No comment"
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerRestaurant;
