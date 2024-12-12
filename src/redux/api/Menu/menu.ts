import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const MENU_ADD = "/restaurants/info/menu/";
const MENU_LIST = "/restaurants/info/menu/list/";
const MENU = "/restaurants/info/menu/";
const CETEGORY = "restaurants/info/category/";

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
        url: CETEGORY,
        method: "POST",
        data: data,
      }),
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

  }),
});

export const { usePostMenuMutation,usePostMenuCategoryMutation, useMenuListQuery,useMenuQuery} = MenuApi;
