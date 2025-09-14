import type { User } from "@/types/user";
import { apiSlice } from "./api";

interface loginInput {
  email: string;
  password: string;
}

interface registerInput extends loginInput {
  name: string;
}

interface uploadAvatarInput {
  image_url: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: registerInput) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data: loginInput) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    currentUser: builder.query<User, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    uploadAvatar: builder.mutation({
      query: (data: uploadAvatarInput) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    emailUpdate: builder.mutation({
      query: (data: { email: string }) => ({
        url: "/update-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    nameUpdate: builder.mutation({
      query: (data: { name: string }) => ({
        url: "/update-name",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    passwordUpdate: builder.mutation({
      query: (data: { oldPassword: string; newPassword: string }) => ({
        url: "/update-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    forgetPassword: builder.mutation({
      query: (data: { email: string }) => ({
        url: "/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: { token: string; newPassword: string }) => ({
        url: `/reset-password/${data.token}`,
        method: "POST",
        body: {
          newPassword: data.newPassword,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCurrentUserQuery,
  useUploadAvatarMutation,
  useEmailUpdateMutation,
  useNameUpdateMutation,
  usePasswordUpdateMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = userApiSlice;
