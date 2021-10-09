import "./restaurant.styles.css";
import MenuCarousel from "../menu/MenuCaroussel.component";
import Rating from "../rating/Rating.component";
import { Link } from "react-router-dom";

export default function Restaurant({
  restaurant = { address: { location: {} } },
}) {
  const { address, workingHours, name, menu, image, reviews, id } = restaurant;
  return (
    <div className="main-container d-flex  mt-3 shadow-md">
      <div className="d-flex flex-column shadow-md">
        <div className="d-flex restaurant-header">
          <div className="restaurant-brand">
            <Link to={`/client-portal/restaurants/${id}`}>
              <img
                src={image}
                alt="restaurant-brand"
                className="img-fluid restaurant-image"
              />
            </Link>
          </div>
          <div className="restaurant-details">
            <Link to={`/client-portal/restaurants/${id}`}>
              <p className="restaurant-name">{name}</p>
            </Link>
            {address?.country && (
              <p>
                <span>Country:</span> {address.country}
              </p>
            )}
            {address?.postalCode && (
              <p>
                <span>Postal code:</span> {address.postalCode}
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
                Time Schedule
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
        </div>
        <div>
          <MenuCarousel todaysMenu={menu} />
        </div>
      </div>
    </div>
  );
}
