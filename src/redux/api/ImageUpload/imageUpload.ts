/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";
const PROFILE_UPLOAD_URL = "/images/upload/";

export const imageUploadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    imageUpload: build.mutation({
      query: (imageData: any) => {
        console.log('iiiiiiiiiiiiii',imageData);
        return {
          url: `${PROFILE_UPLOAD_URL}`,
          method: "POST",
          data: imageData,
        };
      },
      invalidatesTags: [tagTypes.uploadProfileImage],
    }),
  }),
});

export const { useImageUploadMutation } = imageUploadApi;
