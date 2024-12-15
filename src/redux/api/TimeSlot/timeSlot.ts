import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const TIME_SLOT_URL = "/restaurants/info/timeslot/calendar";
const SLOT_URL = "/restaurants/info/timeslot/active/";

export const timeSlotApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOffTimeSlot: build.query({
      query: (date: string) => ({
        url: `${TIME_SLOT_URL}/${date}/`,
        method: "GET",
        invalidatesTags: [tagTypes.timeSlots],
      }),
    }),

    getSlot: build.query({
      query: (slot) => ({
        url: `${SLOT_URL}?slot=${slot}`,
        method: "GET",
        invalidatesTags: [tagTypes.timeSlots],
      }),
    }),
  }),
});

export const { useGetOffTimeSlotQuery, useGetSlotQuery } = timeSlotApi;
