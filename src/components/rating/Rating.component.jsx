import React from "react";
import "./rating.styles.css";

const Rating = ({ value, text, color }) => {
  return (
    <div>
      <div className="rating">
        <span>Rating : </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 1
                ? "fas fa-star"
                : value >= 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 2
                ? "fas fa-star"
                : value >= 1.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 3
                ? "fas fa-star"
                : value >= 2.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 4
                ? "fas fa-star"
                : value >= 3.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 5
                ? "fas fa-star"
                : value >= 4.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
        <span style={{ color: "#75716e" }}>{text && text}</span>
      </div>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
