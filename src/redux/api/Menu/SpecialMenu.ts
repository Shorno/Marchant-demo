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

    updateSpecialMenu: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `${SPECIAL_MENU_END_POINT}${id}/`,
          method: "PUT",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.updateSpecialMenu],
    }),

    deleteSpecialMenu: build.mutation({
      query: ({ id}) => {
        return {
          url: `${SPECIAL_MENU_END_POINT}${id}/`,
          method: "Delete",
        };
      },
      invalidatesTags: [tagTypes.deleteSpecialMenu],
    }),

    getSpecialMenu: build.query({
      query: ({ page, page_size }: { page: number; page_size: number }) => ({
        url: `${SPECIAL_MENU_END_POINT}?page=${page}&page_size=${page_size}`,
        method: "GET",
      }),
      providesTags: [tagTypes.specialMenu],
    }),
  }),
});

export const {
  usePostSpecialMenuMutation,
  useUpdateSpecialMenuMutation,
  useDeleteSpecialMenuMutation,
  useGetSpecialMenuQuery,
} = specialMenuApi;
