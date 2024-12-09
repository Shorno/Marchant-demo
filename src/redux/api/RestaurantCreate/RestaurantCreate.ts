import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const RESTAURSNT_CREATE = "/restaurants/create/";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  role: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    UserLogin: build.mutation<LoginResponse, LoginData>({
      query: (loginData) => ({
        url: RESTAURSNT_CREATE,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.userLoginInfo],
    }),
  }),
});

export const { useUserLoginMutation } = authApi;
