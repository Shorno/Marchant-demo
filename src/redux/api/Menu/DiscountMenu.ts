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

    updateDiscount: build.mutation({
      query: ({ id, data, date }) => {
        return {
          url: `${DISCOUNT_MENU_END_POINT}${id}/?date=${date}`,
          method: "PUT",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.discountMenu],
    }),

    getDiscount: build.query({
      query: ({
        page,
        page_size,
        date,
      }: {
        page: number;
        page_size: number;
        date: string;
      }) => ({
        url: `${DISCOUNT_MENU_END_POINT}?page=${page}&page_size=${page_size}&date=${date}`,
        method: "GET",
      }),
      providesTags: [tagTypes.discountMenu],
    }),
  }),
});

export const {
  usePostDiscountMenuMutation,
  useGetDiscountQuery,
  useUpdateDiscountMutation,
} = DiscountMenuApi;
