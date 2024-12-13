import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const DISCOUNT_MENU_END_POINT = "/restaurants/info/menu/discount/";

export const DiscountMenuApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        postDiscountMenu: build.mutation({
            query: (data) => ({
                url: DISCOUNT_MENU_END_POINT,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagTypes.discountMenu],
        }),
    }),
});

export const { usePostDiscountMenuMutation } = DiscountMenuApi;
