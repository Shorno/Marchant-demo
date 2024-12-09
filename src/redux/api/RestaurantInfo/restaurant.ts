import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const RESTAURANT_URL = "/restaurants/info/";

export const restaurantApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRestaurant: build.query({
      query: () => ({
        url: RESTAURANT_URL,
        method: "GET",
        invalidatesTags: [tagTypes.image],
      }),
    }),

  }),
});

export const {useGetRestaurantQuery } = restaurantApi;


