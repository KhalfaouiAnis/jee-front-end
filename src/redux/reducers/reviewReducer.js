import {
  MAKE_REVIEW_REQUEST,
  MAKE_REVIEW_SUCCESS,
  MAKE_REVIEW_FAIL,
  MAKE_REVIEW_RESET,
} from "../action-types/reviewActionTypes";

export const makeReviewReducer = (
  state = {
    successReview: false,
    loadingReview: false,
    errorReview: false,
    message: null,
  },
  action
) => {
  switch (action.type) {
    case MAKE_REVIEW_REQUEST:
      return {
        ...state,
        loadingReview: true,
      };
    case MAKE_REVIEW_SUCCESS:
      return {
        ...state,
        successReview: true,
        message: action.payload,
        loadingReview: false,
      };
    case MAKE_REVIEW_FAIL:
      return {
        ...state,
        errorReview: true,
        message: action.payload,
        successReview: false,
        loadingReview: false,
      };
    case MAKE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
