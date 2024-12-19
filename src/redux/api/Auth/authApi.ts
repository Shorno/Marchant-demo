import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const Login_URL = "/accounts/login/";
const USER_INFO = "/accounts/info/";
const REGISTRATION_URL = "/v2/accounts/seller/signup/";

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
        url: Login_URL,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.userLoginInfo],
    }),


    userRegistration: build.mutation({
      query: (registrationData) => ({
        url: REGISTRATION_URL,
        method: "POST",
        data: registrationData,
      }),
      invalidatesTags: [tagTypes.registration],
    }),



    getUser: build.query({
      query: () => ({
        url: USER_INFO,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
  }),
});

export const { useUserLoginMutation , useUserRegistrationMutation , useGetUserQuery } = authApi;
