import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const OWNER_PROFILE = "/accounts/info/";

interface OwnerProfile {
  username: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  phone_number: string;
  date_of_birth: string;
  avatar: string;
  house_name: string;
  flat_side: string;
  landmark_sign: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOwnerProfile: build.mutation<OwnerProfile, Partial<OwnerProfile>>({
      query: (data) => ({
        url: OWNER_PROFILE,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }),
      invalidatesTags: [tagTypes.userLoginInfo],
    }),
  }),
});

export const { useCreateOwnerProfileMutation } = authApi;
