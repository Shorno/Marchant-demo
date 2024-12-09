import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const MENU_END_POINT= "/restaurants/info/menu/"


export const MenuApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        postAMenu: build.mutation({
            query: (data) => {
                console.log("Data sent to query:", data); // Log here
                return {
                    url: MENU_END_POINT,
                    method: "POST",
                    body: JSON.stringify({ ...data }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
            },
            invalidatesTags: [tagTypes.menu],
        }),
        
    }),
});


export const { usePostAMenuMutation } = MenuApi;
