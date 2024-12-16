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

    updateBuffetMenu: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `${BUFFET_MENU_END_POINT}${id}/`,
          method: "PUT",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.updateSpecialMenu],
    }),

    deleteBuffetMenu: build.mutation({
      query: ({ id }) => {
        return {
          url: `${BUFFET_MENU_END_POINT}${id}/`,
          method: "Delete",
        };
      },
      invalidatesTags: [tagTypes.deleteSpecialMenu],
    }),

    getBuffetMenu: build.query({
      query: ({ page, page_size }: { page: number; page_size: number }) => ({
        url: `${BUFFET_MENU_END_POINT}?page=${page}&page_size=${page_size}`,
        method: "GET",
      }),
      providesTags: [tagTypes.buffetMenu],
    }),
  }),
});

export const { usePostBuffetMenuMutation,useUpdateBuffetMenuMutation,useDeleteBuffetMenuMutation, useGetBuffetMenuQuery } =
  buffetMenuApi;
