import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const ALERT_URL = "/restaurants/info/food-alert/";

export const FoodAlertApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    alert: build.query({
      query: () => ({
        url: ALERT_URL,
        method: "GET",
        invalidatesTags: [tagTypes.alert],
      }),
    }),
  }),
});

export const { useAlertQuery } = FoodAlertApi;
