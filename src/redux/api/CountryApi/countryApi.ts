import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const COUNTRY_URL = "/restaurants/info/countries/";

export const countryAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    getCountry: build.query({
      query: () => ({
        url: COUNTRY_URL,
        method: "GET",
        invalidatesTags: [tagTypes.country],
      }),
    }),

  }),
});

export const {useGetCountryQuery} = countryAPi;
