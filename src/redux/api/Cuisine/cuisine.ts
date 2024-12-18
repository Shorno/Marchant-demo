import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const CUISINE_URL = "/restaurants/info/cuisine/";

export const cuisineApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCuisine: build.query({
      query: () => ({
        url: CUISINE_URL,
        method: "GET",
        invalidatesTags: [tagTypes.cuisine],
      }),
    }),
  }),
});

export const { useGetCuisineQuery } = cuisineApi;
