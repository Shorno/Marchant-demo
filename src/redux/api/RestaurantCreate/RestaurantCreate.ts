/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const RESTAURSNT_CREATE = "/v2/restaurants/manager/restaurant/create/";


export const restaurantCreateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRestaurant: build.mutation({
      query: (data:any) => ({
        url: RESTAURSNT_CREATE,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.createRestaurant],
    }),
  }),
});

export const { useCreateRestaurantMutation } = restaurantCreateApi;
