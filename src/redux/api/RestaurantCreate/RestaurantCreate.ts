/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const RESTAURSNT = "/v2/restaurants/manager/restaurant/create/";

export const restaurantCreateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    createRestaurant: build.mutation({
      query: (data: any) => ({
        url: RESTAURSNT,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.createRestaurant],
    }),

    updateRestaurant: build.mutation({
      query: ({id,data}:any) => ({
        url: `${RESTAURSNT}${id}/`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: [tagTypes.updateRestaurant],
    }),

    getSingleRestaurant: build.query({
      query: ({ slug }: any) => ({
        url: `${RESTAURSNT}${slug}/`,
        method: "GET",
        invalidatesTags: [tagTypes.restaurant],
      }),
    }),

  }),
});

export const { useCreateRestaurantMutation ,useUpdateRestaurantMutation,useGetSingleRestaurantQuery} = restaurantCreateApi;
