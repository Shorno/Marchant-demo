import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const MENU_END_POINT = "/restaurants/info/menu/";
const SPECIAL_MENU_END_POINT = "/restaurants/info/menu/special/";
const BUFFET_MENU_END_POINT = "/restaurants/info/menu/buffet/";

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
        postSpecialMenu: build.mutation({
            query: (data) => ({
                url: SPECIAL_MENU_END_POINT,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagTypes.specialMenu],
        }),
        postBuffetMenu: build.mutation({
            query: (data) => ({
                url: BUFFET_MENU_END_POINT,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagTypes.buffetMenu], 
        }),
    }),
});

export const {
    usePostMenuMutation,
    usePostSpecialMenuMutation,
    usePostBuffetMenuMutation,
} = MenuApi;
