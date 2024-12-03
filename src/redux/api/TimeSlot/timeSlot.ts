import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const TIME_SLOT_URL = "/restaurants/info/timeslot/calendar";

export const timeSlotApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOffTimeSlot: build.query({
      query: (date:string) => ({
        url: `${TIME_SLOT_URL}/${date}/`,
        method: "GET",
        invalidatesTags: [tagTypes.timeSlots],
      }),
    }),
  }),
});

export const { useGetOffTimeSlotQuery } = timeSlotApi;
