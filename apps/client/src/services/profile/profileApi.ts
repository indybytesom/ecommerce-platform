import { baseApi } from "../api/baseApi";
import { ProfileState } from "@/features/profile/profileTypes";

export const profileApi = baseApi.injectEndpoints({
  overrideExisting: false,
  
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileState, void>({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<ProfileState, Partial<ProfileState>>({
      query: (body) => ({
        url: "/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    uploadAvatar: builder.mutation<{ avatar: string }, FormData>({
      query: (formData) => ({
        url: "/profile/avatar",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = profileApi;
