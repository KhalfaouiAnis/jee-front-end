import Error from "../../../components/error/Error.component";
import Filter from "../../../components/filter/Filter.component";
import ScrollTopArrow from "../../../components/scroll-top-arrow/ScrollTopArrow";
import Restaurant from "../../../components/restaurant/Restaurant.component";
import Featured from "../../../components/featured/Featured.component";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRestaurants,
  getFeaturedRestaurants,
} from "../../../redux/actions/restaurantActions";
import { useEffect } from "react";

export default function Homescreen() {
  const dispatch = useDispatch();
  const restaurantsState = useSelector((state) => state.restaurantsList);
  const { error, loading, restaurants } = restaurantsState;

  const featuredRestaurantsState = useSelector(
    (state) => state.featuredRestaurantList
  );
  const { errors, fetching, featured } = featuredRestaurantsState;

  useEffect(() => {
    dispatch(getAllRestaurants());
    dispatch(getFeaturedRestaurants());
  }, [dispatch]);

  return (
    <div className="d-flex">
      <div className="col-md-8 d-flex flex-column mb-3">
        <div>
          <Filter />
        </div>
        {loading ? (
          <div className="row justify-content-center">
            <div className="text-center" style={{ margin: "8rem" }}>
              <i className="fas fa-7x fa-spinner fa-spin text-primary"></i>
            </div>
          </div>
        ) : restaurants ? (
          <div>
            {restaurants.map((restaurant) => {
              return (
                <div className="d-flex flex-column  mt-1" key={restaurant.id}>
                  <Restaurant restaurant={restaurant} />
                </div>
              );
            })}
          </div>
        ) : (
          error && <Error error="No restaurants found" />
        )}
      </div>
      <div className="col-md-4">
        {fetching ? (
          <div className="row justify-content-center">
            <div className="text-center" style={{ margin: "8rem" }}>
              <i className="fas fa-7x fa-spinner fa-spin text-primary"></i>
            </div>
          </div>
        ) : (
          <Featured errors={errors} fetching={fetching} featured={featured} />
        )}
      </div>
      <ScrollTopArrow />
    </div>
  );
}
