import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const BUFFET_MENU_END_POINT = "/restaurants/info/menu/buffet/";

export const buffetMenuApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
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

export const { usePostBuffetMenuMutation } = buffetMenuApi;
