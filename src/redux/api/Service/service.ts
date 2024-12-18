import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const SERVICE_URL = "/restaurants/info/services/";

export const serviceAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getService: build.query({
      query: () => ({
        url: SERVICE_URL,
        method: "GET",
        invalidatesTags: [tagTypes.service],
      }),
    }),
  }),
});

export const { useGetServiceQuery } = serviceAPi;
