import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const MENU_END_POINT = "/restaurants/info/menu/";

export const MenuApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postMenu: build.mutation({
      query: (data) => ({
        url: MENU_END_POINT,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.menu],
    }),
  }),
});

export const { usePostMenuMutation } = MenuApi;
