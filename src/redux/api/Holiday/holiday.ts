import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const HOLIDAY_URL = "/restaurants/info/holiday/";

export const holidayAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHoliday: build.query({
      query: () => ({
        url: HOLIDAY_URL,
        method: "GET",
        invalidatesTags: [tagTypes.holiday],
      }),
    }),

    createHoliday: build.mutation({
      query: (holidayData) => ({
        url: HOLIDAY_URL,
        method: "POST",
        data: holidayData,
      }),
      invalidatesTags: [tagTypes.CreateHoliday],
    }),
  }),
});

export const { useGetHolidayQuery,useCreateHolidayMutation } = holidayAPi;
