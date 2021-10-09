import axios from "axios";
import {
  MAKE_REVIEW_REQUEST,
  MAKE_REVIEW_SUCCESS,
  MAKE_REVIEW_FAIL,
} from "../action-types/reviewActionTypes";

export const makeReview = (review) => async (dispatch) => {
  dispatch({
    type: MAKE_REVIEW_REQUEST,
  });

  try {
    const { data } = await axios.post("/reviews/create-review", review);
    dispatch({
      type: MAKE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MAKE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : "Error",
    });
  }
};
