import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const buildQueryParams = (params) => {
  let result = "";
  for (let key in params) {
    result += `${key}=${params[key]}&`;
  }
  result = result.slice(0, -1);
  console.log(result);
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      console.log(getState());
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/store/",
    }),
    getPost: builder.query({
      query: ({ postId }) => ({
        url: `/store/${postId}/`,
        method: "GET",
      }),
    }),
    getUsers: builder.query({
      query: () => "/users/",
    }),
    getUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}/`,
        method: "GET",
      }),
    }),
    getUsersDB: builder.query({
      query: () => ({
        url: `/users/?get_exdb=true`,
        method: "GET",
      }),
    }),
    getFilterPosts: builder.query({
      query: (params) => ({
        url: `/store/?${buildQueryParams(params)}`,
        method: "GET",
      }),
    }),
    getTags: builder.query({
      query: () => "/tags/",
    }),

    chengeTag: builder.mutation({
      query: ({ initialState, tagId }) => ({
        url: `/tags/${tagId}/`,
        method: "PUT",
        body: initialState,
      }),
    }),
    chengePost: builder.mutation({
      query: ({ initialState, postId }) => {
        console.log({ body: initialState });
        return {
          url: `/store/${postId}/`,
          method: "PATCH",
          body: initialState,
        };
      },
    }),

    authentication: builder.mutation({
      query: ({ initialState }) => ({
        url: "/token/",
        body: initialState,
        method: "POST",
      }),
    }),

    deleteTag: builder.mutation({
      query: (tagId) => ({ url: `/tags/${tagId}/`, method: "DELETE" }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/store/${postId}/`,
        method: "DELETE",
      }),
    }),

    addPost: builder.mutation({
      query: ({ initialState }) => {
        console.log(initialState);
        return {
          url: "/store/",
          body: initialState,
          method: "POST",
        };
      },
    }),
    addTag: builder.mutation({
      query: ({ initialState }) => ({
        url: "/tags/",
        body: initialState,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAuthenticationMutation,
  useGetPostsQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useGetUsersDBQuery,
  useGetPostQuery,
  useGetTagsQuery,
  useChengeTagMutation,
  useGetFilterPostsQuery,
  useChengePostMutation,
  useDeleteTagMutation,
  useDeletePostMutation,
  useAddPostMutation,
  useAddTagMutation,
} = apiSlice;
