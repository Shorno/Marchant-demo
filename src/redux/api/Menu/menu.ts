import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const MENU_ADD = "/restaurants/info/menu/";
const MENU_LIST = "/restaurants/info/menu/list/";
const MENU = "/restaurants/info/menu/";
const CATEGORY = "/restaurants/info/category/";
const UPDATE_CATEGORY = "/restaurants/info/category/";

export const MenuApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    postMenu: build.mutation({
      query: (data) => ({
        url: MENU_ADD,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.menu],
    }),
    postMenuCategory: build.mutation({
      query: (data) => ({
        url: CATEGORY,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.menuCetegory],
    }),

    getSingleMenuCategory: build.query({
      query: ({ id }) => ({
        url: `${UPDATE_CATEGORY}${id}/`,
        method: "GET",
        invalidatesTags: [tagTypes.singleCategory],
      }),
    }),

    updateMenuCategory: build.mutation({
      query: ({ id, data }) => {
        console.log("from payload", id);
        console.log("frompayload", data);
        return {
          url: `${UPDATE_CATEGORY}${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: [tagTypes.menuCetegory],
    }),

    updateMenuCategoryVisiable: build.mutation({
      query: ({ id, data }) => {
        console.log("from payload", id);
        console.log("frompayload", data);
        return {
          url: `${UPDATE_CATEGORY}${id}/`,
          method: "PUT",
          data,
        };
      },
      invalidatesTags: [tagTypes.menuCetegory],
    }),

    deleteMenuCategory: build.mutation({
      query: ({ id}) => {
        return {
          url: `${UPDATE_CATEGORY}${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.menuCetegory],
    }),

    menuList: build.query({
      query: () => ({
        url: MENU_LIST,
        method: "GET",
        invalidatesTags: [tagTypes.menuList],
      }),
    }),
    menu: build.query({
      query: () => ({
        url: MENU,
        method: "GET",
        invalidatesTags: [tagTypes.menuChild],
      }),
    }),
    singleMenu: build.query({
      query: (id) => ({
        url: `${MENU}${id}/`,
        method: "GET",
        invalidatesTags: [tagTypes.SingleMenuChild],
      }),
    }),

    singleMenuUpdate: build.mutation({
      query: ({ data, id }) => ({
        url: `${MENU}${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.menu],
    }),
  }),
});

export const {
  usePostMenuMutation,
  usePostMenuCategoryMutation,
  useUpdateMenuCategoryMutation,
  useMenuListQuery,
  useMenuQuery,
  useSingleMenuQuery,
  useSingleMenuUpdateMutation,
  useGetSingleMenuCategoryQuery,
  useDeleteMenuCategoryMutation,
  useUpdateMenuCategoryVisiableMutation
  } = MenuApi;
