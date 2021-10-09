import { Fragment } from "react";
import "./featured.styles.css";
import Rating from "../rating/Rating.component";
import Error from "../error/Error.component";
import { Link } from "react-router-dom";

export default function Featured({ errors, fetching, featured }) {
  if (fetching) {
    return (
      <div className="row justify-content-center">
        <div className="text-center" style={{ margin: "8rem" }}>
          <i className="fas fa-7x fa-spinner fa-spin text-primary"></i>
        </div>
      </div>
    );
  }
  return (
    <div className="featured-container">
      <h1 className="featured-title shadow-md">Featured restaurants</h1>
      {errors && (
        <div className="row justify-content-center">
          <div className="text-center" style={{ marginTop: "6rem" }}>
            <Error error="Someting went wrong" />
          </div>
        </div>
      )}
      {featured
        .sort((a, b) => {
          return a.reviews.length < b.reviews.length;
        })
        .map((featuredItem) => (
          <div className="featured-item shadow-sm" key={featuredItem.id}>
            <div className="featured-header d-flex">
              <div className="d-flex flex-column">
                <Fragment>
                  <div className="featured-brand d-flex">
                    <img
                      src={featuredItem.image}
                      alt="featured-brand"
                      className="img-fluid featured-image justify-content-start"
                    />
                    <div className="d-flex flex-column text-center mt-3">
                      <Link
                        to={`/client-portal/restaurants/${featuredItem.id}`}
                      >
                        <p className="featured-name">{featuredItem?.name}</p>
                      </Link>
                      <p className="featured-address">
                        {featuredItem?.address?.country}
                      </p>
                      <p className="featured-address">
                        {featuredItem?.address?.street}
                      </p>
                    </div>
                  </div>
                  <div className="featured-details">
                    <Rating
                      value={
                        featuredItem.reviews.reduce(
                          (acc, item) => item.rating + acc,
                          0
                        ) / featuredItem.reviews.length
                      }
                      text={`${featuredItem.reviews.length}${
                        featuredItem.reviews.length === 1
                          ? " review"
                          : " reviews"
                      }`}
                    />
                  </div>
                </Fragment>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
