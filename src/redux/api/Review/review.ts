import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const REVIEW_DETAILS_URL = "/restaurants/info/reviews/detail/";
const REVIEW_URL = "/restaurants/info/reviews";
const REPLY_REVIEW_URL = "/reservations/review/reply/";

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviewDetails: build.query({
      query: () => ({
        url: REVIEW_DETAILS_URL,
        method: "GET",
        invalidatesTags: [tagTypes.reviewDetails],
      }),
    }),
    getReview: build.query({
      query: () => ({
        url: REVIEW_URL,
        method: "GET",
        invalidatesTags: [tagTypes.reviews],
      }),
    }),

    repllyReviews: build.mutation({
      query: (...data) => ({
        url: REPLY_REVIEW_URL,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: [tagTypes.replyReviews],
    }),
  }),
});

export const { useGetReviewDetailsQuery,useGetReviewQuery,useRepllyReviewsMutation } = reviewsApi;
