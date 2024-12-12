import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";


const SPECIAL_MENU_END_POINT = "/restaurants/info/menu/special/";


export const specialMenuApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postSpecialMenu: build.mutation({
        query: (data) => ({
            url: SPECIAL_MENU_END_POINT,
            method: "POST",
            data: data,
        }),
        invalidatesTags: [tagTypes.specialMenu],
    }),
  }),
});

export const {usePostSpecialMenuMutation } = specialMenuApi;
